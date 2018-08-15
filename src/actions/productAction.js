import * as firebase from 'firebase'
import envChecker from '../utils/envChecker'
import axios from 'axios'

export const getProducts = () => {
	// return (dispatch) => {
	// 	var dataProducts = []
	// 	const productsRef = firebase.database().ref().child(`${envChecker('firebase')}`)
	// 	productsRef.once('value').then(snap => {
	// 		for (var key in snap.val()) {
	// 			dataProducts.push(snap.val()[key])
	// 		}
	// 		// var arrProducts = Object.keys(dataProducts)
	// 		dispatch(getProductsAction(dataProducts))
	// 	})
	// }
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `${envChecker('api')}/api/product`,
		})
		.then((dataProducts) => {
			dispatch(getProductsAction(dataProducts.data))
})
		.catch(err => console.log(err))
	}
}

export const getFilteredProducts = (brand, category) => {
	return (dispatch) => {
		var dataProducts = []

		const productsRef = firebase.database().ref().child(`${envChecker('firebase')}`)
		productsRef.once('value').then(snap => {
			for (var key in snap.val()) {
				dataProducts.push(snap.val()[key])
			}

			if (brand === 'all' && category === 'all') {
				// fetch all products
				let filteredProducts = dataProducts
				dispatch(getFilteredProductsAction(filteredProducts))


			} else if (brand === 'all') {
				// filter products by category
				let filteredProducts = dataProducts.filter(product => {
					return product.categoryId === category
				})
				dispatch(getFilteredProductsAction(filteredProducts))


			} else if (category === 'all') {
				// filter products by brand
				let filteredProducts = dataProducts.filter(product => {
					return product.brandId.toString() === brand
				})
				dispatch(getFilteredProductsAction(filteredProducts))


			} else {
				// filter products by category & brand
				const filteredByBrand = dataProducts.filter(product => {
					return product.brandId === brand
				})
				let filteredProducts = filteredByBrand.filter(product => {
					return product.categoryId === category
				})
				dispatch(getFilteredProductsAction(filteredProducts))

			}

		})
	}
}

// export const addToCart = (cart, product) => {
// 	return (dispatch) => {
// 		product.qty = 1
// 		cart.push(product)
// 		dispatch(updateCartAction(cart))
// 	}
// }

export const getProductsAction = (payload) => ({
	type: 'GET_PRODUCTS',
	payload
})

export const getFilteredProductsAction = (payload) => ({
	type: 'GET_FILTERED_PRODUCTS',
	payload
})

// export const updateCartAction = (payload) => ({
// 	type: 'UPDATE_CART',
// 	payload
// })

export const selectedPriceOrProductID = (payload) => ({
	type: 'SELECT_PRICE_OR_PRODUCT_ID',
	payload
})
