import React from 'react'
import { render } from 'react-dom'
import PageNotFound from './components/page-not-found'

import Header from './components/header'
import Drawer from './components/drawer'
import Messages from './components/messages'


import { Router, Route, hashHistory } from 'react-router'

var NotFoundRoute = Router.NotFoundRoute

var App = React.createClass({
  getInitialState: function() {
    return {
    }
  },
  render: function() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded is-small-screen">
        <Header />
        <Drawer />
        <main className="mdl-layout__content">
            <Messages />
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
