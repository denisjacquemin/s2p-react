const currentScreenInitialState = 'addcode'


const currentScreen = (state = currentScreenInitialState, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGES_SCREEN':
      return 'messages'
      break;
    case 'SHOW_FULL_MESSAGE':
      return 'full_message'
      break;
    case 'SHOW_CODE_LIST':
      return 'codes'
      break;
    default:
      return state;
  }
};

export default currentScreen
