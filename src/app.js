import React from 'react'
import isOnline from 'is-online'

import JSData from 'js-data'
import DSHttpAdapter from 'js-data-http'
import DSLocalStorageAdapter from 'js-data-localstorage'
import { render } from 'react-dom'
import PageNotFound from './components/page-not-found'

import Messages from './components/messages'
import Welcome from './components/welcome'


import { Router, Route, hashHistory } from 'react-router'

var store = new JSData.DS({})
var httpAdapter = new DSHttpAdapter({})
var localAdapter = new DSLocalStorageAdapter()
httpAdapter.defaults.basePath = 'http://s2p-api-demo.herokuapp.com/'
store.registerAdapter('ls', localAdapter, { default: true })
store.registerAdapter('http',httpAdapter)

// define model
var Message = store.defineResource({
  name: 'message',
  // Add a new message in store
  // Update a new message in store
  // TODO: handle destroy message
  afterInject: function (resource, data) {
    // sync to localstorage, created by http
    Message.emit('change'); // triggers an update of React's state

    return data
  }
});


var App = React.createClass({
  getInitialState: function () {
    return { messages: [], is_there_any_code_yet: false};
  },
  componentWillMount: function() {
    // Fill the store with localstorage
    Message.findAll().then(function(messages) {})

    isOnline(function(online) {
      if (online) {
        // build params from localstorage
        var params = {
          id: [
            {
              'codes': 'N7ljVx',
              'updated_at': '12345'
            },
            {
              'codes': 'code123',
              'updated_at': 'updated_at123'
            }
          ]
        }
        var messages = []
        var this2 = this
        httpAdapter.POST('http://s2p-api-demo.herokuapp.com/latest', params).then(function (res) {
          // DS#inject res.data
          res.data.forEach(function(m) {
            Message.inject(m)
            localAdapter.create(Message, m) // save data to localstorage

          });
          // save params in localstore
          params.id.forEach(function(id) {
            localStorage.setItem(id.codes, id.updated_at);
          })
        });
      }
    })
  },
  onChange: function () {
    this.setState({ messages: Message.getAll()});
  },
  componentDidMount: function() {
    Message.on('change', this.onChange);
  },

  isThereAnyCodeYet: function() {
    // have a look at localStorage
    // if codes key is present then there is at least one code saved => render <Messages />
    // if codes key is not present, ask the user to enter at least one code => render <Welcome />
    if (localStorage.getItem('codes')) {
      this.setState({is_there_any_code_yet: true})
    }

  },

  render: function() {
    var screen_to_show;
    if (this.state.is_there_any_code_yet) {
      screen_to_show = <Messages data={this.state.messages} />
    } else {
      screen_to_show = <Welcome />
    }
    return (
      <div>
      {screen_to_show}
      </div>
    )
  }
});

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/index.html" component={App}></Route>
  </Router>
), document.getElementById('app'))
