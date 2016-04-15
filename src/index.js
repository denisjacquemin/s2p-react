import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';

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

console.log('loading store')

load(store)
    .then((newState) => {
      console.log('Loaded state:', newState)
      renderApp(store)
    })
    .catch(() => {console.log('Failed to load previous state')});

// load(store)
//     .then((newState) => {
//       console.log('previous state loaded: ' + JSON.stringify(newState))
//       renderApp(newState)
//     })
//     .catch((err) => {
//       console.log('Failed to load previous state: ' + err )
//       //renderApp(store)
//     })
