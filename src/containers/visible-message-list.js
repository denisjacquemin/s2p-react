import React from 'react'
import { connect } from 'react-redux'
import { showFullMessage, fetchMessages, toggleShowImportant } from '../actions'
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
    isFetching: state.isFetching,
    showImportant: state.showOnlyImportant
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMessageClick: (id) => {
      dispatch(showFullMessage(id))
    },
    fetchMessages: () => {
      dispatch(fetchMessages());
    },
    toggleShowImportant: () => {
      dispatch(toggleShowImportant());
    }
  };
};

const VisibleMessageList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);


// class VisibleMessageList extends React.Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     );
//   }
//   componentWilllUnmount() {
//     this.unsubscribe()
//   }
//   render() {
//     const props = this.props;
//     const { store } = this.context;
//     const state = store.getState();
//
//     return (
//       <MessageList
//         messages= {
//           getVisibleMessages(
//             state.messages,
//             state.showOnlyImportant
//           )
//         }
//         onMessageClick={id =>
//           store.dispatch({
//             type: 'SHOW_FULL_MESSAGE',
//             id
//           })
//         }
//       />
//     )
//   }
// }
// VisibleMessageList.contextTypes = {
//   store: React.PropTypes.object
// };
export default VisibleMessageList;
