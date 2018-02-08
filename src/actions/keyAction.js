import axios from 'axios'

const getKeysAction = (payload) => ({
	type: 'GET_KEYS',
	payload
})

export const getKeys = (keyId) => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `http://localhost:3000/voucheraladinkey`
		})
		.then(({data}) => {
			dispatch(getKeysAction(data))
		})
		.catch(err => console.log(err))
	}
}
