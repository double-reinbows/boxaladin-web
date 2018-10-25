import React, { Component } from 'react';
import Modal from 'react-modal'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { selectedPriceID } from '../../../actions/productAction';
import {getUser} from '../../../actions/userAction'
import helperAxios from '../../../utils/axios'

class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  checkAladinkey = async () => {
    const { displayPrice, priceId, type, userInfo } = this.props
    const limitWallet = displayPrice - 500
    if ( !userInfo.id && !localStorage.getItem('token')){
      return alert ('Anda Belum Masuk')
    } else if (userInfo.aladinKeys <= 0 ){
      return alert("Anda Tidak Memiliki Aladin Key")
    } else if (userInfo.wallet < limitWallet) {
      alert(`Saldo Wallet Anda Kurang Dari Rp.${limitWallet.toLocaleString(['ban', 'id'])},00`)
      this.props.history.push('/dompetaladin')
    } else {
      helperAxios('PUT', 'logopenv2', { priceId, type, price: limitWallet })
      .then(async response => {
        if (response.data.status === 401) {
          alert(response.data.message)
          this.props.history.push('/dompetaladin')
        } else if (response.data.status !== 200){
          return alert(response.data.message)
        } else if (response.data.status === 200){
          this.props.getUser()
          await this.props.selectedPriceID(priceId)
          this.props.history.push('/bidding', {
            displayPrice: this.props.displayPrice,
            firebase: this.props.firebase,
            typeBuy: this.props.typeBuy,
            type: this.props.type,
            diamond: this.props.diamond
          })
        }
      })
    }
  }

  renderContent = () => {
    return (
      <div className="modal__confirm__container">
        <div className="modal__confirm__label">
          <label><b>1x intip = 1 kunci aladin. Lanjutkan ?</b></label>
        </div>
        {this.renderKwh()}
        <div className="modal__confirm__button">
          <button className="modal__confirm__button__yes" onClick={this.checkAladinkey}>YA</button>
          <button className="modal__confirm__button__no" onClick={this.props.toggle}>TIDAK</button>
        </div>
      </div>
    )
  }

  renderKwh = () => {
    const { kwh, priceId } = this.props
    if (kwh) {
      return kwh.filter(data => {
        return data.id === priceId
      })
      .map((item, index) => {
        return ( 
          <div key={index} style={{textAlign:'center'}}>
            <label><strong>Untuk Pembelian Rp.{item.price.toLocaleString(['ban', 'id'])} &plusmn; {item.kwh} Kwh</strong></label>   
          </div>
        )
      })
      
    } else {
      return null
    }
  } 

  renderMobilePrice = () => {
    return this.props.displayPrice && (
      <label><b>Nominal {this.props.displayPrice.toLocaleString(['ban', 'id'])}</b></label>
    )
  }

  renderMobile = () => {
    return (
      <div className="mobile-modal-confirm-container">
      {this.renderMobilePrice()}
        <div className="mobile-modal-confirm-label">
          <label><b>1x intip = 1 kunci aladin.</b></label>
          <br/>
          <label><b>Lanjutkan ?</b></label>
        </div>
        {this.renderKwh()}
        <div className="mobile-modal-confirm-button-container">
          <button className="mobile-modal-confirm-button" onClick={this.checkAladinkey}>YA</button>
          <button className="mobile-modal-confirm-button" onClick={this.props.toggle}>TIDAK</button>
        </div>
      </div>
    )
  }


  render() {
    console.log('type', this.props)
    return (
      <Modal isOpen={this.props.open} className="modal__confirm">
        <MediaQuery query="(max-device-width: 720px)">
          {this.renderMobile()}
        </MediaQuery>
        <MediaQuery query="(min-device-width: 721px)">
          {this.renderContent()}
        </MediaQuery>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
    selectedPriceID: state.productReducer.selectedPriceID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedPriceID: (id) => dispatch(selectedPriceID(id)),
    getUser: () => dispatch(getUser()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalConfirm)

export default withRouter(connectComponent)
