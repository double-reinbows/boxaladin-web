const defaultState = {
  userWins: []
}

const winReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_USER_WINS':
      return {...state, userWins: action.payload}
      break;
  
    default:
      return state
      break;
  }
}

export default winReducer