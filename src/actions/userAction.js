import axios from 'axios'

const getUserAction = (payload) => ({
	type: 'GET_USER',
	payload
})

export const getUser = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/users/info`,
			headers: {
				token: localStorage.getItem('token')
			}
		})
		.then(({data}) => {
			dispatch(getUserAction(data))
		})
		.catch(err => console.log(err))
	}
}

export const refreshToken = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/users/token`,
			headers: {
				token: localStorage.getItem('token')
			}
		})
		.then(({data}) => {
			//console.log('TOKEN LAMA:', localStorage.getItem('token'))
			localStorage.removeItem('token')
			localStorage.setItem('token', data.token)
			//console.log('TOKEN BARU:', localStorage.getItem('token'))
		})
		.catch(err => console.log(err))
	}
}
