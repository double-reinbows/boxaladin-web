const defaultState = {
  userClaims: []
}

const claimReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_USER_CLAIMS':
      return {...state, userClaims: action.payload}
      break;
  
    default:
      return state
      break;
  }
}

export default claimReducer