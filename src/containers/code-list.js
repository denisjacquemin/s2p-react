import React from 'react'
import { connect } from 'react-redux'
import { showMessagesScreen, addCode, deleteCode, hideSnackbar, fetchMessages, resetIsFetching, linkCodeToDevice, unlinkCodeToDevice} from '../actions'


import CodeListComponent from '../components/code-list-component'


const mapStateToProps = (state) => {
  return {
    codes: state.codes,
    snackbar: state.snackbar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCode: (code) => {
      dispatch(addCode(code))
      dispatch(linkCodeToDevice(code, device.uuid, device.platform))
    },
    showMessagesScreen: () => {
      dispatch(resetIsFetching());
      dispatch(showMessagesScreen());
      dispatch(hideSnackbar());
      dispatch(fetchMessages());
    },
    onDeleteCode: (code) => {
      dispatch(deleteCode(code));
      dispatch(unlinkCodeToDevice(code, device.uuid))
    }
  };
};

const CodeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeListComponent);

export default CodeList;
