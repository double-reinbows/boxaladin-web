import axios from 'axios'

const getUserAction = (payload) => ({
	type: 'GET_USER',
	payload
})

export const getUser = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `http://localhost:3000/users/info`,
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
