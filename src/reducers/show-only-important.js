const initialState = false

const showOnlyImportant = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_IMPORTANT':
      return !state;
    default:
      return state;
  }
};

export default showOnlyImportant
