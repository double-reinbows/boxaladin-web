import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import * as firebase from 'firebase'

import timer from '../asset/bidding/timer.svg'
import watch from '../asset/bidding/watch.svg'

import Loading from './Components/Loading/'

import { getPhoneNumbers, setIsLoading } from '../actions/'
import { getUser } from '../actions/userAction'

class Bidding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productUnlocked: {},
			count: 15,
      initCount: 15,
      isWatching: false,
      notif:''
    }

    this.handleBack()
    localStorage.setItem('selectedProductId', this.props.selectedProductID)
  }

  render() {
    return (
      <div className="bidding">
        <div className="bidding__container">

          <Loading isLoading={ this.props.isLoading } />

          <div className="bidding__1">
            <label className="bidding__1__Title">Bidding Time</label>
          </div>

          <div className="bidding__2">
            <div className="bidding__2__col1">
              <img src={this.state.productUnlocked.brandLogo} className="bidding__2__col1__logo" alt="Logo pulsa"/>
            </div>

            <div className="bidding__2__col2">
              <div>
                <label className="bidding__2__col2__pulsa">{this.state.productUnlocked.productName}</label>
              </div>

              <div className="bidding__2__col2__mid">
                <label className="bidding__2__col2__coret">Rp{this.state.productUnlocked.price}</label>
              </div>

              <div className="bidding__2__col2__mid">
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
    // this.handleBack()
  }

  componentDidUpdate(prevProps, prevState) {
		this.checkTimer(prevState.count)
		this.afterResetPrice(prevState.productUnlocked.aladinPrice)
  }

  componentWillUnmount() {

    // this.props.history.replace('/')
    this.stopWatchProductPrice(this.props.selectedProductID)
    localStorage.removeItem('selectedProductId')
  }

  handleBack() {
    if (this.props.history.action === 'POP') {
      if (localStorage.getItem('selectedProductId')) {
        this.stopWatchProductPrice(localStorage.getItem('selectedProductId'))
      }
      this.props.history.replace('/')
    }
  }

  buy() {
  

		axios({
      method: 'PUT',
      headers: {
        key: process.env.REACT_APP_KEY
      },
			url: `${process.env.REACT_APP_API_HOST}/api/product/${this.props.selectedProductID}`
		})
		.then(({data}) => {
      // this.stopWatchProductPrice(this.props.selectedProductID)

      const productsRef = firebase.database().ref().child('products')
      const productRef = productsRef.child(this.props.selectedProductID)

      productRef.update({
        watching: 0
      })

      this.props.history.push('/insertphone', {
        productUnlocked: this.state.productUnlocked,
        phoneNumbers: this.props.phoneNumbers
      })
		})
		.catch(err => console.log(err))
  }

  cancel() {
    // this.stopWatchProductPrice(this.props.selectedProductID)
    this.props.history.push('/home')
  }

  watchProductPrice(productId) {
    if (productId === '') {
      return null
    }

    // const productsRef = firebase.database().ref().child('products')
    // const productRef = productsRef.child(productId)

		if (localStorage.getItem('token') !== null) {

      this.props.setIsLoading(true)

			axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_HOST}/unlockPrice`,
				data: {
					productId: this.props.selectedProductID
				},
				headers: {
          token: localStorage.getItem('token'),
          key: process.env.REACT_APP_KEY
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
          alert("Anda Tidak Memiliki Aladin Key")
          this.props.history.push('/home')
        } else {

          console.log('data')

        }
        this.props.setIsLoading(false)
			})
      .catch(err => {
        this.props.setIsLoading(false)
        return console.log(err)
      })

		} else {
      alert("Harus Login")
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
      // this.stopWatchProductPrice(this.props.selectedProductID)
      alert('Waktu bidding sudah habis')
      this.props.history.push('/home')

		} else if (this.state.count !== this.state.initCount && this.state.isWatching === false) {
			this.setState({count: this.state.initCount})
		}
  }

  afterResetPrice(prevPrice) {
		if (prevPrice !== undefined && this.state.productUnlocked.aladinPrice > prevPrice) {
      alert('Maaf, produk ini sudah terbeli orang lain! Silahkan melakukan bidding lagi.')
      // this.stopWatchProductPrice(this.props.selectedProductID)
      this.props.history.push('/home')
		}
  }

  stopWatchProductPrice(productId) {
    if (productId === '') {
      return null
    }

    const productsRef = firebase.database().ref().child('products')
		const productRef = productsRef.child(productId)

    productRef.off()
    this.setState({isWatching: false})

    productRef.once('value', snap => {
			if (snap.val().watching > 0) {

        productRef.update({
          watching: snap.val().watching -1
        })

      }
		})
  }

}

const mapStateToProps = (state) => {
  return {
    selectedProductID: state.productReducer.selectedProductID,
    phoneNumbers: state.userReducer.phoneNumbers,
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhoneNumbers: () => dispatch(getPhoneNumbers()),
    getUser: () => dispatch(getUser()),
    setIsLoading: (bool) => dispatch(setIsLoading(bool)),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Bidding)

export default connectComponent
