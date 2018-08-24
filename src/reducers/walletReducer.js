const defaultState = {
  userWalletTransactions: []
}

const walletReducer = (state=defaultState, action) => {
  switch (action.type) {    
    case 'GET_USER_WALLET_TRANSACTIONS':
      return {...state, userWalletTransactions: action.payload}

  default:
    return state
  }
}

export default walletReducer
