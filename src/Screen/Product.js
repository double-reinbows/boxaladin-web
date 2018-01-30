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

class Product extends Component {
	constructor(props) {
		super(props)
		this.state = {
			productUnlocked: {},
			showPriceModal: false,
			selectedCategory: 'all',
			selectedBrand: 'all',
			isVerified: false,
			count: 15,
			initCount: 15,
			selectedProductId: ''
		}

		this.toggleShowPriceModal = this.toggleShowPriceModal.bind(this)
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
				{/* <h2 className="text-center">Products</h2> */}
				<Container>
					{ this.showProducts() }
				</Container>

				<Modal isOpen={this.state.showPriceModal}>
          <ModalHeader toggle={this.toggleShowPriceModal}>{this.state.productUnlocked.productName}</ModalHeader>
          <ModalBody>
						<strike><h4>Rp{this.state.productUnlocked.price}</h4></strike>
						<h1>Rp{this.state.productUnlocked.aladinPrice}</h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						<h1>{this.state.count < 10 ? `00:0${this.state.count}` : `00:${this.state.count}`}</h1>
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
		this.cekEmail()
		this.props.getProducts()
		this.props.getCategories()
		this.props.getBrands()
		this.props.getFilteredProducts(this.state.selectedBrand, this.state.selectedCategory)
	}

	componentDidUpdate(prevProps, prevState) {
		this.checkTimer(prevState.count)
	}

	// closeModalPrice(productId) {
	// 	const productsRef = firebase.database().ref().child('products')
	// 	const productRef = productsRef.child(productId)
	// 	productRef.off()
	// 	this.setState({showPriceModal: false, productUnlocked: {}})
	// }

	checkTimer(prevCount) {
		if (this.state.count > 0 && this.state.count !== prevCount && this.state.showPriceModal === true) {
			this.runTimer()
		} else if (this.state.count <= 0 && this.state.count !== prevCount && this.state.showPriceModal === true) {
			this.setState({showPriceModal: false})
		} else if (this.state.count !== this.state.initCount && this.state.showPriceModal === false) {
			this.setState({count: this.state.initCount})
		}
	}

	runTimer() {
		setTimeout(() => {
			this.setState({count: this.state.count >= 0 ? this.state.count-1 : 0})
		}, 1000)
	}

	watchProductPrice(productId) {
		// this.setState({selectedProductId: productId})
		
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
						this.setState({selectedProductId: productId})
						this.setState({productUnlocked: snap.val()})
						this.setState({showPriceModal: true})
					})

					this.runTimer()					

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
						<Button type="Button" color="primary" onClick={ () => this.props.getFilteredProducts(this.state.selectedBrand, this.state.selectedCategory) }>Filter</Button>
					</FormGroup>

				</Form>

				{/* Data Products */}
				<Row>
					{this.props.filteredProducts.map((product, idx) => {
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
