import React from 'react'
import { connect } from 'react-redux'
import { showMessagesScreen, addCode, deleteCode, hideSnackbar, fetchMessages, resetIsFetching, linkCodeToDevice, unlinkCodeToDevice} from '../actions'


import CodeListComponent from '../components/code-list-component'


const mapStateToProps = (state) => {
  return {
    codes: state.codes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCode: (code) => {
      dispatch(addCode(code))
      dispatch(linkCodeToDevice(code, device.platform))
    },
    showMessagesScreen: () => {
      dispatch(resetIsFetching());
      dispatch(showMessagesScreen());
      dispatch(hideSnackbar());
      dispatch(fetchMessages());
    },
    onDeleteCode: (code) => {
      dispatch(deleteCode(code));
      dispatch(unlinkCodeToDevice(code, device.platform))
    }
  };
};

const CodeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeListComponent);

export default CodeList;
