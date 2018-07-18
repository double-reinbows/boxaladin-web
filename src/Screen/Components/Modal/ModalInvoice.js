//@flow
import React, { Component } from 'react';
import Modal from 'react-modal';
// import PropTypes from 'prop-types';
import FormatRupiah from '../../../utils/formatRupiah'
import productName from '../../../utils/splitProduct'

type Props = {
  toggle: Function,
  isOpen: boolean,
  text: string
}

export default class ModalInvoice extends Component<Props> {
  render() {
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__check">
        <div className="modal__invoice__container">
          <div className="modal__check__container__header">
            <button className="modal__check__button" onClick={this.props.toggle}>X</button>
          </div>
          <div className="modal__invoice__header">
            <label className="modal__invoice__header__label">Detail Tagihan</label>
          </div>
          <div className="modal__invoice__container__detail">
            <label className="modal__invoice__detailText">{this.productName()}</label>
            <label className="modal__invoice__detailText">{this.formatRupiah()}</label>
          </div>
      </div>
      </Modal>
    )
  }

  formatRupiah() {
    return this.props.invoice.payment && (
      FormatRupiah(this.props.invoice.payment.amount)
    )
  }

  productName() {
    if (!this.props.invoice) {
      return null
    } else if(this.props.invoice.description){
      return productName(this.props.invoice.description)
    } else {
      return null
    }
  }

}
