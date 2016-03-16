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
      console.log('In RECEIVE_MESSAGES: ' + JSON.stringify(action.json))
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.messages,
        lastUpdate: action.receivedAt
      });
    default:
      return state;
  }
};

export default messages
