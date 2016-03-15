import React from 'react'
import ToggleImportant from '../containers/toggle-important'


const Header = () => (
  <header className="mdl-layout__header is-casting-shadow">
    <div className="mdl-layout__header-row">
      <div className="mdl-layout-spacer"></div>
      <ToggleImportant />
    </div>
  </header>
)

export default Header;
