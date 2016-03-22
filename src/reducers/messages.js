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
      return state.map(m => message(m, action));
    case 'REQUEST_MESSAGES':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case 'RECEIVE_MESSAGES':
      let messagesInStore = []
      if (state.items !== undefined) { messagesInStore = state.items.slice() }
      console.log('messagesInStore: ' + JSON.stringify(messagesInStore))
      action.messages.map((newM) => { // for each new/update of message

        // if message is already present in state, get the index
        let index = messagesInStore.findIndex((mInStore) => {
          return mInStore.id === newM.id
        })
        console.log('index: ' + index)
        if (index !== -1) { // replace it
          messagesInStore[index] = newM
        } else { // if message is not already present in state
          messagesInStore.push(newM) // add it
        }
        console.log('messagesInStore: ' + JSON.stringify(messagesInStore))

      });

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: messagesInStore,
        lastUpdate: action.receivedAt
      });
    default:
      return state;
  }
};

export default messages
