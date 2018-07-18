import axios from 'axios'
import envChecker from '../utils/envChecker'

const getRewardsAction = (payload) => ({
  type: 'GET_REWARDS',
  payload
})

export const getRewards = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      headers: {
        key: process.env.REACT_APP_KEY
      },
      url: `${envChecker('api')}/reward`,
    })
    .then(({data}) => {
      dispatch(getRewardsAction(data))
    })
    .catch(err => console.log(err))
  }
}
