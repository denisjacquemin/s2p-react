import React from 'react'

var Drawer = React.createClass({
  render: function() {
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout__title">Titre ici</span>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="#">Flux</a>
          <a className="mdl-navigation__link" href="#">Evénéments</a>
          <a className="mdl-navigation__link" href="#">Epinglés</a>
        </nav>
        <div className="mdl-layout-spacer"></div>

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
      </div>
    );
  }
});
export default Drawer;
