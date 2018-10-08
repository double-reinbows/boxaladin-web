import React, { Component, Fragment } from 'react';
import Modal from 'react-modal'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import axios from 'axios'
import envChecker from '../../../utils/envChecker'
import { setIsLoading } from '../../../actions';
import Loading from '../../Components/Loading';
import { selectedPriceID } from '../../../actions/productAction';
import {getUser} from '../../../actions/userAction'
import helperAxios from '../../../utils/axios'

class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      inputPln: "",
      success: false,
      button: true,
      disabledCheck:true,
      notif: ''
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
              type: this.props.type
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
        {this.tabModal()}
        {this.renderTab()}
      </div>
    )
  }

  tabModal = () => {
    return (
      <div className="modal__confirm__tab">
        <button className={`modal__confirm__tab__button ${this.checkActive(1)}`} onClick={() => this.changeTab(1)}>PULSA</button>
        <button className={`modal__confirm__tab__button ${this.checkActive(2)}`} onClick={() => this.changeTab(2)}>PLN</button>
      </div>
    )
  }

  checkActive = (value) => {
    const {tab} = this.state
    if (tab === value) {
      return 'tabactive-ba'
    } else {
      return null
    }
  }

  changeTab = (value) => {
    this.setState({
      tab: value,
    })
  }

  checkPlnNumber = (e) => {
    this.setState({
      inputPln: e.target.value,
      disabledCheck: false
    })
  }

  renderTab = () => {
    const { tab } = this.state
    if (tab === 1) {
      return (this.renderPulsa())
    } else if (tab === 2){
      return (this.renderPln())
    }
  }

  renderPulsa = () => {
    return (
      <Fragment>
        <div className="modal__confirm__label">
          <label><b>1x intip = 1 kunci aladin. Lanjutkan ?</b></label>
        </div>
        <div className="modal__confirm__button">
          <button className="modal__confirm__button__yes" onClick={this.checkAladinkey}>YA</button>
          <button className="modal__confirm__button__no" onClick={this.props.toggle}>TIDAK</button>
        </div>
      </Fragment>
    )
  }

  renderPln = () => {
    return (
      <Fragment>
        <div className="modal__confirm__pln">
          <input className={`modal__confirm__pln__input ${this.checkSuccess()}`} value={this.state.inputPln} onChange={this.checkPlnNumber}/>
          <button disabled={this.state.disabledCheck} className="modal__confirm__pln__button baButton" onClick={this.submitPlnNumber}>Check Number</button>
        </div>
        <label className="modal__confirm__label alert__otp">{this.state.notif}</label>
        <label className="modal__confirm__label"><b>1x intip = 1 kunci aladin. Lanjutkan ?</b></label>
        <div className="modal__confirm__button">
          <button disabled={this.state.button} className="modal__confirm__button__yes baButton" onClick={this.checkAladinkey}>YA</button>
          <button className="modal__confirm__button__no baButton" onClick={this.props.toggle}>TIDAK</button>
        </div>
      </Fragment>
    )
  }

  checkSuccess = ()  => {
    const { success } = this.state
    if (success) {
      return ("isValid")
    } else {
      return ("isInvalid")
    }

  }

  submitPlnNumber = () =>{
    this.props.setIsLoading(true)
    axios({
      method: 'POST',
      url: `${envChecker('api')}/checkuserpln`,
      data: {
        tokenNumber : this.state.inputPln
      }
    })
    .then(response=> {
      this.props.setIsLoading(false)
      if (response.data.message._text === "SUCCESS"){
        this.setState({
          success:true,
          button:false 
        })
      } else {
        this.setState({
          notif: 'No Yang Anda Masukkan Salah'
        })
      }
    })
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
        <Loading isLoading={ this.props.isLoading } />
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
    selectedPriceID: state.productReducer.selectedPriceID,
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedPriceID: (id) => dispatch(selectedPriceID(id)),
    getUser: () => dispatch(getUser()),
    setIsLoading: (bool) => dispatch(setIsLoading(bool)),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalConfirm)

export default withRouter(connectComponent)
