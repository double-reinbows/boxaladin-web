const defaultState = {
  rewards: []
}

const rewardReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_REWARDS':
      return {...state, rewards: action.payload}
      break;
  
    default:
      return state
      break;
  }
}

export default rewardReducer