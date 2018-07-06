import axios from 'axios'
import envChecker from '../utils/envChecker'

const getUserClaimsAction = (payload) => ({
  type: 'GET_USER_CLAIMS',
  payload
})

export const getUserClaims = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/claim/user`,
      headers: {
        token: localStorage.getItem('token'),
          key: process.env.REACT_APP_KEY
      }
    })
    .then(({data}) => {
      dispatch(getUserClaimsAction(data))
    })
    .catch(err => console.log(err))
  }
}
