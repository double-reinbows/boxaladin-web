import axios from 'axios'

const getUserWinsAction = (payload) => ({
  type: 'GET_USER_WINS',
  payload
})

export const getUserWins = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://localhost:3000/win/user`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      dispatch(getUserWinsAction(data))
    })
    .catch(err => console.log(err))
  }
}