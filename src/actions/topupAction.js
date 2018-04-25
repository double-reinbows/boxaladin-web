import axios from 'axios'

  export const getUserPendingTopupTransactionsAction = (payload) => ({
    type: 'GET_USER_PENDING_TOPUP_TRANSACTIONS',
    payload
  })

  export const getUserTopupTransactionsAction = (payload) => ({
    type: 'GET_USER_TOPUP_TRANSACTIONS',
    payload
  })

  export const getUserPendingTopupTransactions = () => {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_HOST}/topup/userPending`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        dispatch(getUserPendingTopupTransactionsAction(data))
      })
      .catch(err => console.log(err))
    }
  }

  export const getUserTopupTransactions = () => {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_HOST}/topup/user`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        dispatch(getUserTopupTransactionsAction(data))
      })
      .catch(err => console.log(err))
    }
  }
