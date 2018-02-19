import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import * as firebase from 'firebase'

import { getPhoneNumbers } from '../actions/'
import { getUser } from '../actions/userAction'

class Bidding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productUnlocked: {},
			count: 15,
      initCount: 15,
      isWatching: false
    }
  }

  render() {
    console.log('Bidding Props:', this.props);
    console.log('Bidding State:', this.state);

    return (
      <div className="container">
        <h1>Bidding</h1>

        <hr />
        <h1>{this.state.productUnlocked.productName}</h1>
        <strike><h4>Rp{this.state.productUnlocked.price}</h4></strike>
        <h1>Rp{this.state.productUnlocked.aladinPrice}</h1>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <h3>Watching: {this.state.productUnlocked.watching}</h3>
        <h1>{this.state.count < 10 ? `00:0${this.state.count}` : `00:${this.state.count}`}</h1>

        <button className="btn btn-lg btn-danger" onClick={() => this.cancel()}>Batal</button>
        <button className="btn btn-lg btn-success" onClick={() => this.buy()}>Beli</button>

      </div>
    )
  }

  componentDidMount() {
    this.watchProductPrice(this.props.selectedProductID)
    this.props.getPhoneNumbers()
    // this.handleBack()
  }

  componentDidUpdate(prevProps, prevState) {
		this.checkTimer(prevState.count)
		this.afterResetPrice(prevState.productUnlocked.aladinPrice)
  }

  // handleBack() {
  //   if (this.props.history.action === 'POP') {
  //     this.props.history.push('/home')
  //   }
  // }

  buy() {
    console.log('Buy Now!!!!!')

		axios({
			method: 'PUT',
			url: `http://localhost:3000/api/product/${this.props.selectedProductID}`
		})
		.then(({data}) => {
      this.stopWatchProductPrice(this.props.selectedProductID)
      this.props.history.push('/insertphone', {
        productUnlocked: this.state.productUnlocked,
        phoneNumbers: this.props.phoneNumbers
      })
		})
		.catch(err => console.log(err))
  }

  cancel() {
    this.stopWatchProductPrice(this.props.selectedProductID)
    this.props.history.push('/home')
  }

  watchProductPrice(productId) {
    const productsRef = firebase.database().ref().child('products')
    const productRef = productsRef.child(productId)

		if (localStorage.getItem('token') !== null) {

			axios({
				method: 'POST',
				url: `http://localhost:3000/unlockPrice`,
				data: {
					productId: this.props.selectedProductID
				},
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(({data}) => {

				if (data.message === 'success') {

          // biar update user info (jumlah aladin key)
          this.props.getUser()

					const productsRef = firebase.database().ref().child('products')
					const productRef = productsRef.child(productId)

					productRef.once('value', snap => {
						productRef.update({
							watching: snap.val().watching +1
						})
					})

					productRef.on('value', snap => {
						this.setState({
              productUnlocked: snap.val(),
              isWatching: true
						})
					})

					this.runTimer()

				} else if (data.message === 'not enough aladin key') {

          this.props.history.push('/home')
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

  runTimer() {
		setTimeout(() => {
			this.setState({count: this.state.count >= 0 ? this.state.count-1 : 0})
		}, 1000)
  }

  checkTimer(prevCount) {
		if (this.state.count > 0 && this.state.count !== prevCount && this.state.isWatching === true) {
      this.runTimer()

		} else if (this.state.count <= 0 && this.state.count !== prevCount && this.state.isWatching === true) {
      this.stopWatchProductPrice(this.props.selectedProductID)
      alert('Waktu habis Brayyy...')
      this.props.history.push('/home')

		} else if (this.state.count !== this.state.initCount && this.state.isWatching === false) {
			this.setState({count: this.state.initCount})
		}
  }

  afterResetPrice(prevPrice) {
		if (prevPrice !== undefined && this.state.productUnlocked.aladinPrice > prevPrice) {
      alert('Maaf, produk ini sudah terbeli orang lain! Silahkan melakukan bidding lagi.')
      this.stopWatchProductPrice(this.props.selectedProductID)
      this.props.history.push('/home')
		}
  }

  stopWatchProductPrice(productId) {
    const productsRef = firebase.database().ref().child('products')
		const productRef = productsRef.child(productId)

    productRef.off()
    this.setState({isWatching: false})

    productRef.once('value', snap => {
			productRef.update({
				watching: snap.val().watching -1
			})
		})
  }

}

const mapStateToProps = (state) => {
  return {
    selectedProductID: state.productReducer.selectedProductID,
    phoneNumbers: state.userReducer.phoneNumbers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhoneNumbers: () => dispatch(getPhoneNumbers()),
    getUser: () => dispatch(getUser())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Bidding)

export default connectComponent
