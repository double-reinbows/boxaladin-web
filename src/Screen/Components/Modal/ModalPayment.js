import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Button, ButtonGroup } from 'reactstrap'

import Loading from '../Loading'
import LoadingTime from '../Loading/indexTime'
import { setIsLoading } from '../../../actions/'
import { setIsLoadingTime } from '../../../actions/'
import { refreshToken } from '../../../actions/userAction'
import envChecker from '../../../utils/envChecker'
import FormatRupiah from '../../../utils/formatRupiah'

class ModalPayment extends Component{
  constructor(props) {
    super(props)
    this.state = {
      bank: '',
      notif: '',
      disabledCancel: false,
      disabledButton: false,
      disabled: true
    }
  }
  static propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsLoading: PropTypes.func,
    setIsLoadingTime: PropTypes.func,
    data: PropTypes.string
  }

  createObj() {
    if (this.props.text === 'buy wallet') {
      let data = {
        amount: parseInt(this.props.data, 10),
        bankCode: this.state.bank
      }
      return data
    } else if (this.props.text === 'buy key'){
      let data = {
        keyId: parseInt(this.props.data, 10),
        bankCode: this.state.bank
      }
      return data
    } else if (this.props.text === 'buy pulsa'){
      let data = {
        productId: this.props.productId.id,
        phoneNumber: this.props.phone,
        bankCode: this.state.bank,
        amount: this.props.amount
      }
      return data
    }
  }

  componentDidMount() {
    this.props.refreshToken()
  }

  axiosTransaction = () => {
    const dataValue = this.createObj();
    const {fixedendpoint, walletendpoint, retailendpoint, push} = this.props
    this.props.setIsLoading(true)
    if (this.state.bank !== 'Alfamart' && this.state.bank !== 'Wallet') {
      axios({
        method: 'POST',
        headers: {
            token: localStorage.getItem('token'),
            },
        url: `${envChecker('api')}/${fixedendpoint}`,
        data: dataValue
      })
      .then(result => {
        if (result.data.message === 'not verified user'){
          this.props.setIsLoading(false)
          return alert('Silahkan Verifikasi Email Anda')
        } else if (result.data.error_code === "DUPLICATE_CALLBACK_VIRTUAL_ACCOUNT_ERROR") {
          this.props.setIsLoading(false)
          this.setState({
            notif: true
          })
        } else if (result.data === 'saldo limited') {
          this.props.setIsLoading(false)
          alert('Masukkan Jumlah Sesuai Range Saldo')
        } else if (result.data === 'not verified user'){
          this.props.setIsLoading(false)
          alert('Silahkan Verifikasi Email Anda')
        } else if (result.data === 'maksimum limit wallet') {
          this.props.setIsLoading(false)
          alert('Saldo Wallet Tidak Boleh Melebihi Rp. 2.000.000')
        } else if (result.status === 200){
          this.props.setIsLoading(false)
          this.props.history.push(`/${push}/${result.data.dataFinal.id}`)
        }
      })
    .catch(err => console.log('error'))
    } else if (this.state.bank === 'Alfamart') {
      this.props.setIsLoading(true)
      axios({
        method: 'POST',
        url: `${envChecker('api')}/${retailendpoint}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: dataValue
      })
      .then(result => {
        if (result.data.message === 'not verified user'){
          this.props.setIsLoading(false)
          return alert('Silahkan Verifikasi Email Anda')
        } else if (result.data === 'saldo limited') {
          this.props.setIsLoading(false)
          alert('Masukkan Jumlah Sesuai Range Saldo')
        } else if (result.data === 'not verified user'){
          this.props.setIsLoading(false)
          alert('Silahkan Verifikasi Email Anda')
        } else if (result.data === 'maksimum limit wallet') {
          this.props.setIsLoading(false)
          alert('Saldo Wallet Tidak Boleh Melebihi Rp. 2.000.000')
        } else if (result.status === 200){
          this.props.setIsLoading(false)
          this.props.history.push(`/${push}/${result.data.dataFinal.id}`)
        }
      })
      .catch(err => console.log(err))
    } else if ( this.state.bank === 'Wallet') {
      this.props.setIsLoading(true)
      axios({
        method: 'POST',
        url: `${envChecker('api')}/${walletendpoint}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: dataValue
      })
      .then(result => {
        console.log('result wallet', result)
<<<<<<< HEAD
        if (result.data.message === 'saldo tidak mencukupi'){
=======
        if (result.data.message === 'not verified user'){
          this.props.setIsLoading(false)
          return alert('Silahkan Verifikasi Email Anda')
        } else if (result.data.message === 'saldo tidak mencukupi'){
>>>>>>> testing
          this.props.setIsLoading(false)
          alert(`saldo tidak mencukupi, saldo anda ${FormatRupiah(result.data.wallet)}`)
          this.setState({
            disabledButton: true,
            bank: ''
          });
        } else if (result.data.message === 'topup sukses'){
          this.refreshToken()
          this.props.setIsLoading(false)
        window.location.reload();
        } else if (result.data.message === 'sukses pulsa'){
          this.refreshToken()
          this.props.history.push(`/tabsinvoice`)
        }
      })
      .catch(err => console.log(err))
    }
  }

  async refreshToken(){
    await this.props.refreshToken()
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
          <LoadingTime
            {...this.props.TimerLoading}
          />
          <button className="modal__method__content__button" onClick={() => this.cancelInvoice()} disabled = {this.state.disabledCancel}>Hapus</button>
          <button className="modal__method__content__button" ><a href="/tabsinvoice" target="_blank" rel="noopener noreferrer" className="bidding__notif">Invoice</a></button>
        </div>
      )
    } else {
      return null
    }
  }

  cancelInvoice() {
    this.props.setIsLoading(true);
    axios({
      method: 'DELETE',
      url: `${envChecker('api')}/virtualaccount`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        bank: this.state.bank
      }
    })
    .then((data) => {
      this.props.setIsLoading(false);
      this.props.setIsLoadingTime(true, 0)
      this.timer = setInterval(() => {
        this.props.setIsLoadingTime(true, this.props.TimerLoading.timer + Math.floor(100 / 45))
        this.setState({
          disabledCancel: true
        })

        if (this.props.TimerLoading.timer >= 100) {
          clearInterval(this.timer);
          this.props.setIsLoadingTime(false)
          this.setState({
            notif : false
          })
        }
      }, 1000);
    })
    .catch(err => {
      console.log(err)
      this.props.setIsLoading(false)
    })
  }

  handleChangeBank = (e) => {
    this.setState({
      bank: e.target.value,
      disabled: false
    })
  }

  bankChoice = () => {
    let bank = []
    if (this.props.text === 'buy wallet'){
      bank = [
        {value:'BNI', onClick: this.handleChangeBank},
        {value:'BRI', onClick: this.handleChangeBank},
        {value:'MANDIRI', onClick: this.handleChangeBank},
        {value:'Alfamart', onClick: this.handleChangeBank},
      ]
    } else {
      bank = [
        {value:'BNI', onClick: this.handleChangeBank, disabled: false},
        {value:'BRI', onClick: this.handleChangeBank, disabled: false},
        {value:'MANDIRI', onClick: this.handleChangeBank, disabled: false},
        {value:'Alfamart', onClick: this.handleChangeBank, disabled: false},
        {value:'Wallet', onClick: this.handleChangeBank , disabled: this.state.disabledButton }
      ]
    }

    return(
      <div>
        <label>Silahkan Pilih Salah Satu Bank Untuk Metode Pembayaran Virtual Account</label>
        <div className="modal__method__content__container">
          <ButtonGroup className="modal__method__ButtonGroup" vertical>
            {bank.map((data, idx) => (
            <Button key={idx} disabled={data.disabled} value={data.value} className="modal__method__Button" onClick={data.onClick}>{data.value}</Button>
            ))
            }
          </ButtonGroup>
        </div>
      </div>
    )
  }

  render() {
    console.log(this.props)
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__method">
        <div className="modal__method__container">
          <div className="modal__method__header">
            <button className="modal__method__header__button" onClick={this.handleToggle}>X</button>
          </div>
            {this.bankChoice()}
            <div>
              <label className="alert__invoice"><b>{this.notifDuplicate()}</b></label>
            </div>
            <button disabled={this.state.disabled} className="modal__method__content__button" onClick={this.axiosTransaction}>Submit</button>
            <Loading isLoading={ this.props.isLoading } />
          </div>
      </Modal>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
    TimerLoading: state.loadingTimeReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoading: (bool) => dispatch(setIsLoading(bool)),
    setIsLoadingTime: (bool, timer) => dispatch(setIsLoadingTime(bool, timer)),
    refreshToken: () => dispatch(refreshToken()),
  }
}

const enhance = connect(mapStateToProps, mapDispatchToProps);
const connectComponent = enhance(withRouter(ModalPayment))

export default connectComponent
