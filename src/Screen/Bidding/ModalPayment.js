//@flow
import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Button, ButtonGroup } from 'reactstrap'

import Loading from '../Components/Loading/'
import { setIsLoading } from '../../actions/'

class ModalPayment extends Component{
  constructor(props) {
    super(props)
    this.state = {
      bank: '',
      notif: '',
      disabledCancel: false,
      time: 25
    }
  }
  static propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsLoading: PropTypes.func
  }
  setBank = (e) => {
    this.setState({
      bank: e.target.value,
      disabled: false,
      notif: false
    })
  }

  axiosTransaction = () => {
    if (this.state.bank !== 'Alfamart') {
      this.props.setIsLoading(true)
      const {productUnlocked, phone} = this.props.data;
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/virtualaccount`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          amount: this.props.aladinPrice,
          productId: productUnlocked.id,
          phoneNumber: phone,
          bankCode: this.state.bank
        },
      })
      .then(result => {
        if (result.data.error_code === "DUPLICATE_CALLBACK_VIRTUAL_ACCOUNT_ERROR") {
          this.props.setIsLoading(false)
          this.setState({
            notif: true
          })
        } else {
          this.props.setIsLoading(false)
          this.props.history.push(`/payment/${result.data.dataFinal.id}`)
        }
      })
      .catch(err => console.log(err))
    } else if (this.state.bank === 'Alfamart') {
      this.props.setIsLoading(true)
      const {productUnlocked, phone} = this.props.data;
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/payment`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          amount: this.props.aladinPrice,
          productId: productUnlocked.id,
          phoneNumber: phone,
        },
      })
      .then(result => {
        this.props.setIsLoading(false)
        this.props.history.push(`/payment/${result.data.id}`)
      })
      .catch(err => console.log(err))
    }
  }

  handleToggle = () => {
    this.setState({
      notif: '',
      bank: '',
      disabled: true
    },
  () => this.props.toggle()
    )
  }

  notifDuplicate() {
    if (this.state.notif === true) {
      return (

        <div>
          <b>Pembayaran Anda Dengan No VA ini Belum diselesaikan</b>
          <br />
          <button className="modal__method__content__button" onClick={() => this.cancelInvoice()} disabled = {this.state.disabledCancel}>Hapus</button>
          <button className="modal__method__content__button" ><a href="http://localhost:5000/tabsinvoice" target="_blank" rel="noopener noreferrer" className="bidding__notif">Invoice</a></button>
        </div>
      )
    } else {
      return null
    }
  }

  cancelInvoice() {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_HOST}/virtualaccount`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        bank: this.state.bank
      }
    })
    .then((data) => {
      this.timer = setInterval(() => {
        this.props.setIsLoading(true)
        this.setState({
          time: this.state.time - 1,
          disabledCancel: true,
        })

        if (this.state.time <= 0) {
          clearInterval(this.timer);
          this.props.setIsLoading(false)
          this.setState({
            time: 25
          })
        }
      }, 1000);
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__method">
        <div className="modal__method__container">
          <div className="modal__method__header">
            <button className="modal__method__header__button" onClick={this.handleToggle}>X</button>
          </div>
          <div>
            <label className="modal__label__header">Pilih Metode Pembayaran</label>
            <label className="modal__label__content"><b>Pastikan metode pembayaran anda sesuai dengan apa yang anda mau (sekali anda memilih, anda tidak dapat mengubah metode pembayarannya)</b></label>
            <label className="modal__label__warningBca">*pembayaran menggunakan BCA untuk sementara hanya dapat dilakukan menggunakan transfer dari bank lain</label>
            <div className="modal__method__content__container" onChange={this.setBank}>
            { /** <div className="modal__method__content">
                <input className="modal__method__content__radio" type="radio" value="BNI" name='bank'/> BNI
              </div>
              <div className="modal__method__content">
                <input className="modal__method__content__radio" type="radio" value="BRI" name='bank'/> BRI
              </div>
              <div className="modal__method__content">
                <input className="modal__method__content__radio" type="radio" value="MANDIRI" name='bank'/> MANDIRI
              </div>
              <div className="modal__method__content">
                <input className="modal__method__content__radio" type="radio" value="Alfamart" name='bank'/> ALFAMART
              </div> **/ }
              <ButtonGroup className="modal__method__ButtonGroup" vertical>
                <Button className="modal__method__Button" onClick={() => this.setState({
                  bank: 'BNI'
                })}>BNI</Button>
                <Button className="modal__method__Button" onClick={() => this.setState({
                  bank: 'BRI'
                })} >BRI</Button>
                <Button className="modal__method__Button" onClick={() => this.setState({
                  bank: 'MANDIRI'
                })} >Mandiri</Button>
                <Button className="modal__method__Button" onClick={() => this.setState({
                  bank: 'Alfamart'
                })} >Alfamart</Button>
              </ButtonGroup>
            </div>
            <div>
              <label className="alert__invoice">{this.notifDuplicate()}</label>
            </div>
            <button disabled={this.state.disabled} className="modal__method__content__button" onClick={this.axiosTransaction}>Lanjut</button>
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
