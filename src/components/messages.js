import React from 'react'
import Message from './message'
import Header from './header'
import Drawer from './drawer'

var Messages = React.createClass({

  componentWillMount: function() {},
  componentDidMount: function() {},
  render: function() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded is-small-screen">
        <Header />
        <Drawer />
        <main className="mdl-layout__content">
          <div className="mdl-grid">
            {
              this.props.data.map(function(message, index) {
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
        </main>
      </div>
    );
  }
});
export default Messages;
