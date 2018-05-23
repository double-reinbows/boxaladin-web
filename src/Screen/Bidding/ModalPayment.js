//@flow
import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom' 

import Loading from '../Components/Loading/'
import { setIsLoading } from '../../actions/'

class ModalPayment extends Component{
  constructor(props) {
    super(props)
    this.state = {
      bank: ''
    }
  }
  static propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsLoading: PropTypes.func
  }
  setBank = (e) => {
    this.setState({
      bank: e.target.value
    })
  }

  axiosTransaction = () => {
    this.props.setIsLoading(true)
    const {productUnlocked, phone} = this.props.data;
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/virtualaccount`,
      headers: {
        key: process.env.REACT_APP_KEY,
        token: localStorage.getItem('token')
      },
      data: {
        amount: productUnlocked.aladinPrice,
        productId: productUnlocked.id,
        phoneNumber: phone,
        bankCode: this.state.bank
      },
    })
    .then((result) => {
      this.props.setIsLoading(false)
      this.props.history.push(`/payment/${result.data.dataFinal.id}`)
    })
    .catch(err => console.log(err))
  }

  render() { 
    console.log(this.state.bank)
    return (  
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__method">
        <div className="modal__method__container">
          <div className="modal__method__header">
            <button className="modal__method__header__button" onClick={this.props.toggle}>X</button>
          </div>
          <div>
            <label>Silahkan Pilih Salah Satu Bank Untuk Metode Pembayaran Virtual Account</label>
            <div className="modal__method__content__container" onChange={this.setBank}>
              <div className="modal__method__content">
                <input className="modal__method__content__radio" type="radio" value="BNI" name='bank'/> BNI
              </div>
              <div className="modal__method__content">
                <input className="modal__method__content__radio" type="radio" value="BRI" name='bank'/> BRI
              </div>
              <div className="modal__method__content">
                <input className="modal__method__content__radio" type="radio" value="MANDIRI" name='bank'/> MANDIRI
              </div>
            </div>
            <button className="modal__method__content__button" onClick={this.axiosTransaction}>Submit</button>
            <Loading isLoading={ this.props.isLoading } />
          </div>
        </div>
      </Modal>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoading: (bool) => dispatch(setIsLoading(bool)),
  }
}

const enhance = connect(mapStateToProps, mapDispatchToProps);
const connectComponent = enhance(withRouter(ModalPayment))

export default connectComponent
