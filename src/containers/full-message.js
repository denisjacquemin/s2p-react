import React from 'react'
import { connect } from 'react-redux'
import { toggleImportant, showMessagesScreen } from '../actions'
import FullMessageComponent from '../components/full-message-component'

const mapStateToProps = (state) => {
  let message = state.messages.items.find((m) => {
    return m.id === state.currentMessage.id
  })
  return {
    currentMessage: message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleImportant: (id) => {
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
