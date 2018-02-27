import axios from 'axios'

const getUserRewardsAction = (payload) => ({
  type: 'GET_USER_REWARDS',
  payload
})

export const getUserRewards = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://localhost:3000/win/user`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      dispatch(getUserRewardsAction(data))
    })
    .catch(err => console.log(err))
  }
}