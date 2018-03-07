import axios from 'axios'

const getRewardsAction = (payload) => ({
  type: 'GET_REWARDS',
  payload
})

export const getRewards = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://localhost:3000/reward`,
    })
    .then(({data}) => {
      dispatch(getRewardsAction(data))
    })
    .catch(err => console.log(err))
  }
}