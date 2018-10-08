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
  }

  InsertPln = () => {
    return (
      <div>
        <div className="InsertPhone__textHead">
          <h1 className="InsertPhone__textHead__font">LELANG PLN KAMU BERHASIL</h1>
        </div>
        <div className="InsertPhone__contentContainer">
          <div className="InsertPhone__contentContainer__priceDistance">
          <label className="InsertPhone__contentContainer__label">No PLN Kamu : {this.props.location.state.pln}</label>
            <label className="InsertPhone__contentContainer__label">Terjual dengan harga:</label>
            {/* <label className="InsertPhone__contentContainer__price">{this.formatRupiah()}</label> */}
            <label className="InsertPhone__contentContainer__labelPercentage" >Kamu menghemat {percentagePrice(this.props.location.state.aladinPrice, this.props.location.state.displayPrice)}</label>
          </div>
        </div>
        <label className="alert__game">{this.state.notif}</label>
        <div className="InsertPhone__buttonContainer">
          <button type="submit" className = "InsertPhone__buttonContainer__button" onClick={this.togglePayment} >Lanjut</button>
          <button type="submit" className = "InsertPhone__buttonContainer__button" onClick={this.cancel}>Batal</button>
        </div>
        {this.renderModalPayment()}
      </div>
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
            id={this.props.location.state.id}
            fixedendpoint='v2/virtualaccount'
            retailendpoint='v2/payment'
            walletendpoint='v2/walletpulsa'
            bcaendpoint='bca/pulsa'
            isOpen={this.state.modalPayment}
            amount={this.props.location.state.aladinPrice}
            toggle={this.togglePayment}
            brand={this.state.brand}
            brandId={this.state.brandId}
            endpoint='transaction'
        />
        )
      }
    }
    return null;
  }
  
  render() {
    console.log(this.props.location.state)
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
