const snackbarInitialState = {show: false, message: ''}


const snackbar = (state = snackbarInitialState, action) => {
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return {
        show: true,
        message: action.message
      }
      break;
    case 'HIDE_SNACKBAR':
      return {
        show: false,
        message: ''
      }
    default:
      return state;
  }
};

export default snackbar
