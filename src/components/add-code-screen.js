import React, {Component} from 'react'

function getCodeSaved(handleShowMessagesScreen, handleShowCodeForm) {
  return (
    <div className="code-saved">
      <div className="mdl-dialog__title">Code Enregistré</div>
      <div className="mdl-dialog__content"><p>Avez-vous un autre code à rentrer?</p></div>
      <div className="mdl-dialog__actions">
        <button onTouchTap={handleShowMessagesScreen} type="button" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">Non</button>
        <button onTouchTab={handleShowCodeForm} type="button" className="mdl-button mdl-js-button mdl-js-ripple-effect">Oui</button>
      </div>
    </div>
  )
};

function getAddCodeForm(addCode, handleNewCodeChange) {
  return (
    <div className="form">
      <div className="mdl-textfield mdl-js-textfield">
        <input className="mdl-textfield__input" type="text" id="sample3" onChange={handleNewCodeChange} />
        <label className="mdl-textfield__label">Code...</label>
      </div>
      <div className="fullname">Un message ici</div>
      <button onTouchTab={addCode} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect">
          Enregistrer
      </button>
    </div>
  )
};

var AddCodeScreen = React.createClass( {

  getInitialState: function() {
    return { body: 'AddCodeForm', newCode: '' };
  },

  componentDidUpdate: function () {
    componentHandler.upgradeDom();
  },

  componentWillMount: function () {
    this.codeSaved = getCodeSaved(this.handleShowMessagesScreen, this.handleShowCodeForm)
    this.addCodeForm = getAddCodeForm(this.handleAddCode, this.handleNewCodeChange)
  },

  handleAddCode: function(code) {
    this.props.onAddCode(this.state.newCode);
    this.setState({ body: 'CodeSaved' })
  },

  handleNewCodeChange: function(e) {
    this.setState({newCode: e.target.value})
  },

  handleShowCodeForm: function() {
    this.setState({ body: 'AddCodeForm', newCode: '' })
  },

  handleShowMessagesScreen: function() {
    this.props.onShowMessagesScreen()
  },

  render: function() {

    let body = this.codeSaved
    if (this.state.body === 'AddCodeForm') {
      body = this.addCodeForm
    }

    return (
      <div>
        <div className="add_code">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <header className="mdl-layout__header mdl-layout__header-big">
              <div className="mdl-layout__header-row mdl-layout__header-row">
                <h2 className="mdl-layout__header-title-text">Nouveau code</h2>
              </div>
            </header>
            <main className="mdl-layout__content mdl-layout__content-big">
                {body}
            </main>
          </div>
        </div>
      </div>
    )
  }
});
export default AddCodeScreen;
