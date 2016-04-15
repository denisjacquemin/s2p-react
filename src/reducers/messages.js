// messages: {
//   isFetching: false,
//   didInvalidate: false,
//   lastUpdated: 1439478405547,
//   items: [
//     {
//       id: 42,
//       title: 'Confusion about Flux and Relay'
//       content: 'the content'
//     },
//     {
//       id: 500,
//       title: 'Creating a Simple Application Using React JS and Flux Architecture'
//       content: 'the content'
//     }
//   ]
// }

const messageInitialState = {}

// MESSAGE REDUCER
const message = (state = messageInitialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
          id: action.id,
          title: action.title,
          content: action.content,
          important: false
      };
    case 'TOGGLE_IMPORTANT':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        important: !state.important
      };
    default:
      return state;
  }
};

const messagesInitialState = []

// MESSAGES REDUCER
const messages = (state = messagesInitialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        message(undefined, action)
      ];
    case 'TOGGLE_IMPORTANT':
      let items = state.items.map(m => message(m, action));
      return Object.assign({}, state, {
          items: items
      });

    case 'REQUEST_MESSAGES':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case 'RECEIVE_MESSAGES':
      // let messagesInStore = []
      // if (state.items !== undefined) { messagesInStore = state.items.slice() }
      // action.messages.map((newM) => { // for each new/update of message
      //
      //   // if message is already present in state, get the index
      //   let index = messagesInStore.findIndex((mInStore) => {
      //     return mInStore.id === newM.id
      //   })
      //   if (index !== -1) { // replace it
      //     messagesInStore[index] = {
      //       ...newM,
      //       important: messagesInStore[index].important
      //     }
      //   } else { // if message is not already present in state
      //     message(undefined, newM)
      //     messagesInStore.push({
      //       ...newM,
      //       important: false
      //     })
      //   }
      //
      // });

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.messages,
        lastUpdate: action.receivedAt
      });
    case 'HANDLE_REQUEST_MESSAGES_ERROR':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      });
    case 'RESET_IS_FETCHING':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      });
    default:
      return state;
  }
};

export default messages
