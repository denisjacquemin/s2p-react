const currentMessageInitialState = {}

const currentMessage = (state = currentMessageInitialState, action) => {
  switch (action.type) {
    case 'SHOW_FULL_MESSAGE':
      return {id: action.id}
    default:
      return state;
  }
};

export default currentMessage
