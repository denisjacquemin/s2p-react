import React from 'react'
import CodeForm from './code-form'

var Welcome = React.createClass({
  render: function() {
    return (
      <div className="add_code">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <header className="mdl-layout__header mdl-layout__header-big">
            <div className="mdl-layout__header-row mdl-layout__header-row">
              <div className="mdl-layout__header-text">
                <div className="mdl-layout__header-text-title">Nouveau code</div>
                <div className="mdl-layout__header-text-subtitle">Entrez le code reçu de l'école</div>
              </div>
            </div>
          </header>
          <CodeForm />
        </div>
      </div>
    );
  }
});
export default Welcome;
