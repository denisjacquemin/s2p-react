import {
  FETCH_LATEST_MESSAGES,
  RECEIVE_MESSAGES
} from '../actions'


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
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.messages,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default messages
