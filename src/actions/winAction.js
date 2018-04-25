import axios from 'axios'

const getUserWinsAction = (payload) => ({
  type: 'GET_USER_WINS',
  payload
})

export const getUserWins = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_HOST}/win/user`,
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