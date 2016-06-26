import React from 'react'
import { connect } from 'react-redux'
import { addCode, showMessagesScreen, hideSnackbar, fetchMessages, linkCodeToDevice } from '../actions'

import AddCodeScreen from '../components/add-code-screen'

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCode: (code) => {
      dispatch(addCode(code))
      dispatch(linkCodeToDevice(code, device.uuid))
    },
    onShowMessagesScreen: () => {
      dispatch(showMessagesScreen())
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
