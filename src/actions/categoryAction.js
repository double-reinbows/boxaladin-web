import axios from 'axios'

const getCategoriesAction = (payload) => ({
	type: 'GET_CATEGORIES',
	payload
})

export const getCategories = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `http://localhost:3000/api/category`
		})
		.then(({data}) => {
			dispatch(getCategoriesAction(data))
		})
		.catch(err => console.log(err))
	}
}
