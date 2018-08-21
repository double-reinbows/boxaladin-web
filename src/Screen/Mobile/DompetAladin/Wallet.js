//@flow
import React, { Component } from 'react';
import ModalPayment from '../../Components/Modal/ModalPayment'
import formatRupiah from '../../../utils/formatRupiah'

type State = {
  modalPayment: boolean,
  wallet: string
}
class Topup extends Component<State> {
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
        <button onClick={() => this.walletButton(data.price1)} className="mobile__topup__button">{formatRupiah(data.price1)}</button>
        <button onClick={() => this.walletButton(data.price2)} className="mobile__topup__button">{formatRupiah(data.price2)}</button>
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
            typeBuy='buy wallet'
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
