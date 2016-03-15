const modalInitialState = {
  show: false,
  message: ''
}

// MESSAGES REDUCER
const modal = (state = modalInitialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        show: true,
        message: action.message
      }
    case 'HIDE_MODAL':
      return {
        show: false,
        message: ''
      }
    default:
      return state;
  }
};

export default modal
