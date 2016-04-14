import React from 'react'
import { connect } from 'react-redux'
import { showMessagesScreen, addCode} from '../actions'


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
    },
    showMessagesScreen: () => {
      dispatch(showMessagesScreen());
    }
  };
};

const CodeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeListComponent);

export default CodeList;
