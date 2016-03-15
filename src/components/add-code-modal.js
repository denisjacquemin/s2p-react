import React from 'react'

var Modal = React.createClass({
  componentDidUpdate: function() {
      // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
      componentHandler.upgradeDom();
      let dialog = document.querySelector('dialog');
      if (this.props.show) {
        dialog.showModal();
      } else {
        dialog.close();
      }
  },

  handleNoMoreCode: function() {
    this.props.closeModal();
  },

  handleShowMessagesScreen: function() {
    this.props.showMessagesScreen();
  },

  render: function() {
    return(
      <dialog className="mdl-dialog">
  	    <h4 className="mdl-dialog__title">Code enregistré</h4>
  	    <div className="mdl-dialog__content">
  	      <p>
  	        Avez vous un autre code à rentrer?
  	      </p>
  	    </div>
  	    <div className="mdl-dialog__actions">
  	      <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.handleShowMessagesScreen}>Non</button>
  	      <button type="button" className="mdl-button mdl-js-button mdl-button--raised" onClick={this.handleNoMoreCode}>Oui</button>
  	    </div>
  	  </dialog>
    );
  }
});

export default Modal;
