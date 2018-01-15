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
			showPriceModal: false
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
					<h3>{this.state.productUnlocked.name}</h3>
					<strike><h3>Rp{this.state.productUnlocked.price}</h3></strike>
					<h1>Rp{this.state.productUnlocked.aladinPrice}</h1>
					<button style={{ width: 100 }} onClick={ () => this.closeModalPrice(this.state.productUnlocked.id) }>Close</button>
					<button style={{ width: 100 }}>Buy</button>
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
			snap.val().map(dataProduct => {
				dataProducts.push(dataProduct)
			})
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
		const productsRef = firebase.database().ref().child('products')
		const productRef = productsRef.child(productId)
		productRef.on('value', snap => {
			this.setState({productUnlocked: snap.val()})
			this.setState({showPriceModal: true})
		})
	}

	showProducts() {
		return (
			<table className="table table-striped table-hover ">
				<thead>
					<tr>
						<th>No.</th>
						<th>Product Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{this.state.products.map((product, idx) => {
						return (
							<tr className="active" key={idx}>
								<td>{idx+1}</td>
								<td>{product.productName}</td>
								<td><button onClick={ () => this.watchProductPrice(product.id) }>Unlock</button></td>
							</tr>
						)
					})}
				</tbody>
			</table>
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
