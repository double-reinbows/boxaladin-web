import * as firebase from 'firebase'

export const getProducts = (category, brand) => {
	return (dispatch) => {
		var dataProducts = []
		const productsRef = firebase.database().ref().child('products')
		productsRef.once('value').then(snap => {
			for (var key in snap.val()) {
				dataProducts.push(snap.val()[key])
			}
		})
		dispatch(getProductsAction(dataProducts))
	}
}

export const getProductsAction = (payload) => ({
	type: 'GET_PRODUCTS',
	payload
})
