import axios from 'axios'
import envChecker from '../utils/envChecker'

const getKeysAction = (payload) => ({
	type: 'GET_KEYS',
	payload
})

export const getKeys = (keyId) => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `${envChecker('api')}/voucheraladinkey`
		})
		.then(({data}) => {
      dispatch(getKeysAction(data))
		})
		.catch(err => console.log(err))
	}
}
