import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { saveRegistrationId, saveRegistrationIdToServer, hideSnackbar, showSnackbar, fetchMessages, showFullMessage, enableDeviceNotification, disableDeviceNotification, saveDeviceStateToServer } from './actions'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


import {store, load} from './store'
import App from './containers/app'

// function renderApp(theStore) {
//   ReactDOM.render(
//     <Provider store={theStore}>
//       <App />
//     </Provider>,
//     document.getElementById('root')
//   );
// }


// function initPush() {
//   console.debug('in initPush');
//   var push = PushNotification.init({
//       android: {
//           senderID: "441581989301"
//       },
//       ios: {
//            alert: "true",
//            badge: "false",
//            sound: "true"
//       },
//       windows: {}
//   });
//
//   push.on('registration', function(data) {
//       console.debug('data.registrationId: ' + data.registrationId);
//       store.dispatch(saveRegistrationId(data.registrationId, device.uuid)); // save to state the registrationid with uuid
//       store.dispatch(saveRegistrationIdToServer(data.registrationId, device.uuid, device.platform));
//
//       //saveDeviceToken(data.registrationId);
//       // save registrationId in state
//       // send to server in table devices (id, device_token, groups)
//   });
//
//   // App in background
//   // push.on('notification', function(data) {
//   //   push.getApplicationIconBadgeNumber(function(n) {
//   //     push.setApplicationIconBadgeNumber(function() {
//   //       console.log('success setApplicationIconBadgeNumber');
//   //     }, function() {
//   //       console.log('error setApplicationIconBadgeNumber');
//   //     }, n + 1);
//   //   }, function() {
//   //       console.log('error getApplicationIconBadgeNumber');
//   //   });
//   // });
//
//   // Notification tap
//   push.on('notification', function(data) {
//
//
//       // push.setApplicationIconBadgeNumber(function() {
//       //   console.log('success setApplicationIconBadgeNumber');
//       // }, function() {
//       //   console.log('error setApplicationIconBadgeNumber');
//       // }, 0);
//       if (!data.additionalData.foreground) {
//         console.debug('App in background');
//         store.dispatch(hideSnackbar());
//         store.dispatch(fetchMessages()).then(
//           function() {
//             store.dispatch(showFullMessage(data.additionalData.message_id))
//           });
//       } else {
//         console.debug('App in foreground');
//         // if app in foreground
//         store.dispatch(showSnackbar(data.title));
//         store.dispatch(fetchMessages());
//       }
//
//       console.debug('data.message: ' + data.message);
//       console.debug('data.title: ' + data.title);
//       console.debug('data.count: ' + data.count);
//       console.debug('data.sound: ' + data.sound);
//       console.debug('data.image: ' + data.image);
//       console.debug('data.additionalData: ' + JSON.stringify(data.additionalData));
//   });
//
//   push.on('error', function(e) {
//       //alert('error: ' + e.message);
//
//       console.debug('e.message: ' + e.message);
//   });
//   // push.unregister(function() {
//   //     console.log('unregister success');
//   // }, function() {
//   //     console.log('unregister error');
//   // });
//
//
//   PushNotification.hasPermission(function(data) {
//       if (data.isEnabled) {
//         store.dispatch(enableDeviceNotification(device.uuid, device.platform));
//         console.debug('hasPermission isEnabled');
//       } else {
//         store.dispatch(disableDeviceNotification(device.uuid, device.platform));
//         console.debug('hasPermission isDisabled');
//       }
//   });
// }

// function startSmartApp() {
//   startApp();
//   initPush();
//   try {
//     window.analytics.startTrackerWithId('UA-79998761-1')
//   } catch(e) {
//     console.error(e);
//   }
//
// }

// function startApp(){
//   console.log('loading store')
//   load(store)
//       .then((newState) => {
//         console.log('Loaded state:', newState)
//         renderApp(store)
//         window.analytics.setUserId(buildUserId(store.getState()))
//         console.log('userId: ' + buildUserId(store.getState()))
//       })
//       .catch((e) => {console.log('Failed to load previous state: ' + e)});
//
// }


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      var url = document.URL;
      var isSmart = (url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
      if( isSmart ){
        document.addEventListener('deviceready', this.onDeviceReady, false);
      }
      else{
        app.startApp();
      }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('onDeviceReady');
        app.startApp();

        var push = PushNotification.init({
            android: {
                senderID: "441581989301"
            },
            ios: {
                alert: "true",
                badge: "false",
                clearBadge: "true",
                sound: "true"
            }
        });

        push.on('registration', function(data) {
            console.log('####### push.on(registration')

            console.log('data.registrationId: ' + data.registrationId)
            store.dispatch(saveRegistrationId(data.registrationId, device.uuid)); // save to state the registrationid with uuid
            //store.dispatch(saveRegistrationIdToServer(data.registrationId, device.uuid, device.platform));
            //store.dispatch(enableDeviceNotification(device.uuid, device.platform));

            var state = store.getState();

            // send each code to the server
            // if code exist
            //   then write it to Device.codes array
            // returns full details for each code
            // mobile save details into state.codes
            var codesToSync = []
            if (state.codes) { // if codes.any?
              codesToSync = state.codes.map(function(c) {
                return c.code
              });

              console.debug('Codes to sync with server: ' + codesToSync);
              //store.dispatch(syncCodesFromDevice(device.uuid, codesToSync))
            }
            store.dispatch(saveDeviceStateToServer(data.registrationId, device.uuid, device.platform, codesToSync));
            console.log('notification enabled on server');
        });

        push.on('notification', function(data) {
            console.log('####### push.on(notification');

            console.log(data.message)
            console.log(data.title)
            console.log(data.count)
            console.log(data.sound)
            console.log(data.image)
            console.log(data.additionalData)
            if (!data.additionalData.foreground) {
              console.debug('App in background');
              store.dispatch(hideSnackbar());
              store.dispatch(fetchMessages()).then(
                function() {
                  store.dispatch(showFullMessage(data.additionalData.message_id))
                });
            } else {
              console.debug('App in foreground');
              // if app in foreground
              store.dispatch(showSnackbar(data.message));
              store.dispatch(fetchMessages());
            }
        });

        push.on('error', function(e) {
            console.log('####### push.on(error');
            console.log(e.message)
        });

        // push.unregister(function() {
        //     console.log('####### push.unregister');
        //     // store.dispatch(disableDeviceNotification(device.uuid, device.platform));
        //     // console.log('notification disabled on server');
        // }, function(e) {
        //     console.log('unregister: ' + e.message)
        // });
    },
    // Update DOM on a Received Event
    startApp: function() {
      console.log('loading store')
      load(store)
          .then((newState) => {
            console.log('Loaded state:', newState)
            this.renderApp(store)
          })
          .catch((e) => {console.log('Failed to load previous state: ' + e)});
    },

    renderApp: function(theStore) {
      const root = document.createElement('div');
      document.body.appendChild(root);
      ReactDOM.render(
        <Provider store={theStore}>
          <App />
        </Provider>,
        root
      );
    }
};

app.initialize();
