import * as firebase from 'firebase'

export const getProducts = () => {
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

export const getFilteredProducts = (brand, category) => {
	return (dispatch) => {
		var dataProducts = []

		const productsRef = firebase.database().ref().child('products')
		productsRef.once('value').then(snap => {
			for (var key in snap.val()) {
				dataProducts.push(snap.val()[key])
			}
		})

		if (brand === 'all' && category === 'all') {
			// fetch all products
			let filteredProducts = dataProducts
			dispatch(getFilteredProductsAction(filteredProducts))
			console.log('All here......................');

		} else if (brand === 'all') {
			// filter products by category
			let filteredProducts = dataProducts.filter(product => {
				return product.categoryId === category
			})
			dispatch(getFilteredProductsAction(filteredProducts))
			console.log('By category here......................');

		} else if (category === 'all') {
			// filter products by brand
			let filteredProducts = dataProducts.filter(product => {
				return product.brandId.toString() === brand
			})
			dispatch(getFilteredProductsAction(filteredProducts))
			console.log('By brand here......................');

		} else {
			// filter products by category & brand
			const filteredByBrand = dataProducts.filter(product => {
				return product.brandId === brand
			})
			let filteredProducts = filteredByBrand.filter(product => {
				return product.categoryId === category
			})
			dispatch(getFilteredProductsAction(filteredProducts))
			console.log('By both here......................');
		}

	}
}

export const getProductsAction = (payload) => ({
	type: 'GET_PRODUCTS',
	payload
})

export const getFilteredProductsAction = (payload) => ({
	type: 'GET_FILTERED_PRODUCTS',
	payload
})
