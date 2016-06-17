const initialState = 0

const currentScrollPositionY = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_CURRENT_POSITIONY':
      return action.currentScrollPositionY;
    default:
      return state;
  }
};

export default currentScrollPositionY
