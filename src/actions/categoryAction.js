import axios from 'axios'
import envChecker from '../utils/envChecker'

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
			url: `${envChecker('api')}/api/category`
		})
		.then(({data}) => {
			dispatch(getCategoriesAction(data))
		})
		.catch(err => console.log(err))
	}
}
