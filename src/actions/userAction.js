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
