import axios from 'axios'

const getCategoriesAction = (payload) => ({
	type: 'GET_CATEGORIES',
	payload
})

export const getCategories = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			headers: {
        key: process.env.REACT_APP_KEY
      },
			url: `${process.env.REACT_APP_API_HOST}/api/category`
		})
		.then(({data}) => {
			dispatch(getCategoriesAction(data))
		})
		.catch(err => console.log(err))
	}
}
