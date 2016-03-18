import React from 'react'
import { connect } from 'react-redux'
import { toggleImportant, showMessagesScreen } from '../actions'
import FullMessageComponent from '../components/full-message-component'

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleImportant: (code) => {
      dispatch(toggleImportant(id))
    },
    onShowMessagesScreen: () => {
      dispatch(showMessagesScreen())
    }
  };
};

const FullMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMessageComponent);

export default FullMessage;
