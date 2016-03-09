import React from 'react'
import JSData from 'js-data'
import DSHttpAdapter from 'js-data-http'
import DSLocalStorageAdapter from 'js-data-localstorage'
import { render } from 'react-dom'
import PageNotFound from './components/page-not-found'

import Header from './components/header'
import Drawer from './components/drawer'
import Messages from './components/messages'


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
    console.log('1.2 ou 2.5: afterInject Ressource Message afterInject: ' + JSON.stringify(data));
    Message.emit('change'); // triggers an update of React's state

    return data
  },
  afterCreate: function (resource, data) {
    console.log('Ressource Message afterCreate: ' + JSON.stringify(data));
  }
});


var App = React.createClass({
  getInitialState: function () {
    return { messages: [] };
  },
  componentWillMount: function() {
    // Fill the store with localstorage
    console.log('1.1: findAll from localstorage start');
    Message.findAll().then(function(messages) {
      console.log('1.3: back from findAll from localstorage: ' + messages.length + ' items in store');
    })

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
    console.log('2.1: check server now')
    httpAdapter.POST('http://s2p-api-demo.herokuapp.com/latest', params).then(function (res) {
      // DS#inject res.data
      console.log('2.2: back from server')
      res.data.forEach(function(m) {
        console.log('2.3: Message#Inject: ' + JSON.stringify(m))
        Message.inject(m)

        console.log('2.4: saving to localstore: ' + JSON.stringify(m))
        localAdapter.create(Message, m) // save data to localstorage

      });
      // save params in localstore
      params.id.forEach(function(id) {
        console.log('3: save params to localstore: ' + JSON.stringify(id))
        localStorage.setItem(id.codes, id.updated_at);
      })

      //this2.setState({messages: res.data});
    });
  },
  onChange: function () {
    this.setState({ messages: Message.getAll()});
  },
  componentDidMount: function() {
    Message.on('change', this.onChange);
  },

  render: function() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded is-small-screen">
        <Header />
        <Drawer />
        <main className="mdl-layout__content">
            <Messages data={this.state.messages}/>
        </main>
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
