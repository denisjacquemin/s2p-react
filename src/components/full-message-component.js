import React, {Component} from 'react'


var FullMessageComponent  = React.createClass( {

  componentWillMount: function() {
  },

  componentDidMount: function() {
    componentHandler.upgradeDom();
  },

  handleShowMessagesScreen: function(e) {
    console.log('in handleShowMessagesScreen' + e)
    this.props.onShowMessagesScreen()
    e.preventDefault();
  },

  render: function() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
            <button className="mdl-layout-icon mdl-button mdl-js-button mdl-button--icon" onTouchTap={this.handleShowMessagesScreen}>
              <i className="material-icons">arrow_back</i>
            </button>
        </header>
        <main className="mdl-layout__content entry">
          <div className="mdl-grid mdl-grid--no-spacing">
              <div className="school  mdl-card mdl-cell mdl-cell--12-col">
                <div className="mdl-card__media mdl-card__title mdl-card--expand mdl-color--teal-300">
                  <h2 className="mdl-card__title-text">Nouvelle classe maternelle</h2>
                </div>
                <div className="mdl-card__supporting-text mdl-color-text--grey-600 mdl-cell--stretch">
                  <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
                  <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
                  <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
                  <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
                  <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
                  <p>Le nombre d'enfants dans les classes maternelles étant tel, nous avons l'autorisation d'ouvrir à partir de ce lundi 18 janvier une demi-classe..</p>
                </div>
              </div>
          </div>


          <footer className="mdl-mini-footer">
            <div className="mdl-mini-footer--left-section">
              <button className="mdl-mini-footer--social-btn social-btn social-btn__twitter">
                <span className="visuallyhidden">Twitter</span>
              </button>
              <button className="mdl-mini-footer--social-btn social-btn social-btn__blogger">
                <span className="visuallyhidden">Facebook</span>
              </button>
              <button className="mdl-mini-footer--social-btn social-btn social-btn__gplus">
                <span className="visuallyhidden">Google Plus</span>
              </button>
            </div>
            <div className="mdl-mini-footer--right-section">
              <button className="mdl-mini-footer--social-btn social-btn__share">
                <i className="material-icons" role="presentation">share</i>
                <span className="visuallyhidden">share</span>
              </button>
            </div>
          </footer>
        </main>
      </div>
    )
  }
});

export default FullMessageComponent;
