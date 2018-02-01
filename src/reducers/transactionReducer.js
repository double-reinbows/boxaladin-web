const defaultState = {
  userPendingTransactions: []
}

const transactionReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING_TRANSACTION':
      return {...state, userPendingTransactions: action.payload}

  default:
    return state
  }
}

export default transactionReducer
