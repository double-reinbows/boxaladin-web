import React, { Component } from 'react';
import ModalPayment from '../../Components/Modal/ModalPayment'
class Topup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPayment: false,
      wallet: ''
    }
  }

  showButton = () => {
    const buttonPrice = [
      {price1: '200000', price2: '300000'},
      {price1: '500000', price2: '750000'},
      {price1: '1000000', price2: '2000000'},
    ]

    return buttonPrice.map((data, idx) => (
      <div key={idx} className="mobile__topup__button__container">
        <button onClick={() => this.walletButton(data.price1)} className="mobile__topup__button">{data.price1.toLocaleString(['ban', 'id'])}</button>
        <button onClick={() => this.walletButton(data.price2)} className="mobile__topup__button">{data.price2.toLocaleString(['ban', 'id'])}</button>
      </div>
    ))
  }
  

  walletButton = (price) => {
    this.setState({
      wallet: price,
      modalPayment: !this.state.modalPayment
    })
  }



  render() {
    return (  
      <div>
        <h2 className="mobile__pulsa__label">Pilih Nominal Top-up</h2>
        <div>
          {this.showButton()}
        </div>
          <ModalPayment
            text='buy wallet'
            fixedendpoint='fixedwallet'
            retailendpoint='alfawallet'
            push='walletinvoice'
            isOpen={this.state.modalPayment}
            data={this.state.wallet}
            toggle={this.walletButton}
          />
        </div>
    );
  }
}

export default Topup;
