const showAddCodeFormInitialState = false

const showAddCodeForm = (state = showAddCodeFormInitialState, action) => {
  switch (action.type) {
    case 'SHOW_ADD_CODE_FORM':
      return action.showAddCodeForm
    default:
      return state;
  }
}
export default showAddCodeForm
