import axios from 'axios'
import envChecker from '../utils/envChecker'

  export const getUserPendingTransactionsAction = (payload) => ({
    type: 'GET_USER_PENDING_TRANSACTIONS',
    payload
  })

  export const getUserTransactionsAction = (payload) => ({
    type: 'GET_USER_TRANSACTIONS',
    payload
  })

  export const getUserPendingTransactions = () => {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `${envChecker('api')}/transaction/userPending`,
        headers: {
          token: localStorage.getItem('token'),
          key: process.env.REACT_APP_KEY
        }
      })
      .then(({data}) => {
        dispatch(getUserPendingTransactionsAction(data))
      })
      .catch(err => console.log(err))
    }
  }

  export const getUserTransactions = () => {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `${envChecker('api')}/transaction/user`,
        headers: {
          token: localStorage.getItem('token'),
          key: process.env.REACT_APP_KEY
        }
      })
      .then(({data}) => {
        dispatch(getUserTransactionsAction(data))
      })
      .catch(err => console.log(err))
    }
  }
