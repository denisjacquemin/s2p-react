import React from 'react'
import Message from './message'

var Messages = React.createClass({
  getInitialState: function() {
      return {
        messages: [],
      }
  },
  componentWillMount: function() {
    // Init localstorage

    var message1 = {
      title: '',
      summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
    var message2 = {
      title: '',
      summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
    localStorage.setItem("M1", JSON.stringify(message1));
    localStorage.setItem("M2", JSON.stringify(message2));
  },
  componentDidMount: function() {
    // get messages from local storage
    var m = [];
    for(var key in localStorage) {
      if (key.startsWith('M')) {
        m.push(JSON.parse(localStorage[key]));
      }
    };

    this.setState({messages: m});

  },
  render: function() {
    return (

      <div className="mdl-grid">

        {
          this.state.messages.map(function(message, index) {
            return <Message key={index} data={message} />;
          })
        }

        <div className="bienmanger mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col mdl-cell--10-col-tablet mdl-cell--8-col-desktop">
          <div className="mdl-card__media mdl-card__title mdl-card--expand mdl-color--teal-300">
          </div>
          <div className="mdl-card__supporting-text mdl-color-text--grey-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised">La suite</a>
          </div>
        </div>

        <div className="school mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col mdl-cell--10-col-tablet mdl-cell--8-col-desktop">
          <div className="mdl-card__media mdl-card__title mdl-card--expand mdl-color--teal-300">
            <h2 className="mdl-card__title-text">Nouvelle classe maternelle</h2>
          </div>
          <div className="mdl-card__supporting-text mdl-color-text--grey-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised">La suite</a>
          </div>
        </div>

        <div className="demo-card-event mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col mdl-cell--10-col-tablet mdl-cell--8-col-desktop">
          <div className="mdl-card__title mdl-card--expand">
            <h4>
              Souper de l'école<br />
              Lorem<br />
              24 février, 2016<br />
              20h
            </h4>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--raised">
              Inscriptions
            </a>
            <div className="mdl-layout-spacer"></div>
            <i className="material-icons">event</i>
          </div>
        </div>

        <div className="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col mdl-cell--10-col-tablet mdl-cell--8-col-desktop">
          <div className="mdl-card__media mdl-card__title mdl-card--expand mdl-color--teal-300">
            <h2 className="mdl-card__title-text">Nouvelle classe maternelle</h2>
          </div>
          <div className="mdl-card__supporting-text mdl-color-text--grey-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised">La suite</a>
          </div>
        </div>

      </div>
    );
  }
});
export default Messages;
