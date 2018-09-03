import axios from 'axios'
import envChecker from '../utils/envChecker'

  export const getUserWalletTransactionsAction = (payload) => ({
    type: 'GET_USER_WALLET_TRANSACTIONS',
    payload
  })

  export const getUserWalletTransactions = () => {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `${envChecker('api')}/walletstatus`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        dispatch(getUserWalletTransactionsAction(data))
      })
      .catch(err => console.log(err))
    }
  }
