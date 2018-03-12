import axios from 'axios'

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
        url: `${process.env.REACT_APP_API_HOST}/transaction/userPending`,
        headers: {
          token: localStorage.getItem('token')
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
        url: `${process.env.REACT_APP_API_HOST}/transaction/user`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        dispatch(getUserTransactionsAction(data))
      })
      .catch(err => console.log(err))
    }
  }
