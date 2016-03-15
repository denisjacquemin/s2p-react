import React from 'react'
import { connect } from 'react-redux'
import { hideModal, showMessagesScreen } from '../actions'
import AddCodeModalComponent from '../components/add-code-modal'

const mapStateToProps = (state) => {
  return {
    show: state.modal.show,
    message: state.modal.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(hideModal()) // example of actionName: showAddCodeForm
    },
    showMessagesScreen: () => {
      dispatch(showMessagesScreen())
    }
  };
};

const AddCodeModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCodeModalComponent);

export default AddCodeModal;
