import axios from 'axios'
import envChecker from '../utils/envChecker'

const getUserWinsAction = (payload) => ({
  type: 'GET_USER_WINS',
  payload
})

export const getUserWins = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/win/user`,
      headers: {
        token: localStorage.getItem('token'),
        key: process.env.REACT_APP_KEY
      }
    })
    .then(({data}) => {
      dispatch(getUserWinsAction(data))
    })
    .catch(err => console.log(err))
  }
}
