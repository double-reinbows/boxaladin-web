import axios from 'axios'

const getUserClaimsAction = (payload) => ({
  type: 'GET_USER_CLAIMS',
  payload
})

export const getUserClaims = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://localhost:3000/claim/user`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      dispatch(getUserClaimsAction(data))
    })
    .catch(err => console.log(err))
  }
}