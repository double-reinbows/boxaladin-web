import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import firebase from 'firebase'
import MediaQuery from 'react-responsive';

import Loading from '../Components/Loading/'
import ModalText from '../Components/Modal/ModalText'

import { setIsLoading } from '../../actions/'
import FormatRupiah from '../../utils/formatRupiah'
import envChecker from '../../utils/envChecker'
class Bidding extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      count: 15,
      open: false,
      text: '',
      productUnlocked: '',
      priceComp : true,
    }
    this.handleBack()
  }

  handleBack() {
    if (this.props.history.action === 'POP') {
      this.props.history.replace('/')
    }
  }

  componentDidMount() {
    this.watchProductPrice(this.props.selectedPriceID)
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkDataFirebase(prevState.productUnlocked.aladinPrice, this.state.productUnlocked.aladinPrice)
    this.afterResetPrice(prevState.productUnlocked.aladinPrice)
    
  }

  componentWillUnmount() {
    localStorage.removeItem('selectedPriceID')
  }

  checkDataFirebase = (prevPrice, nowPrice) => {
    if (prevPrice !== undefined && nowPrice !== undefined){
      this.props.setIsLoading(false)
    }
  }

  afterResetPrice(prevPrice) {
		if (prevPrice !== undefined && this.state.productUnlocked.aladinPrice > prevPrice) {
      clearInterval(this.timer);
      this.setState({
        open: true,
        productUnlocked : '',
        priceComp: false,
        text: 'Maaf, produk ini sudah terbeli orang lain! Silahkan melakukan bidding lagi.'
      })
		}
  }

  runTimer = () => {
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count - 1
      })
  
      if(this.state.count <= 0) {
      clearInterval(this.timer);
      this.setState({
        open: true,
        priceComp: false,
        text: 'Waktu lelang telah habis! Anda akan kembali pada halaman utama.'
      })
      }
    }, 1000)
  }

  simplyWatchProductPrice = (priceId, priceBefore, priceAfter) => {
    axios({
      method: 'POST',
      url: `${envChecker('api')}/logbid`,
      headers: {
        token: localStorage.getItem('token'),
      },
      data: {
        priceId: priceId,
        priceBefore: priceBefore,
        priceAfter: priceAfter
      }
    })
    .then(response => {
      console.log('response', response)
      if (response.data.message === 'not allowed'){
        clearInterval(this.timer);
        return this.setState({
          open: true,
          productUnlocked : '',
          priceComp: false,
          text: 'Akun Anda Sedang Digunakan Dalam Ruang Lelang'
        })
      }
    })
    axios({
      method: 'POST',
      url: `${envChecker('api')}/watching`,
      data: {
        id: priceId,
        firebase: this.props.location.state.firebase
      }
    })
    this.runTimer()
  }

  watchProductPrice = (selectedPriceID) => {
    if (selectedPriceID === '') {
      return null
    }
		if (selectedPriceID === 1 || selectedPriceID === 5) {
      this.props.setIsLoading(true)
      const productsRef = firebase.database().ref().child(`${this.props.location.state.firebase}`)
      const productRef = productsRef.child(selectedPriceID)
      productRef.once('value', snap => {
        if ( snap.val().aladinPrice - snap.val().decreasePrice > 0){
          productRef.update({
            watching: snap.val().watching + 1,
            aladinPrice: snap.val().aladinPrice - snap.val().decreasePrice
          })
          this.simplyWatchProductPrice(selectedPriceID, snap.val().aladinPrice, (snap.val().aladinPrice - snap.val().decreasePrice))
        }
        else if (snap.val().aladinPrice - snap.val().decreasePrice <= 0) {
          productRef.update({
            watching: snap.val().watching + 1,
            aladinPrice: 0
          })
          this.simplyWatchProductPrice(selectedPriceID, snap.val().aladinPrice, 0 )
        }
      })
      productRef.on('value',snap => {
        const productValue = {
          aladinPrice: snap.val().aladinPrice,
          watching: snap.val().watching
        }
        this.setState({
          productUnlocked: productValue,
        })
      })
    } else {
      this.props.setIsLoading(true)
      const productsRef = firebase.database().ref().child(`${this.props.location.state.firebase}`)
      const productRef = productsRef.child(selectedPriceID)
      productRef.once('value', snap => {

        if (snap.val().aladinPrice > 10000){
          productRef.update({
            watching: snap.val().watching +1,
            aladinPrice: snap.val().aladinPrice - snap.val().decreasePrice
          })
          this.simplyWatchProductPrice(selectedPriceID, snap.val().aladinPrice, (snap.val().aladinPrice - snap.val().decreasePrice))
        } else if (snap.val().aladinPrice === 10000 || snap.val().aladinPrice <= 10000 ) {
          productRef.update({
            watching: snap.val().watching +1,
          })
          this.simplyWatchProductPrice(selectedPriceID, snap.val().aladinPrice, snap.val().aladinPrice )
          }
        })
        productRef.on('value', snap => {
          const productValue = {
            aladinPrice: snap.val().aladinPrice,
            watching: snap.val().watching
          }
          this.setState({
            productUnlocked: productValue,
          })
        })
    }
  }

    buy = () => {
      const productsRef = firebase.database().ref().child(`${this.props.location.state.firebase}`)
      const productRef = productsRef.child(this.props.selectedPriceID)
      productRef.once('value', snap => {
        productRef.update({
          watching: 0,
          aladinPrice: snap.val().price
        })
      })
  
      axios({
        method: 'PUT',
        url: `${envChecker('api')}/lognoinvoice`,
        data: {
          id: this.props.selectedPriceID,
          type: this.props.location.state.type
        }
      })
      if (this.props.location.state.typeBuy === 'buy pln') {
        this.props.history.push('/insertpln', {
          aladinPrice: this.state.productUnlocked.aladinPrice,
          typeBuy: this.props.location.state.typeBuy,
          displayPrice: this.props.location.state.displayPrice,
          pln: this.props.location.state.pln
        })
      } else if (this.props.location.state.typeBuy === 'buy game') {
        this.props.history.push('/insertgame', {
          aladinPrice: this.state.productUnlocked.aladinPrice,
          typeBuy: this.props.location.state.typeBuy,
          displayPrice: this.props.location.state.displayPrice,
          pln: this.props.location.state.pln,
          diamond: this.props.location.state.diamond
        })
      } else {
        this.props.history.push('/insertphone', {
          aladinPrice: this.state.productUnlocked.aladinPrice,
          typeBuy: this.props.location.state.typeBuy,
          displayPrice: this.props.location.state.displayPrice
        })
      }
    }

  cancel = () => {
    this.props.history.push('/home')
  }

  formatRupiah() {
    const {productUnlocked} = this.state
    return productUnlocked.aladinPrice && (
      FormatRupiah(productUnlocked.aladinPrice)
    )
  }

  displayPrice = () => {
    return this.props.location.state.displayPrice && (
      <label className="mobile-bidding__displayPrice">{this.props.location.state.displayPrice.toLocaleString(['ban', 'id'])}</label>
    )
  }

  renderModalText = () => {
    if (this.state.open) {
      return (
        <ModalText text={this.state.text} color={'red'} background={'#FFF0B3'} isOpen={this.state.open} toggle={this.cancel}/>
      )
    }
    return null
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
          <button className="bidding__4__btnBuy" onClick={this.buy}>
            <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/cart-of-ecommerce.png' className="bidding__3__col__logoBuy" alt="Logo Watch"/>Beli
          </button>
        </div>
        <div className="bidding__5">
          <button className="bidding__5__btnCancel" onClick={this.cancel}><img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/cancel.png' className="bidding__3__col__logoCancel" alt="Logo Watch"/>Batal</button>
        </div>
        </div>
      </div>
      <ModalText text={this.state.text} color={'red'} background={'#FFF0B3'} isOpen={this.state.open} toggle={this.toggle}/>
    </div>
    )
  }

  renderMobileBid = () => {
    return (
      <div>
        <h1 className="mobile-bidding__title">RUANG LELANG</h1>
        <div className="mobile-bidding__content">
          <div className="mobile-bidding__2">
          {this.displayPrice()}
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
            <button className="mobile-bidding__button" onClick={this.buy}>Beli Sekarang</button>
            <button className="mobile-bidding__button batal" style={{color:'red'}} onClick={this.cancel}>Batal</button>
          </div>
          <ModalText text={this.state.text} color={'red'} background={'#FFF0B3'} isOpen={this.state.open} toggle={this.toggle}/>
      </div>
    )
  }

  render() { 
    return (  
    <div>
      <Loading isLoading={ this.props.isLoading } />
      <MediaQuery query="(max-device-width: 720px)">
        {this.renderMobileBid()}
      </MediaQuery>
      <MediaQuery query="(min-device-width: 721px)">
        {this.renderBid()}
      </MediaQuery>
      {this.renderModalText()}
    </div>
    );
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