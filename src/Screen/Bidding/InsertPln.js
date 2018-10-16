import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import ModalPayment from '../Components/Modal/ModalPayment'
import FormatRupiah from '../../utils/formatRupiah'
import percentagePrice from '../../utils/percentagePrice'

class InsertPln extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      modalPayment: false
    }
    this.handleBack()
  }

  handleBack = () => {
    if (this.props.history.action === 'POP') {
      this.props.history.replace('/')
    }
  }

  InsertPln = () => {
    const {aladinPrice, displayPrice, pln} = this.props.location.state
    const {notif} = this.state
    return (
      <div>
        <div className="InsertPhone__textHead">
          <h1 className="InsertPhone__textHead__font">LELANG PLN KAMU BERHASIL</h1>
        </div>
        <div className="InsertPhone__contentContainer">
          <div className="InsertPhone__contentContainer__priceDistance">
          <label className="InsertPhone__contentContainer__label">No PLN Kamu : {pln}</label>
            <label className="InsertPhone__contentContainer__label">Terjual dengan harga:</label>
            <label className="InsertPhone__contentContainer__price">{this.checkRupiah()}</label>
            <label className="InsertPhone__contentContainer__labelPercentage" >Kamu menghemat {percentagePrice(aladinPrice, displayPrice)}</label>
          </div>
        </div>
        <label className="alert__game">{notif}</label>
        <div className="InsertPhone__buttonContainer">
          <button type="submit" className = "InsertPhone__buttonContainer__button" onClick={this.togglePayment} >Lanjut</button>
          <button type="submit" className = "InsertPhone__buttonContainer__button" onClick={this.cancel}>Batal</button>
        </div>
        {this.renderModalPayment()}
      </div>
    )
  }

  renderMobileInsertPln = () => {
    const {pln} = this.props.location.state
    const {notif} = this.state
    return (
      <div>
        <h1 className="mobile-InsertPhone__title">LELANG BERHASIL</h1>
        <div className="mobile-InsertPhone__container">
          <div className="mobile-InsertPhone-pln-header">
            <img className="mobile-InsertPhone-pln-image" src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/Logo_PLN.png" alt="icon pln"/>
            <label className="mobile-InsertPhone-pln-label">SN: {pln}</label>
          </div>
          <div className="mobile-InsertPhone-pln-displayPrice">
            <label className="mobile-InsertPhone-pln-label-bold"><strong>TOKEN LISTRIK</strong></label>
            {this.displayPrice()}
          </div>
          <hr className="mobile-InsertPhone-pln-line"/>
          <div className="mobile-InsertPhone-pln-displayPrice-final">
            <label className="mobile-InsertPhone-pln-label-bold"><b>Harga Akhir</b></label>
            <label className="mobile-InsertPhone-pln-label-center">{this.checkRupiah()}</label>
          </div>
          <label className="alert__otp">{notif}</label>
        </div>
        <div className="mobile-InsertPhone__button__container">
          <button type="submit" disabled={this.state.disabled} className = "mobile-InsertPhone__button" onClick={this.togglePayment} >Beli Sekarang</button>
          <button type="submit" style={{color:'red'}} className = "mobile-InsertPhone__button" onClick={this.cancel}>Batal</button>
        </div>
        {this.renderModalPayment()}
      </div>
    )
  }

  displayPrice = () => {
    return this.props.location.state.displayPrice && (
      <label className="mobile-InsertPhone-pln-displayPrice-line">{this.props.location.state.displayPrice.toLocaleString(['ban', 'id'])}</label>
    )
  }

  checkRupiah = () => {
    return this.props.location.state.aladinPrice && (
			FormatRupiah(this.props.location.state.aladinPrice)
		)
  }

  togglePayment = () => {
    this.setState({
      modalPayment: !this.state.modalPayment,
    })
  }

  cancel = () => {
		this.props.history.push('/home')
	}

  renderModalPayment() {
    if (this.state.modalPayment) {
      if (this.props.location.state.typeBuy === 'buy pln'){
        return (
          <ModalPayment
            typeBuy='buy pln'
            fixedendpoint='v2/virtualaccount'
            retailendpoint='v2/payment'
            walletendpoint='v2/walletpulsa'
            bcaendpoint='bca/pulsa'
            isOpen={this.state.modalPayment}
            amount={this.props.location.state.aladinPrice}
            toggle={this.togglePayment}
            brand='Pln'
            brandId={12}
            endpoint='transaction'
            pln={this.props.location.state.pln}
        />
        )
      }
    }
    return null;
  }
  
  render() {
    return (  
      <div>
        <MediaQuery query="(max-device-width: 720px)">
          {this.renderMobileInsertPln()}
        </MediaQuery>
        <MediaQuery query="(min-device-width: 721px)">
          {this.InsertPln()}
        </MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
    selectedPriceID: state.productReducer.selectedPriceID,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(InsertPln)

export default withRouter(connectComponent)
