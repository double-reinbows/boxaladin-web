import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import MediaQuery from 'react-responsive';

import Loading from '../Components/Loading/'
import ModalText from '../Components/Modal/ModalText'

import { setIsLoading } from '../../actions/'
// import  priceProduct  from '../../utils/splitPrice'
// import  productName from '../../utils/splitProduct'
import FormatRupiah from '../../utils/formatRupiah'
import envChecker from '../../utils/envChecker'

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
    this.handler = (ev) => {
      ev.preventDefault();
      alert('WOAH!');
    }
    localStorage.setItem('selectedPriceID', this.props.selectedPriceID)
  }

  renderTimeUpPrice = () => {
    if (this.state.priceComp) {
      return(<label className="bidding__2__col2__newPrice">{this.formatRupiah()}</label>)
    } else {
      return (<label className="bidding__2__col2__newPrice"></label>)
    }
  }

  renderTimeUpWatch = () => {
    if (this.state.priceComp) {
      return (<label className="bidding__3__col__text">{this.state.productUnlocked.watching} orang</label>)
    } else {
      return (<label className="bidding__3__col__text">orang</label>)
    }
  }

  renderBid = () => {
    return (
    <div className="bidding">
      <div className="bidding__container">
        <Loading isLoading={ this.props.isLoading } />
        <div className="bidding__3">
          <div className="bidding__3__col">
            <div>
              <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/timer.svg' className="bidding__3__col__logoTimer" alt="Logo Timer"/>
            </div>
            <div>
              <label className="bidding__3__col__text">{this.state.count < 10 ? `00:0${this.state.count}` : `00:${this.state.count}`} detik</label>
            </div>
          </div>
          <div className="bidding__3__col">
            <div>
              <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/watch.svg' className="bidding__3__col__logoWatch" alt="Logo Watch"/>
            </div>
            <div>
              {this.renderTimeUpWatch()}
            </div>
          </div>
        </div>
        <div className="bidding__2">
        <div className="biddingIconPriceStyle">
          <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/coins.png' className="bidding__3__col__logoPrice" alt="Logo Watch"/>
        </div>
          <div className="bidding__2__col2">
            <div className="bidding__2__col2__mid">
              {this.renderTimeUpPrice()}
            </div>
            <div>
              <label className="bidding__2__col2__text">
                harga yang ditampilkan adalah harga live.
              </label>
            </div>
          </div>
        </div>
        <div className="bidding__button">
        <div className="bidding__4">
          <button className="bidding__4__btnBuy" onClick={() => this.buy()}>
            <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/cart-of-ecommerce.png' className="bidding__3__col__logoBuy" alt="Logo Watch"/>Beli
          </button>
        </div>
        <div className="bidding__5">
          <button className="bidding__5__btnCancel" onClick={() => this.cancel()}><img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/cancel.png' className="bidding__3__col__logoCancel" alt="Logo Watch"/>Batal</button>
        </div>
        </div>
      </div>
      <ModalText text="Waktu lelang telah habis! Anda akan kembali pada halaman utama." color={'red'} background={'lightyellow'} isOpen={this.state.open} toggle={this.toggle}/>
    </div>
    )
  }

  renderMobileBid = () => {
    return (
      <div>
        <Loading isLoading={ this.props.isLoading } />
        <h1 className="mobile-bidding__title">RUANG LELANG</h1>
        <div className="mobile-bidding__content">
          <div className="mobile-bidding__2">
            {this.renderTimeUpPrice()}
            <label className="mobile-bidding__2__text">
              harga live. saat ini
            </label>
          </div>
          <div className="mobile-bidding__3">
            <div className="mobile-bidding__3__col">
              <div>
                <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/timer.svg' className="mobile-bidding__3__col__logoTimer" alt="Logo Timer"/>
              </div>
              <div>
                <label className="mobile-bidding__3__col__text">{this.state.count < 10 ? `00:0${this.state.count}` : `00:${this.state.count}`}</label>
              </div>
            </div>
            <div className="mobile-bidding__3__col">
              <div>
                <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/watch.svg' className="mobile-bidding__3__col__logoWatch" alt="Logo Watch"/>
              </div>
              <div>
                {this.renderTimeUpWatch()}
              </div>
            </div>
          </div>
          </div>
          <div className="mobile-bidding__button__container">
            <button className="mobile-bidding__button" onClick={() => this.buy()}>Beli Sekarang</button>
            <button className="mobile-bidding__button batal" style={{color:'red'}} onClick={() => this.cancel()}>Batal</button>
          </div>
          <ModalText text="Waktu lelang telah habis! Anda akan kembali pada halaman utama." color={'red'} background={'lightyellow'} isOpen={this.state.open} toggle={this.toggle}/>
      </div>
    )
  }
  

  render() {
    return (
    <div>
      <MediaQuery query="(max-device-width: 720px)">
        {this.renderMobileBid()}
      </MediaQuery>
      <MediaQuery query="(min-device-width: 721px)">
        {this.renderBid()}
      </MediaQuery>
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

  // priceProduct() {
  //   return this.state.productUnlocked.productName && (
  //     <h2 className="bidding__2__col1__text">{priceProduct(this.state.productUnlocked.productName)}</h2>
  //   )
  // }

  // productName() {
  //   return this.state.productUnlocked.productName && (
  //     <h2 className="bidding__2__col1__text">{productName(this.state.productUnlocked.productName)}</h2>
  //   )
  // }

  componentDidMount() {
    this.watchProductPrice(this.props.selectedPriceID)
  }

  componentDidUpdate(prevProps, prevState) {
		this.checkTimer(prevState.count)
		this.afterResetPrice(prevState.productUnlocked.aladinPrice)
  }

  componentWillUnmount() {
    localStorage.removeItem('selectedPriceID')
  }

  handleBack() {
    if (this.props.history.action === 'POP') {
      this.props.history.replace('/')
    }
  }

  buy() {
    const productsRef = firebase.database().ref().child(`${envChecker('firebase')}`)
    const productRef = productsRef.child(this.props.selectedPriceID)
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
      url: `${envChecker('api')}/lognoinvoice/${this.props.selectedPriceID}`,
    })

    this.props.history.push('/insertphone', {
      productUnlocked: this.state.productUnlocked,
      aladinPrice: updatePrice,
      id: this.state.productUnlocked.id
    })
  }

  cancel() {
    this.props.history.push('/home')
  }

  watchProductPrice = async (priceId) => {
    if (priceId === '') {
      return null
    }

		if (priceId === 1) {
      this.props.setIsLoading(true)
      const productsRef = firebase.database().ref().child(`${envChecker('firebase')}`)
      const productRef = productsRef.child(priceId)
      productRef.once('value', async snap => {
        if ( snap.val().aladinPrice - snap.val().decreasePrice > 0){
          await productRef.update({
            watching: snap.val().watching + 1,
            aladinPrice: snap.val().aladinPrice - snap.val().decreasePrice
          })
          axios({
            method: 'POST',
            url: `${envChecker('api')}/logbid`,
            headers: {
              token: localStorage.getItem('token'),
            },
            data: {
              priceId: priceId,
              priceBefore: snap.val().aladinPrice,
              priceAfter: snap.val().aladinPrice - snap.val().decreasePrice
            }
          })
        }
        else if (snap.val().aladinPrice - snap.val().decreasePrice <= 0) {
          productRef.update({
            watching: snap.val().watching + 1,
            aladinPrice: 0
          })
          axios({
            method: 'POST',
            url: `${envChecker('api')}/logbid`,
            headers: {
              token: localStorage.getItem('token'),
            },
            data: {
              priceId: priceId,
              priceBefore: snap.val().aladinPrice,
              priceAfter: 0
            }
          })
        }
      })
      axios({
        method: 'POST',
        url: `${envChecker('api')}/watching`,
        data: {
          priceId: priceId,
        }
      })
      productRef.on('value',async snap => {
        propsAladinPrice = snap.val().aladinPrice
        const productValue = {
          displayPrice: snap.val().displayPrice,
          id: snap.val().id,
          price: snap.val().price,
          watching: snap.val().watching
        }
        await this.setState({
          productUnlocked: productValue,
        })
      })

      this.runTimer()
      this.props.setIsLoading(false)
    } else if (localStorage.getItem('token') !== null) {
      this.props.setIsLoading(true)
      const productsRef = firebase.database().ref().child(`${envChecker('firebase')}`)
      const productRef = productsRef.child(priceId)
      productRef.once('value', async snap => {

        if (snap.val().aladinPrice > 10000){
          await productRef.update({
            watching: snap.val().watching +1,
            aladinPrice: snap.val().aladinPrice - snap.val().decreasePrice
          })
          axios({
            method: 'POST',
            url: `${envChecker('api')}/logbid`,
            headers: {
              token: localStorage.getItem('token'),
            },
            data: {
              priceId: priceId,
              priceBefore: snap.val().aladinPrice  ,
              priceAfter: snap.val().aladinPrice - snap.val().decreasePrice
            }
          })
        } else if (snap.val().aladinPrice === 10000 || snap.val().aladinPrice <= 10000 ) {
          productRef.update({
            watching: snap.val().watching +1,
          })
          axios({
            method: 'POST',
            url: `${envChecker('api')}/logbid`,
            headers: {
              token: localStorage.getItem('token'),
            },
            data: {
              priceId: priceId,
              priceBefore: snap.val().aladinPrice  ,
              priceAfter: snap.val().aladinPrice
            }
          })
        }
      })
      axios({
        method: 'POST',
        url: `${envChecker('api')}/watching`,
        data: {
          priceId: priceId,
        }
      })
      productRef.on('value', async snap => {
        propsAladinPrice = snap.val().aladinPrice
        let productValue = {
          brand: snap.val().brand,
          brandLogo: snap.val().brandLogo,
          displayPrice: snap.val().displayPrice,
          id: snap.val().id,
          price: snap.val().price,
          productName: snap.val().productName,
          watching: snap.val().watching
        }
        await this.setState({
          productUnlocked: productValue,
        })
      })

    await this.runTimer()
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
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
    selectedPriceID: state.productReducer.selectedPriceID,
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoading: (bool) => dispatch(setIsLoading(bool)),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Bidding)

export default connectComponent
