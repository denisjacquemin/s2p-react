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

//var ls = new DSLocalStorageAdapter();

//store.registerAdapter('ls', ls);


var App = React.createClass({
  getInitialState: function () {


    return { messages: [] };
  },
  componentWillMount: function() {
    var store = new JSData.DS({});
    var httpAdapter = new DSHttpAdapter({});
    httpAdapter.defaults.basePath = 'http://s2p-api-demo.herokuapp.com/'
    store.registerAdapter('http',httpAdapter , { default: true });
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
      res.data; // { id: 1, ... }
      res.headers; // {...}
      res.status; // 200
      res.config;
      console.log(JSON.stringify(this2.state.messages));
      console.log(JSON.stringify(res.data));
      this2.setState({messages: res.data});
      console.log(JSON.stringify(this2.state.messages));
    });
  },

  componentDidMount: function() {

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
