import axios from 'axios'

const getUserClaimsAction = (payload) => ({
  type: 'GET_USER_CLAIMS',
  payload
})

export const getUserClaims = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_HOST}/claim/user`,
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