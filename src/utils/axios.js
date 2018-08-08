import envChecker from './envChecker';
import axios from 'axios';

const helperAxios = function(fetchMethod, fetchUrl, fetchData) {
  console.log('axios')
  console.log(fetchMethod, fetchUrl, fetchData)
  return axios({
    method: fetchMethod,
    url: `${envChecker('api')}/${fetchUrl}`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: fetchData
  })
}

export default helperAxios