import axios from 'axios'

const getKeysAction = (payload) => ({
	type: 'GET_KEYS',
	payload
})

export const getKeys = (keyId) => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/voucheraladinkey`
		})
		.then(({data}) => {
			dispatch(getKeysAction(data))
		})
		.catch(err => console.log(err))
	}
}
