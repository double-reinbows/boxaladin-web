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
      pln: '',
      dataPln: {},
      valid: false
    }
  }

  checkValid = () => {
    const {valid} = this.state
    if (valid) {
      return 'inputValid'
    } else {
      return null
    }
  }

  checkPln = async () => {
    const {pln} = this.state
    helperAxios('POST', 'checkuserpln', {tokenNumber: pln})
    .then(response => {
      if (response.data.rc._text === '14') {
        return alert('salah no')
      }
      this.setState({
        valid: true,
        dataPln: response.data
      })
    })
    .catch(err => console.log(err))
  }

  handleChangePln = (e) => {
    this.setState({
      pln: e.target.value
    })
  }

  renderContent = () => {
    return (
      <div className="modal__confirm__container">
        <div className="modal__confirm__label">
          <label><b>Cek Token Anda</b></label>
          <input className={`${this.checkValid()} tes`} type="number" value={this.state.pln} onChange={this.handleChangePln} placeholder="Masukkan No PLN Anda"/>
        </div>
        <div className="modal__confirm__button">
          <button className="modal__confirm__button__yes" onClick={this.checkPln}>Cek</button>
          <button className="modal__confirm__button__no" onClick={this.props.toggle}>TIDAK</button>
        </div>
      </div>
    )
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
        <div className="mobile-modal-confirm-button-container">
          <button className="mobile-modal-confirm-button" onClick={this.checkAladinkey}>YA</button>
          <button className="mobile-modal-confirm-button" onClick={this.props.toggle}>TIDAK</button>
        </div>
      </div>
    )
  }

  render() {
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
