import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import Modal from 'react-modal'
import axios from 'axios'

Modal.setAppElement('#root');

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
			selectedCategory: 'all'
		}
	}

  render () {
    return (
      <div>
				<h2>Product List</h2>
				{ this.showProducts() }

				<Modal
					isOpen={ this.state.showPriceModal }
					style={ customStyles }
				>
					<h3>{this.state.productUnlocked.productName}</h3>
					<strike><h3>Rp{this.state.productUnlocked.price}</h3></strike>
					<h1>Rp{this.state.productUnlocked.aladinPrice}</h1>
					<button className="btn btn-default btn-xs" style={{ width: 100 }} onClick={ () => this.closeModalPrice(this.state.productUnlocked.id) }>Close</button>
					<button className="btn btn-primary btn-xs" style={{ width: 100 }}>Buy</button>
				</Modal>

      </div>
    )
  }

	componentDidMount() {
		this.fetchProducts()
	}

	fetchProducts() {
		const productsRef = firebase.database().ref().child('products')
		productsRef.once('value').then(snap => {
			// console.log(snap.val())
			let dataProducts = []
			// snap.val().map(dataProduct => (
			// 	dataProducts.push(dataProduct)
			// ))
			for (var key in snap.val()) {
				dataProducts.push(snap.val()[key])
				// console.log(snap.val()[key]);
			}
			// console.log(dataProducts);
			this.setState({ products: dataProducts })
		})
	}

	closeModalPrice(productId) {
		const productsRef = firebase.database().ref().child('products')
		const productRef = productsRef.child(productId)
		productRef.off()
		this.setState({showPriceModal: false, productUnlocked: {}})
	}

	watchProductPrice(productId) {
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

	}

	showProducts() {
		return (
			<div>
			<form className="form-horizontal">
				<div className="form-group">
					<label htmlFor="select" className="col-sm-1 control-label">Category</label>
					<div className="col-sm-2">
						<select className="form-control" id="select">
							<option value="all">All</option>
						</select>
					</div>

					<label htmlFor="select" className="col-sm-1 control-label">Brand</label>
					<div className="col-sm-2">
						<select className="form-control" id="select">
							<option value="all">All</option>
						</select>
					</div>
				</div>
			</form>
			{this.state.products.map((product, idx) => {
				return (
					<div key={idx} className="panel panel-default">
						<div className="panel-heading">
					  	<h3 className="panel-title"><b>{product.productName}</b></h3>
					  </div>
						<div className="panel-body">
							<h4>Rp{product.price} (harga asli)</h4>
							<button className="btn btn-success btn-xs" onClick={ () => this.watchProductPrice(product.id) }>Unlock</button>
						</div>
					</div>
				)
			})}
			</div>
		)

	}
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Product)

export default connectComponent
