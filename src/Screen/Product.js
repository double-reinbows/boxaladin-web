import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
// import Modal from 'react-modal'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {
	Modal, ModalBody, ModalFooter, ModalHeader,
	Container,
	Row, Col,
	Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button,
	Form, FormGroup, Label, Input
} from 'reactstrap'

import { getProducts, getFilteredProducts } from '../actions/productAction'
import { getCategories } from '../actions/categoryAction'
import { getBrands } from '../actions/brandAction'

// Modal.setAppElement('#root');

const customStyles = {
	overlay : {
    position          : 'absolute',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.80)'
  },
  content : {
    // position                   : 'relative',
    // top                        : '200px',
    // left                       : '500px',
    // right                      : '500px',
    // bottom                     : '200px',
    // border                     : '1px solid #ccc',
    // background                 : '#fff',
    // overflow                   : 'auto',
    // WebkitOverflowScrolling    : 'touch',
    // borderRadius               : '4px',
    // outline                    : 'none',
    // padding                    : '50px'
  }
};

class Product extends Component {
	constructor() {
		super()
		this.state = {
			products: [],
			productUnlocked: {},
			showPriceModal: false,
			categories: [],
			brands: [],
			selectedCategory: 'all',
			selectedBrand: 'all',
			isVerified: false,
			filteredProducts: []
		}
	}

	cekEmail(){
		if (localStorage.getItem("token")){
			const userInfo = jwt.decode(localStorage.getItem('token'));
			console.log(userInfo)
			if (userInfo.emailVerificationStatus === true) {
				this.setState({
					isVerified: true
				})
			} else {
				this.setState({
					isVerified: false
				})
			}
		}
	}

	toggleShowPriceModal() {
		this.setState({showPriceModal: !this.state.showPriceModal})
	}

