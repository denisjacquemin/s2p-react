const invalidCodeMessageInitialState = ""

const invalidCodeMessage = (state = invalidCodeMessageInitialState, action) => {
  switch (action.type) {
    case 'CODE_INVALID_MESSAGE':
      return action.message
    default:
      return state;
  }
};

export default invalidCodeMessage
