import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import timer from '../../asset/bidding/timer.svg'
import watch from '../../asset/bidding/watch.svg'
import coin  from '../../asset/bidding/coins.png'
import buy from '../../asset/bidding/cart-of-ecommerce.png'
import cancel from '../../asset/bidding/cancel.png'


import Loading from '../Components/Loading/'
import ModalText from '../Components/Modal/ModalText'

import { getPhoneNumbers, setIsLoading } from '../../actions/'
import { getUser } from '../../actions/userAction'
import  priceProduct  from '../../utils/splitPrice'
import  productName from '../../utils/splitProduct'
import FormatRupiah from '../../utils/formatRupiah'

let propsAladinPrice = 0
class Bidding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productUnlocked: {},
			count: 15,
      initCount: 15,
      open: false,
      priceComp : true,
    }

    this.handleBack()
    localStorage.setItem('selectedProductId', this.props.selectedProductID)
  }

  render() {
    let priceComponent = null;
    let watchComponent = null
    if (this.state.priceComp) {
      priceComponent = (<label className="bidding__2__col2__newPrice">{this.formatRupiah()}</label>)
      watchComponent = (<label className="bidding__3__col__text">{this.state.productUnlocked.watching} orang</label>)
    } else {
      priceComponent =  (<label className="bidding__2__col2__newPrice"></label>)
      watchComponent = (<label className="bidding__3__col__text">orang</label>)
    }
    return (
  <div>
      <div className="bidding__2__col1">
        <img src={this.state.productUnlocked.brandLogo} className="bidding__2__col1__logo" alt="Logo pulsa"/>
        <div className="bidding__2__col1__textDistance">
          {this.productName()}
          {this.priceProduct()}
        </div>
      </div>

      <div className="bidding">
        <div className="bidding__container">

          <Loading isLoading={ this.props.isLoading } />

          <div className="bidding__3">

            <div className="bidding__3__col">
              <div>
                <img src={timer} className="bidding__3__col__logoTimer" alt="Logo Timer"/>
              </div>
              <div>
                <label className="bidding__3__col__text">{this.state.count < 10 ? `00:0${this.state.count}` : `00:${this.state.count}`} detik</label>
              </div>
            </div>

            <div className="bidding__3__col">
              <div>
                <img src={watch} className="bidding__3__col__logoWatch" alt="Logo Watch"/>
              </div>
              <div>
                {watchComponent}
              </div>
            </div>

          </div>

          <div className="bidding__2">

          <div className="biddingIconPriceStyle">
            <img src={coin} className="bidding__3__col__logoPrice" alt="Logo Watch"/>
          </div>

            <div className="bidding__2__col2">
              <div className="bidding__2__col2__mid">
                {priceComponent}
              </div>

              <div>
                <label className="bidding__2__col2__text">
                  harga yang ditampilkan adalah harga live.
                </label>
              </div>
            </div>
          </div>
          <div className="bidding__container__button">
          <div className="bidding__4">
            <button className="bidding__4__btnBuy" onClick={() => this.buy()}>
              <img src={buy} className="bidding__3__col__logoBuy" alt="Logo Watch"/>Beli
            </button>
          </div>

          <div className="bidding__5">
            <button className="bidding__5__btnCancel" onClick={() => this.cancel()}><img src={cancel} className="bidding__3__col__logoCancel" alt="Logo Watch"/>Batal</button>
          </div>
          </div>
        </div>
          <ModalText text="Waktu Bidding Anda Sudah Habis" isOpen={this.state.open} toggle={this.toggle}/>
      </div>
</div>
    )
  }

  toggle = () => {
    this.props.history.push('/home')
  }

  formatRupiah() {
    return propsAladinPrice && (
      FormatRupiah(propsAladinPrice)
    )
  }

  priceProduct() {
    return this.state.productUnlocked.productName && (
      <h2 className="bidding__2__col1__text">{priceProduct(this.state.productUnlocked.productName)}</h2>
    )
  }

  productName() {
    return this.state.productUnlocked.productName && (
      <h2 className="bidding__2__col1__text">{productName(this.state.productUnlocked.productName)}</h2>
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

  componentWillUnmount() {
    // this.stopWatchProductPrice(this.props.selectedProductID)
    localStorage.removeItem('selectedProductId')
  }

  handleBack() {
    if (this.props.history.action === 'POP') {
      // if (localStorage.getItem('selectedProductId')) {
      //   this.stopWatchProductPrice(localStorage.getItem('selectedProductId'))
      // }
      this.props.history.replace('/')
    }
  }

  buy() {
    const productsRef = firebase.database().ref().child(`${process.env.REACT_APP_FIREBASE_PRODUCT}`)
    const productRef = productsRef.child(this.props.selectedProductID)
    let updatePrice = 0

    productRef.once('value', snap => {
      updatePrice = snap.val().aladinPrice
      productRef.update({
        watching: 0,
        aladinPrice: snap.val().price
      })
    })

    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_HOST}/logsold`,
      data: {
        productId: this.props.selectedProductID
      },
    })

    this.props.history.push('/insertphone', {
      productUnlocked: this.state.productUnlocked,
      aladinPrice: updatePrice,
      phoneNumbers: this.props.phoneNumbers
    })
  }

  cancel() {
    this.props.history.push('/home')
  }

  watchProductPrice(productId) {
    if (productId === '') {
      return null
    }

		if (localStorage.getItem('token') !== null) {
      this.props.setIsLoading(true)
      this.props.getUser()
      const productsRef = firebase.database().ref().child(`${process.env.REACT_APP_FIREBASE_PRODUCT}`)
      const productRef = productsRef.child(productId)
      productRef.once('value', snap => {

        if (snap.val().aladinPrice > 10000){
          productRef.update({
            watching: snap.val().watching +1,
            aladinPrice: snap.val().aladinPrice - snap.val().decreasePrice
          })
          axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_HOST}/logbid`,
            headers: {
              token: localStorage.getItem('token'),
            },
            data: {
              productId: productId,
              priceBefore: snap.val().aladinPrice  ,
              priceAfter: snap.val().aladinPrice - snap.val().decreasePrice
            }
          })
        }
        else if (snap.val().aladinPrice === 10000 || snap.val().aladinPrice <= 10000 ) {
          productRef.update({
            watching: snap.val().watching +1,
          })
          axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_HOST}/logbid`,
            headers: {
              token: localStorage.getItem('token'),
            },
            data: {
              productId: productId,
              priceBefore: snap.val().aladinPrice  ,
              priceAfter: snap.val().aladinPrice - snap.val().decreasePrice
            }
          })
        }
      })
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/watching`,
        data: {
          productId: productId,
        }
      })
      productRef.on('value', snap => {
        propsAladinPrice = snap.val().aladinPrice
        let productValue = {
          brand: snap.val().brand,
          brandId: snap.val().brandId,
          brandLogo: snap.val().brandLogo,
          category: snap.val().category,
          categoryId: snap.val().categoryId,
          displayPrice: snap.val().displayPrice,
          id: snap.val().id,
          price: snap.val().price,
          productName: snap.val().productName,
          watching: snap.val().watching
        }
        this.setState({
          productUnlocked: productValue,
        })
      })

      this.runTimer()
    this.props.setIsLoading(false)
  }
}

  runTimer() {
		setTimeout(() => {
			this.setState({count: this.state.count >= 0 ? this.state.count-1 : 0})
		}, 1000)
  }

  checkTimer(prevCount) {
		if (this.state.count > 0 && this.state.count !== prevCount ) {
      this.runTimer()

		} else if (this.state.count <= 0 && this.state.count !== prevCount) {
      this.setState({
        open: true,
        productUnlocked : {},
        priceComp: false,
      })
    }
  }

  afterResetPrice(prevPrice) {
		if (prevPrice !== undefined && propsAladinPrice > prevPrice) {
      alert('Maaf, produk ini sudah terbeli orang lain! Silahkan melakukan bidding lagi.')
      this.props.history.push('/home')
		}
  }

  // stopWatchProductPrice(productId) {
  //   if (productId === '') {
  //     return null
  //   }

  //   const productsRef = firebase.database().ref().child(`${process.env.REACT_APP_FIREBASE_PRODUCT}`)
	// 	const productRef = productsRef.child(productId)

  //   productRef.off()
  //   // this.setState({isWatching: false})

  //   productRef.once('value', snap => {
	// 		if (snap.val().watching > 0) {

  //       productRef.update({
  //         watching: snap.val().watching -1
  //       })

  //     }
	// 	})
  // }

}

const mapStateToProps = (state) => {
  return {
    selectedProductID: state.productReducer.selectedProductID,
    userInfo: state.userReducer.userInfo,
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
