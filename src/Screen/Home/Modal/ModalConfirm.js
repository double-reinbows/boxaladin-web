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

  checkAladinkey = () => {
    const {priceId, userInfo, type} = this.props
    if ( !userInfo.id && !localStorage.getItem('token')){
      alert ('Anda Belum Masuk')
    } else if (userInfo.aladinKeys <= 0 ){
      alert("Anda Tidak Memiliki Aladin Key")
    } else {
      if (priceId === 1) {
        if (userInfo.wallet < 10000){
          return alert('Saldo Wallet Anda Kurang Dari Rp.10.000,00')
        } else {
          helperAxios('GET', 'users/checkuser')
          .then( async data => {
            if (data.data.aladinKeys > 0 && data.data.wallet >= 10000) {
              await this.props.selectedPriceID(priceId)
              this.props.history.push('/bidding', {
                displayPrice: this.props.displayPrice,
                firebase: this.props.firebase,
                typeBuy: this.props.typeBuy,
                type: this.props.type
              })
              await helperAxios('PUT', 'logopen',  {priceId, type})
              this.props.getUser()
            } else {
              alert("Anda Tidak Memiliki Aladin Key")
            }
          })
        }
      } else if (priceId === 5) {
        if (userInfo.wallet < 5000){
          return alert('Saldo Wallet Anda Kurang Dari Rp.5.000,00')
        } else {
          helperAxios('GET', 'users/checkuser')
          .then( async data => {
            if (data.data.aladinKeys > 0 && data.data.wallet >= 5000) {
              await this.props.selectedPriceID(priceId)
              this.props.history.push('/bidding', {
                displayPrice: this.props.displayPrice,
                firebase: this.props.firebase,
                typeBuy: this.props.typeBuy,
                type: this.props.type
              })
              await helperAxios('PUT', 'logopen',  {priceId, type})
              this.props.getUser()
            } else {
              alert("Anda Tidak Memiliki Aladin Key")
            }
          })
        }
      } else {
        helperAxios('GET', 'users/checkuser')
        .then( async data => {
          if (data.data.message === 'not verified user') {
            alert("Silahkan Verifikasi Email Anda")
          } else if (data.data.aladinKeys > 0) {
            await this.props.selectedPriceID(priceId)
            this.props.history.push('/bidding', {
              displayPrice: this.props.displayPrice,
              firebase: this.props.firebase,
              typeBuy: this.props.typeBuy,
              type: this.props.type,
              pln: this.props.pln
            })
            await helperAxios('PUT', 'logopen', {priceId, type})
            this.props.getUser()
          } else {
            alert("Anda Tidak Memiliki Aladin Key")
          }
        })
      }
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
    console.log('props kwh', this.props)
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
