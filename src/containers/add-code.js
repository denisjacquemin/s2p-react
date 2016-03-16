import React from 'react'
import { connect } from 'react-redux'
import { addCode, showMessagesScreen } from '../actions'

import AddCodeScreen from '../components/add-code-screen'

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCode: (code) => {
      dispatch(addCode(code))
    },
    onShowMessagesScreen: () => {
      dispatch(showMessagesScreen())
    }
  };
};

const AddCode = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCodeScreen);

export default AddCode;
