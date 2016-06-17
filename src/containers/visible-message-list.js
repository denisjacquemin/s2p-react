import React from 'react'
import { connect } from 'react-redux'
import { showFullMessage, fetchMessages, toggleShowImportant, hideSnackbar, showCodeList, saveCurrentScrollPositionY} from '../actions'
import MessageList from '../components/message-list'

const getVisibleMessages = (messages = [], showOnlyImportant) => {
  if (showOnlyImportant) {
    return messages.filter(m => m.important)
  }
  return messages
}

const mapStateToProps = (state) => {
  return {
    messages: getVisibleMessages(
      state.messages.items,
      state.showOnlyImportant
    ),
    isFetching: state.messages.isFetching,
    showImportant: state.showOnlyImportant,
    snackbar: state.snackbar,
    currentScrollPositionY: state.currentScrollPositionY
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMessageClick: (id) => {
      dispatch(hideSnackbar());
      dispatch(saveCurrentScrollPositionY());
      dispatch(showFullMessage(id));
    },
    fetchMessages: () => {
      dispatch(hideSnackbar());
      dispatch(fetchMessages());
    },
    showCodeList: () => {
      dispatch(hideSnackbar());
      dispatch(saveCurrentScrollPositionY());
      dispatch(showCodeList());
    },
    toggleShowImportant: () => {
      dispatch(hideSnackbar());
      dispatch(toggleShowImportant());
    }
  };
};

const VisibleMessageList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);


export default VisibleMessageList;
