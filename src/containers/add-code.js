import React from 'react'
import { connect } from 'react-redux'
import { addCode, showMessagesScreen, hideSnackbar, fetchMessages, linkCodeToDevice, codeInvalidMessage, codeValid } from '../actions'

import AddCodeScreen from '../components/add-code-screen'

const mapStateToProps = (state) => {
  return {
    invalidCodeMessage: state.invalidCodeMessage,
    validCode: state.validCode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCode: (code) => {
      dispatch(addCode(code))
    },
    resetErrorMessage: () => {
      dispatch(codeInvalidMessage(''));
    },
    resetValidCode: () => {
      dispatch(codeValid(false));
    },
    onShowMessagesScreen: () => {
      dispatch(showMessagesScreen());
      dispatch(hideSnackbar());
      dispatch(fetchMessages());
    }
  };
};

const AddCode = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCodeScreen);

export default AddCode;