  render () {
		console.log('State:', this.state);
		console.log('Props:', this.props)
    return (
      <div>
				<h2 className="text-center">Products</h2>
				<Container>
					{ this.showProducts() }
				</Container>

				<Modal isOpen={this.state.showPriceModal}>
          <ModalHeader toggle={() => this.toggleShowPriceModal()}>{this.state.productUnlocked.productName}</ModalHeader>
          <ModalBody>
						<strike><h4>Rp{this.state.productUnlocked.price}</h4></strike>
						<h1>Rp{this.state.productUnlocked.aladinPrice}</h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleShowPriceModal()}>Cancel</Button>
            <Button color="primary" onClick={() => console.log('BUY clicked!')}>Buy</Button>{' '}
          </ModalFooter>
        </Modal>

      </div>
    )
  }

	componentDidMount() {
		// this.fetchBrands()
		// this.fetchCategories()
		// this.fetchProductsWithFilter()
		this.cekEmail()
		this.props.getProducts()
		this.props.getCategories()
		this.props.getBrands()
	}

	// fetchProductsWithFilter() {
	// 	// const productsRef = firebase.database().ref().child('products')
	// 	// productsRef.once('value').then(snap => {
	// 	// 	let dataProducts = []
	// 	// 	for (var key in snap.val()) {
	// 	// 		dataProducts.push(snap.val()[key])
	// 	// 	}
  //
	// 		if (this.state.selectedBrand === 'all' && this.state.selectedCategory === 'all') {
	//       // fetch all products
	// 			this.setState({ products: this.props.products })
	// 			console.log('show all products');
	// 		} else if (this.state.selectedBrand === 'all') {
	// 			// filter products by category
	// 			const filtered = this.props.products.filter(product => {
	// 				return product.categoryId.toString() === this.state.selectedCategory
	// 			})
	// 			this.setState({ products: filtered })
	// 			console.log(filtered);
	// 			console.log('filter products by category');
	// 		} else if (this.state.selectedCategory === 'all') {
	// 			// filter products by brand
	// 			const filtered = this.props.products.filter(product => {
	// 				return product.brandId.toString() === this.state.selectedBrand
	// 			})
	// 			this.setState({ products: filtered })
	// 			console.log(filtered);
	// 			console.log('filter products by brand');
	// 		} else {
	//       // filter products by category & brand
	// 			const filteredByBrand = this.props.products.filter(product => {
	// 				return product.brandId.toString() === this.state.selectedBrand
	// 			})
	// 			const filtered = filteredByBrand.filter(product => {
	// 				return product.categoryId.toString() === this.state.selectedCategory
	// 			})
	// 			this.setState({ products: filtered })
	// 			console.log(filtered);
	// 			console.log('filter products by brand & category');
	// 		}
  //
	// 	// })
	// }

	filterProducts() {
		if (this.state.selectedBrand === 'all' && this.state.selectedCategory === 'all') {
			// fetch all products
			this.setState({ products: this.props.products })
			console.log('show all products');
		} else if (this.state.selectedBrand === 'all') {
			// filter products by category
			const filtered = this.props.products.filter(product => {
				return product.categoryId.toString() === this.state.selectedCategory
			})
			this.setState({ products: filtered })
			console.log(filtered);
			console.log('filter products by category');
		} else if (this.state.selectedCategory === 'all') {
			// filter products by brand
			const filtered = this.props.products.filter(product => {
				return product.brandId.toString() === this.state.selectedBrand
			})
			this.setState({ products: filtered })
			console.log(filtered);
			console.log('filter products by brand');
		} else {
			// filter products by category & brand
			const filteredByBrand = this.props.products.filter(product => {
				return product.brandId.toString() === this.state.selectedBrand
			})
			const filtered = filteredByBrand.filter(product => {
				return product.categoryId.toString() === this.state.selectedCategory
			})
			this.setState({ products: filtered })
			console.log(filtered);
			console.log('filter products by brand & category');
		}
	}

	// fetchBrands() {
	// 	axios({
	// 		method: 'GET',
	// 		url: `http://localhost:3000/api/brand`
	// 	})
	// 	.then(({data}) => this.setState({ brands: data}))
	// 	.catch(err => console.log(err))
	// }

	// fetchCategories() {
	// 	axios({
	// 		method: 'GET',
	// 		url: `http://localhost:3000/api/category`
	// 	})
	// 	.then(({data}) => this.setState({ categories: data }))
	// 	.catch(err => console.log(err))
	// }

	// fetchProducts() {
	// 	const productsRef = firebase.database().ref().child('products')
	// 	productsRef.once('value').then(snap => {
	// 		// console.log(snap.val())
	// 		let dataProducts = []
	// 		// snap.val().map(dataProduct => (
	// 		// 	dataProducts.push(dataProduct)
	// 		// ))
	// 		for (var key in snap.val()) {
	// 			dataProducts.push(snap.val()[key])
	// 			// console.log(snap.val()[key]);
	// 		}
	// 		// console.log(dataProducts);
	// 		this.setState({ products: dataProducts })
	// 		this.setState({ filteredProducts: dataProducts })
	// 	})
	// }

	closeModalPrice(productId) {
		const productsRef = firebase.database().ref().child('products')
		const productRef = productsRef.child(productId)
		productRef.off()
		this.setState({showPriceModal: false, productUnlocked: {}})
	}

	watchProductPrice(productId) {
		if (localStorage.getItem('token') !== null) {
			axios({
				method: 'POST',
				url: `http://localhost:3000/unlockPrice`,
				data: {
					productId: productId
				},
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(({data}) => {
				// console.log(data);
				if (data.message === 'success') {
					const productsRef = firebase.database().ref().child('products')
					const productRef = productsRef.child(productId)
					productRef.on('value', snap => {
						this.setState({productUnlocked: snap.val()})
						this.setState({showPriceModal: true})
					})
				} else if (data.message === 'not enough aladin key') {
					alert(data.message)
				} else {
					console.log(data)
				}
			})
			.catch(err => console.log(err))
		} else {
			alert('harus login')
		}
	}

	showProducts() {
		return (
			<div>

				{/* Filter Bar */}
				<Form>

					<FormGroup>
						<Label for="selectCategory">Category</Label>
						<Input type="select" id="selectCategory" onChange={ (e) => this.setState({ selectedCategory: e.target.value }) }>
							<option value="all">All</option>
							{this.props.categories.map((category, idx) => {
								return (
									<option key={idx} value={category.id}>{category.categoryName}</option>
								)
							})}
						</Input>
					</FormGroup>

					<FormGroup>
						<Label for="selectBrand">Brand</Label>
						<Input type="select" id="selectBrand" onChange={ (e) => this.setState({ selectedBrand: e.target.value }) }>
							<option value="all">All</option>
							{this.props.brands.map((brand, idx) => {
								return (
									<option key={idx} value={brand.id}>{brand.brandName}</option>
								)
							})}
						</Input>
					</FormGroup>

					<FormGroup>
						<Button type="Button" color="primary" onClick={ () => this.filterProducts() }>Filter</Button>
					</FormGroup>

				</Form>

				{/* Data Products */}
				<Row>
					{this.state.products.map((product, idx) => {
						return (
							<Col xs="3" key={idx}>
								<Card>
									<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
									<CardBody>
										<CardTitle>{product.productName}</CardTitle>
										<CardSubtitle>Card subtitle</CardSubtitle>
										<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
										<Button color="success" onClick= { () => this.watchProductPrice(product.id) }>Unlock Price</Button>
									</CardBody>
								</Card>
							</Col>
						)
					})}
				</Row>

			</div>
		)

	}
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin,
		products: state.productReducer.products,
		categories: state.categoryReducer.categories,
		brands: state.brandReducer.brands,
		filteredProducts: state.productReducer.filteredProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		getProducts: () => dispatch(getProducts()),
		getCategories: () => dispatch(getCategories()),
		getBrands: () => dispatch(getBrands()),
		getFilteredProducts: (brand, category) => dispatch(getFilteredProducts(brand, category))
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Product)

export default connectComponent

{/* <div key={idx} className="panel panel-default">
	<div className="panel-heading">
		<h3 className="panel-title"><b>{product.productName}</b></h3>
	</div>
	<div className="panel-body">
		<h4>Rp{product.price} (harga asli)</h4>
		<Button color="success" onClick={ () => this.watchProductPrice(product.id)} >Unlock</Button>
	</div>
</div> */}

{/* <form className="form-horizontal">
	<div className="form-group">
		<label htmlFor="select" className="col-sm-1 control-label">Category</label>
		<div className="col-sm-2">
			<select className="form-control" id="select" onChange={ (e) => this.setState({ selectedCategory: e.target.value }) }>
				<option value="all">All</option>
				{this.props.categories.map((category, idx) => {
					return (
						<option key={idx} value={category.id}>{category.categoryName}</option>
					)
				})}
			</select>
		</div>

		<label htmlFor="select" className="col-sm-1 control-label">Brand</label>
		<div className="col-sm-2">
			<select className="form-control" id="select" onChange={ (e) => this.setState({ selectedBrand: e.target.value }) }>
				<option value="all">All</option>
				{this.props.brands.map((brand, idx) => {
					return (
						<option key={idx} value={brand.id}>{brand.brandName}</option>
					)
				})}
			</select>
		</div>

		<div className="col-sm-2">
			<Button type="Button" className="btn btn-primary" onClick={ () => this.filterProducts() }>Filter</Button>
		</div>
	</div>
</form> */}

{/* <Modal
	isOpen={ this.state.showPriceModal }
	style={ customStyles }
>
	<h3>{this.state.productUnlocked.productName}</h3>
	<strike><h3>Rp{this.state.productUnlocked.price}</h3></strike>
	<h1>Rp{this.state.productUnlocked.aladinPrice}</h1>
	<Button color="secondary" style={{ width: 100 }} onClick={ () => this.closeModalPrice(this.state.productUnlocked.id) }>Close</Button>
	<Button color="primary" style={{ width: 100 }}>Buy</Button>
</Modal> */}