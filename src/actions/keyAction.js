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
			headers: {
        key: process.env.REACT_APP_KEY
      },
			url: `${envChecker('api')}/voucheraladinkey`
		})
		.then(({data}) => {
			dispatch(getKeysAction(data))
		})
		.catch(err => console.log(err))
	}
}
