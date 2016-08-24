// codes: [
//   {
//     code: 'asw8r9'
//     last_update: 843984398
//   }
// ]


const codeInitialState = {}


// code REDUCER
const code = (state = codeInitialState, action) => {
  switch (action.type) {
    case 'ADD_CODE':
      return {
          code: action.code,
          fullname: action.fullname,
          receivedAt: action.receivedAt
      };
      default:
        return state;
  }
};

const codesInitialState = []

// MESSAGES REDUCER
const codes = (state = codesInitialState, action) => {
  switch (action.type) {
    case 'ADD_CODE': // test if new code is already in state
      if (state.find(function(el){return el.code === action.code})) {
        return state;
      } else {
        return [
          ...state,
          code(undefined, action)
        ];
      }
      break;
    case 'DELETE_CODE':
      let index = state.findIndex(function(el){
        return el.code === action.code
      })
      if (index > -1) {
        let newState = state.slice()
        newState.splice(index, 1)
        return newState
      } else {
        return state;
      }
      break;
    default:
      return state;
  }
};

export default codes
