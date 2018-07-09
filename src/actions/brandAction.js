import axios from 'axios'
import envChecker from '../utils/envChecker'

const getBrandsAction = (payload) => ({
	type: 'GET_BRANDS',
	payload
})

export const getBrands = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			headers: {
        key: process.env.REACT_APP_KEY
      },
			url: `${envChecker('api')}/api/brand`
		})
		.then(({data}) => {
			dispatch(getBrandsAction(data))
		})
		.catch(err => console.log(err))
	}
}
