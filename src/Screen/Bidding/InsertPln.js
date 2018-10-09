import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

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
      this.InsertPln()
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
