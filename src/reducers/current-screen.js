const currentScreenInitialState = 'addcode'

// MESSAGES REDUCER
const currentScreen = (state = currentScreenInitialState, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGES_SCREEN':
      return 'messages'
    default:
      return state;
  }
};

export default currentScreen
