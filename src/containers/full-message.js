import React from 'react'
import { connect } from 'react-redux'
import { toggleImportant, showMessagesScreen, messageViewedAnalytics, submitForm, showSnackbar } from '../actions'
import FullMessageComponent from '../components/full-message-component'

const mapStateToProps = (state) => {
  let message = state.messages.items.find((m) => {
    return m.id === parseInt(state.currentMessage.id)
  })
  return {
    currentMessage: message,
    snackbar: state.snackbar
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleImportant: (id) => {
      dispatch(toggleImportant(id))
    },
    onShowMessagesScreen: () => {
      dispatch(showMessagesScreen())
    },
    onMessageViewed: (mid, sid, uuid) => {
      dispatch(messageViewedAnalytics(mid, sid, uuid))
    },
    onSubmitForm: (state, muuid) => {
      dispatch(submitForm(state, muuid))
    },
    showSnackbar: (message) => {
      dispatch(showSnackbar(message))
    }
  };
};

const FullMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FullMessageComponent);

export default FullMessage;
