import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { saveRegistrationId, saveRegistrationIdToServer, hideSnackbar, showSnackbar, fetchMessages, fetchMessagesAndShowFullMessage, showFullMessage, enableDeviceNotification, disableDeviceNotification, saveDeviceStateToServer } from './actions'


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


import { store, load } from './store'
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
        if (isSmart) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            app.startApp();
        }
    },

    initPush: function(store) {

        var push = PushNotification.init({
            android: {
                // senderID: "441581989301",
                clearBadge: "true",
                vibrate: "true",
                iconColor: "#FFFFFF"
            },
            ios: {
                alert: "true",
                badge: "false",
                clearBadge: "true",
                sound: "true"
            }
        });

        push.on('registration', function(data) {
            console.info('push.on(registration) data.registrationId: ' + data.registrationId);

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

                console.debug('push.on(registration) codesToSync: ' + codesToSync);
                //store.dispatch(syncCodesFromDevice(device.uuid, codesToSync))
            }
            store.dispatch(saveDeviceStateToServer(data.registrationId, device.uuid, device.platform, codesToSync));
            console.debug('push.on(registration) saveDeviceStateToServer');
        });

        push.on('notification', function(data) {
            console.info('push.on(notification)');

            console.info('push.on(notification) data.message: ' + data.message)
            console.debug('push.on(notification) data.title: ' + data.title)
            console.debug('push.on(notification) data.count: ' + data.count)
            console.debug('push.on(notification) data.sound: ' + data.sound)
            console.debug('push.on(notification) data.image: ' + data.image)
            console.debug('push.on(notification) data.additionalData: ' + data.additionalData)
            console.debug('push.on(notification) data.additionalData.notId' + data.additionalData.notId)
            if (!data.additionalData.foreground) {
                console.debug('push.on(notification) App in background');
                store.dispatch(hideSnackbar());
                store.dispatch(fetchMessagesAndShowFullMessage(data.additionalData.message_id));
                //store.dispatch(fetchMessages(data.additionalData.message_id));

                push.setApplicationIconBadgeNumber(function() {
                    console.debug('push.on(notification) setApplicationIconBadgeNumber success');
                }, function() {
                    console.debug('push.on(notification) setApplicationIconBadgeNumber error');
                }, data.count);
            } else {
                console.debug('push.on(notification) App in foreground');
                // if app in foreground
                store.dispatch(showSnackbar('Un nouveau message est arrivé'));
                store.dispatch(fetchMessages());
            }
            push.finish(function() {
                console.log("processing of push data is finished");
            }, function() {
                console.log("something went wrong with push.finish for ID = " + data.additionalData.notId)
            }, data.additionalData.notId);
        });

        push.on('error', function(e) {
            console.debug('push.on(error): ' + e.message);
        });

        return push;

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('onDeviceReady');
        app.startApp();

        // https://cordova.apache.org/docs/en/4.0.0/cordova/events/events.backbutton.html
        // handle android's back button
        // document.addEventListener("backbutton", onBackKeyDown, false);


        // push.unregister(function() {
        //     console.log('####### push.unregister');
        //     // store.dispatch(disableDeviceNotification(device.uuid, device.platform));
        //     // console.log('notification disabled on server');
        // }, function(e) {
        //     console.log('unregister: ' + e.message)
        // });
    },

    // onBackKeyDown: function() {
    //     console.log('backbutton hit... do something');
    // },

    // Update DOM on a Received Event
    startApp: function() {
        console.log('loading store')
        load(store)
            .then((newState) => {
                console.log('Loaded state:', newState)
                console.log('Init PushNotification?')
                console.log(typeof PushNotification !== "undefined")
                if (typeof PushNotification !== "undefined") {
                    app.initPush(store);
                }
                console.log('device.platform:' + device.platform)
                app.renderApp(store);
            })
            .catch((e) => { console.log('Failed to load previous state: ' + e) });
    },

    renderApp: function(theStore) {
        console.log('renderApp!!')
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