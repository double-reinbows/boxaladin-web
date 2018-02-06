const defaultState = {
  userPendingTransactions: [],
  userTransactions: []
}

const transactionReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING_TRANSACTIONS':
      return {...state, userPendingTransactions: action.payload}
    
    case 'GET_USER_TRANSACTIONS':
      return {...state, userTransactions: action.payload}

  default:
    return state
  }
}

export default transactionReducer
