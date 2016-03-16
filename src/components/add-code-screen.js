import React, {Component} from 'react'


function getCodeSaved(handleShowMessagesScreen, handleShowCodeForm) {
  return (
    <div>
      <div className="mdl-textfield mdl-js-textfield">
        <h4>Code Enregistré</h4>
        <p>
          Avez vous un autre code à rentrer?
        </p>
      </div>
      <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={handleShowMessagesScreen}>Non</button>
      <button type="button" className="mdl-button mdl-js-button mdl-button--raised" onClick={handleShowCodeForm}>Oui</button>
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
      <button onClick={addCode} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect">
        Enregistrer
      </button>
    </div>
  )
};

var AddCodeScreen = React.createClass( {

  getInitialState: function() {
    return { body: 'AddCodeForm', newCode: '' };
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
    console.log('In handleShowCodeForm')
    this.setState({ body: 'AddCodeForm', newCode: '' })
  },

  handleShowMessagesScreen: function() {
    console.log('In handleShowMessagesScreen')
    this.props.onShowMessagesScreen()
  },

  render: function() {

    let body = this.codeSaved
    if (this.state.body === 'AddCodeForm') {
      body = this.addCodeForm
    }

    console.log('AddCodeScreen render')
    return (
      <div>
        <div className="add_code">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <header className="mdl-layout__header mdl-layout__header-big">
              <div className="mdl-layout__header-row mdl-layout__header-row">
                <div className="mdl-layout__header-text">
                  <div className="mdl-layout__header-text-title">Nouveau code</div>
                  <div className="mdl-layout__header-text-subtitle">Entrez le code reçu de l&rsquo;école</div>
                </div>
              </div>
            </header>
            <main className="mdl-layout__content">
              <div className="mdl-grid mdl-grid--no-spacing">
                {body}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
});

// var CodeForm = React.createClass({
//
//   getInitialState: function() {
//     return {new_code: "", message: ''}
//   },
//
//   componentDidMount: function() {
//     componentHandler.upgradeDom();
//     this.showConnectionStatus()
//   },
//
//   showConnectionStatus: function() {
//     var snackbarContainer = this.refs.snackbarContainer;
//     isOnline(function(online) {
//       if (!online) {
//         snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Connection indisponible'});
//       }
//     })
//   },
//
//   handleChange: function(event) {
//     console.log('handleChange: ' + event.target.value)
//     this.setState({new_code: event.target.value}, function() {
//       console.log('setState done: ' + this.state.new_code + '(' + this.state.new_code.length + 'length)')
//       if (this.state.new_code.length > 5) {
//         console.log('this.state.new_code.length > 5')
//         // check if code is valid
//         var this2 = this
//         httpAdapter.GET('http://s2p-api-demo.herokuapp.com/code_label' + this.state.new_code).then(function (res) {
//           console.log('back from code_label: ' + JSON.stringify(res))
//           this2.setState({message: result})
//         })
//       }
//     });
//   },
//
//   onSubmit: function() {
//     // check if code is valid
//
//     console.log('save ' + this.state.new_code);
//   },
//
//   render: function() {
//     return (
//       <main className="mdl-layout__content">
//         <div className="mdl-grid mdl-grid--no-spacing">
//           <div className="form">
//             <div className="mdl-textfield mdl-js-textfield">
//               <input className="mdl-textfield__input" type="text" id="sample3" value={this.state.new_code} onChange={this.handleChange} />
//               <label className="mdl-textfield__label">Code...</label>
//             </div>
//             <div className="fullname">{this.state.message}</div>
//             <button onClick={this.onSubmit} className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect">
//               Enregistrer
//             </button>
//           </div>
//         </div>
//         <div ref="snackbarContainer" className="mdl-js-snackbar mdl-snackbar">
//           <div className="mdl-snackbar__text"></div>
//           <button type="button" className="mdl-snackbar__action"></button>
//         </div>
//       </main>
//     );
//   }
// });
export default AddCodeScreen;
