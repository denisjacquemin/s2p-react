import React from 'react'
//import MDL from 'material-design-lite'
import jquery from 'jquery'

import isOnline from 'is-online'
import Message from './code-form'

var CodeForm = React.createClass({

  getInitialState: function() {
    return {new_code: "", message: ''}
  },

  componentDidMount: function() {
    componentHandler.upgradeDom();
    this.showConnectionStatus()
  },

  showConnectionStatus: function() {
    var snackbarContainer = this.refs.snackbarContainer;
    isOnline(function(online) {
      if (!online) {
        snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Connection indisponible'});
      }
    })
  },

  handleChange: function(event) {
    console.log('handleChange: ' + event.target.value)
    this.setState({new_code: event.target.value}, function() {
      console.log('setState done: ' + this.state.new_code + '(' + this.state.new_code.length + 'length)')
      if (this.state.new_code.length > 5) {
        console.log('this.state.new_code.length > 5')
        // check if code is valid
        var this2 = this
        httpAdapter.GET('http://s2p-api-demo.herokuapp.com/code_label' + this.state.new_code).then(function (res) {
          console.log('back from code_label: ' + JSON.stringify(res))
          this2.setState({message: result})
        })
      }
    });
  },

  onSubmit: function() {
    // check if code is valid

    console.log('save ' + this.state.new_code);
  },

  render: function() {
    return (
      <main className="mdl-layout__content">
        <div className="mdl-grid mdl-grid--no-spacing">
          <div className="form">
            <div className="mdl-textfield mdl-js-textfield">
              <input className="mdl-textfield__input" type="text" id="sample3" value={this.state.new_code} onChange={this.handleChange} />
              <label className="mdl-textfield__label">Code...</label>
            </div>
            <div className="fullname">{this.state.message}</div>
            <button onClick={this.onSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect">
              Enregistrer
            </button>
          </div>
        </div>
        <div ref="snackbarContainer" className="mdl-js-snackbar mdl-snackbar">
          <div className="mdl-snackbar__text"></div>
          <button type="button" className="mdl-snackbar__action"></button>
        </div>
      </main>
    );
  }
});
export default CodeForm;
