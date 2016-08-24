const codeValidInitialState = false

const validCode = (state = codeValidInitialState, action) => {
  switch (action.type) {
    case 'CODE_VALID':
      return action.isCodeValid
    default:
      return state;
  }
}
export default validCode
