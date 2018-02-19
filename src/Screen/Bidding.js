import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import * as firebase from 'firebase'

import timer from '../asset/bidding/timer.svg'
import watch from '../asset/bidding/watch.svg'

import LogoIndosat from '../asset/LandingPage/pulsa/Indosat.svg'

import { getPhoneNumbers } from '../actions/'

class Bidding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productUnlocked: {},
			count: 999,
      initCount: 999,
      isWatching: false
    }
  }

  render() {
    console.log('Bidding Props:', this.props);
    console.log('Bidding State:', this.state);

    return (
      <div className="bidding">
        <div className="bidding__container">
          <div className="bidding__1">
            <label className="bidding__1__Title">Bidding Time</label>
          </div>

          <div className="bidding__2">
            <div className="bidding__2__col1">
              <img src={LogoIndosat} className="logoIndosat" alt="Logo Indosat"/>
            </div>

            <div className="bidding__2__col2">
              <div>
                <label className="bidding__2__col2__pulsa">{this.state.productUnlocked.productName}</label>
              </div>

              <div>
                <label className="bidding__2__col2__coret">Rp{this.state.productUnlocked.price}</label>
              </div>

              <div>
                <label className="bidding__2__col2__newPrice">Rp{this.state.productUnlocked.aladinPrice}</label>
              </div>

              <div>
                <label className="bidding__2__col2__live">Harga Live</label>
              </div>

              <div>
                <label className="bidding__2__col2__text">
                  Harga akan makin murah seiring banyaknya user lain yang masuk hingga ada user yang membeli.
                </label>
              </div>
            </div>
          </div>

          <div className="bidding__3">

            <div className="bidding__3__col">
              <div>
                <label className="bidding__3__col__text">{this.state.count < 10 ? `00:0${this.state.count}` : `00:${this.state.count}`} detik</label>
              </div>
              <div>
                <img src={timer} className="bidding__3__col__logoTimer" alt="Logo Timer"/>
              </div>
            </div>

            <div className="bidding__3__col">
              <div>
                <img src={watch} className="bidding__3__col__logoWatch" alt="Logo Watch"/>
              </div>
              <div>
                <label className="bidding__3__col__text">{this.state.productUnlocked.watching} orang</label>
              </div>
            </div>

          </div>

          <div className="bidding__4">
            <button className="bidding__4__btnBuy" onClick={() => this.buy()}>Beli</button>
          </div>

          <div className="bidding__5">
            <button className="bidding__5__btnCancel" onClick={() => this.cancel()}>Batal</button>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.watchProductPrice(this.props.selectedProductID)
    this.props.getPhoneNumbers()
  }

  componentDidUpdate(prevProps, prevState) {
		this.checkTimer(prevState.count)
		this.afterResetPrice(prevState.productUnlocked.aladinPrice)
  }

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
    // const productsRef = firebase.database().ref().child('products')
    // const productRef = productsRef.child(productId)

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
    getPhoneNumbers: () => dispatch(getPhoneNumbers())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Bidding)

export default connectComponent
