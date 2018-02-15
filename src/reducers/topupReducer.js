const defaultState = {
  userPendingTopupTransactions: [],
  userTopupTransactions: []
}

const topupReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING_TOPUP_TRANSACTIONS':
      return {...state, userPendingTopupTransactions: action.payload}

    case 'GET_USER_TOPUP_TRANSACTIONS':
      return {...state, userTopupTransactions: action.payload}

  default:
    return state
  }
}

export default topupReducer
