import axios from 'axios'

const getBrandsAction = (payload) => ({
	type: 'GET_BRANDS',
	payload
})

export const getBrands = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/api/brand`
		})
		.then(({data}) => {
			dispatch(getBrandsAction(data))
		})
		.catch(err => console.log(err))
	}
}
