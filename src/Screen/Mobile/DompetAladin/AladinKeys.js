import React, { Component } from 'react';
import ModalPayment from '../../Components/Modal/ModalPayment'

class aladinKeys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPayment: false,
      id: 0
    }
  }

  showButton = () => {
    const buttonPrice = [
      {keys1: 10, keys2: 20},
      {keys1: 30, keys2: 40},
      {keys1: 50, keys2: 100},
    ]

    return buttonPrice.map((data, idx) => (
      <div key={idx} className="mobile__topup__button__container">
        <button className="mobile__topup__button">{data.keys1}</button>
        <button className="mobile__topup__button">{data.keys2}</button>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <h2 className="mobile__pulsa__label">Pilih Nominal Top-up</h2>
        <div>
          {this.showButton()}
        </div>
        <h2 className="mobile__pulsa__label">1 = Rp 1.000,-</h2>
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

export default aladinKeys;
