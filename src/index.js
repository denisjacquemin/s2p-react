import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { saveDeviceToken, hideSnackbar, fetchMessages, showFullMessage } from './actions'

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
  console.log('in initPush');
  var push = PushNotification.init({
      android: {
          senderID: "12345679"
      },
      ios: {
           alert: "true",
           badge: "true",
           sound: "true"
      },
      windows: {}
  });

  push.on('registration', function(data) {
      console.log('data.registrationId: ' + data.registrationId);
      store.dispatch(saveDeviceToken(data.registrationId));
      //saveDeviceToken(data.registrationId);
      // save registrationId in state
      // send to server in table devices (id, device_token, groups)
  });

  push.on('notification', function(data) {
      if (!data.additionalData.foreground) {
        store.dispatch(hideSnackbar());
        store.dispatch(fetchMessages()).then(
          function() {
            store.dispatch(showFullMessage(data.additionalData.message_id))
          });
      }
      console.log('data.message: ' + data.message);
      console.log('data.title: ' + data.title);
      console.log('data.count: ' + data.count);
      console.log('data.sound: ' + data.sound);
      console.log('data.image: ' + data.image);
      console.log('data.additionalData: ' + JSON.stringify(data.additionalData));
  });

  push.on('error', function(e) {
      alert('error: ' + e.message);

      console.log('e.message: ' + e.message);e.message
  });
  // push.unregister(function() {
  //     console.log('unregister success');
  // }, function() {
  //     console.log('unregister error');
  // });


  PushNotification.hasPermission(function(data) {
      if (data.isEnabled) {
        console.log('hasPermission isEnabled');
      } else {
        console.log('hasPermission isDisabled');
      }
  });
}

function startSmartApp() {
  startApp();
  initPush();
}

function startApp(){
  console.log('loading store')
  load(store)
      .then((newState) => {
        console.log('Loaded state:', newState)
        renderApp(store)
      })
      .catch((e) => {console.log('Failed to load previous state: ' + e)});

      function startApp(){
      	var app = new App({});
      	React.renderComponent(app, document.body);
      }
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
