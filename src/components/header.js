import React from 'react'

var Header = React.createClass({
  render: function() {
    return (
      <header className="mdl-layout__header is-casting-shadow">
        <div className="mdl-layout__header-row">
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>
      </header>
    );
  }
});
export default Header;
