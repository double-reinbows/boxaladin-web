import axios from 'axios'

  export const getUserPendingTransactionAction = (payload) => ({
    type: 'GET_USER_PENDING_TRANSACTION',
    payload
  })

  export const getUserPendingTransactions = () => {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `http://localhost:3000/transaction/userPending`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        dispatch(getUserPendingTransactionAction(data))
      })
      .catch(err => console.log(err))
    }
  }
