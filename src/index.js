import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { saveRegistrationId, saveRegistrationIdToServer, hideSnackbar, fetchMessages, showFullMessage, enableDeviceNotification, disableDeviceNotification } from './actions'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


import {store, load} from './store'
import App from './containers/app'

function renderApp(theStore) {
  ReactDOM.render(
    <Provider store={theStore}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}


function initPush() {
  console.debug('in initPush');
  var push = PushNotification.init({
      android: {
          senderID: "441581989301"
      },
      ios: {
           alert: "true",
           badge: "true",
           sound: "true"
      },
      windows: {}
  });

  push.on('registration', function(data) {
      console.debug('data.registrationId: ' + data.registrationId);
      store.dispatch(saveRegistrationId(data.registrationId, device.uuid)); // save to state the registrationid with uuid
      store.dispatch(saveRegistrationIdToServer(data.registrationId, device.uuid, device.platform));

      //saveDeviceToken(data.registrationId);
      // save registrationId in state
      // send to server in table devices (id, device_token, groups)
  });

  // App in background
  // push.on('notification', function(data) {
  //   push.getApplicationIconBadgeNumber(function(n) {
  //     push.setApplicationIconBadgeNumber(function() {
  //       console.log('success setApplicationIconBadgeNumber');
  //     }, function() {
  //       console.log('error setApplicationIconBadgeNumber');
  //     }, n + 1);
  //   }, function() {
  //       console.log('error getApplicationIconBadgeNumber');
  //   });
  // });

  // Notification tap
  push.on('notification', function(data) {
      push.setApplicationIconBadgeNumber(function() {
        console.log('success setApplicationIconBadgeNumber');
      }, function() {
        console.log('error setApplicationIconBadgeNumber');
      }, 0);
      if (!data.additionalData.foreground) {
        store.dispatch(hideSnackbar());
        store.dispatch(fetchMessages()).then(
          function() {
            store.dispatch(showFullMessage(data.additionalData.message_id))
          });
      }
      // if app in foreground
      showSnackbar('Nouveau message');
      console.debug('data.message: ' + data.message);
      console.debug('data.title: ' + data.title);
      console.debug('data.count: ' + data.count);
      console.debug('data.sound: ' + data.sound);
      console.debug('data.image: ' + data.image);
      console.debug('data.additionalData: ' + JSON.stringify(data.additionalData));
  });

  push.on('error', function(e) {
      //alert('error: ' + e.message);

      console.debug('e.message: ' + e.message);
  });
  // push.unregister(function() {
  //     console.log('unregister success');
  // }, function() {
  //     console.log('unregister error');
  // });


  PushNotification.hasPermission(function(data) {
      if (data.isEnabled) {
        store.dispatch(enableDeviceNotification(device.uuid, device.platform));
        console.debug('hasPermission isEnabled');
      } else {
        store.dispatch(disableDeviceNotification(device.uuid, device.platform));
        console.debug('hasPermission isDisabled');
      }
  });
}

function startSmartApp() {
  startApp();
  initPush();
  try {
    window.analytics.startTrackerWithId('UA-79998761-1')
  } catch(e) {
    console.error(e);
  }

}

function startApp(){
  console.log('loading store')
  load(store)
      .then((newState) => {
        console.log('Loaded state:', newState)
        renderApp(store)
        window.analytics.setUserId(buildUserId(store.getState()))
        console.log('userId: ' + buildUserId(store.getState()))
      })
      .catch((e) => {console.log('Failed to load previous state: ' + e)});

      function startApp(){
      	var app = new App({});
      	React.renderComponent(app, document.body);
      }
}

function buildUserId(state) {
  var userId = state.device.uuid
  for (var c in state.codes) {
    userId = userId + '-' + state.codes[c].fullname
  }
  return userId
}


window.onload = function(){
	var url = document.URL;
	var isSmart = (url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
	if( isSmart ){
		document.addEventListener('deviceready', startSmartApp, false);
	}
	else{
		startApp();
	}
}
