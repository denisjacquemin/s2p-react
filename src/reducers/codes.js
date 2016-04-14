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
    default:
      return state;
  }
};

export default codes
