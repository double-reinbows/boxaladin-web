import axios from 'axios'
import envChecker from '../utils/envChecker'

const getPricesAction = (payload) => ({
	type: 'GET_PRICES',
	payload
})

export const getPrices = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `${envChecker('api')}/api/price`
		})
		.then(({data}) => {
      dispatch(getPricesAction(data))
		})
		.catch(err => console.log(err))
	}
}
