import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Button, ButtonGroup } from 'reactstrap'

import Loading from '../Components/Loading/'
import LoadingTime from '../Components/Loading/indexTime'
import { setIsLoading } from '../../actions/'
import { setIsLoadingTime } from '../../actions/'
import envChecker from '../../utils/envChecker'

class ModalPayment extends Component{
  constructor(props) {
    super(props)
    this.state = {
      bank: '',
      notif: '',
      disabledCancel: false
    }
  }
  static propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsLoading: PropTypes.func,
    setIsLoadingTime: PropTypes.func,
    data: PropTypes.string
  }
  setBank = (e) => {
    this.setState({
      bank: e.target.value,
      disabled: false,
      notif: false
    })
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
    }
  }

  axiosTransaction = () => {
    const dataValue = this.createObj();
    const {reqbody, fixedendpoint, walletendpoint, retailendpoint, push} = this.props
    this.props.setIsLoading(true)
    if (this.state.bank !== 'Alfamart' && this.state.bank !== 'Wallet') {
      console.log('reqbody', reqbody)
      axios({
        method: 'POST',
        headers: {
            token: localStorage.getItem('token'),
            },
        url: `${envChecker('api')}/${fixedendpoint}`,
        data: dataValue
      })
      .then(result => {
        if (result.data.error_code === "DUPLICATE_CALLBACK_VIRTUAL_ACCOUNT_ERROR") {
          this.props.setIsLoading(false)
          this.setState({
            notif: true
          })
        } else {
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
        this.props.setIsLoading(false)
        this.props.history.push(`/${push}/${result.data.dataFinal.id}`)
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
        console.log('result', result)
        if (result.data === 'saldo tidak mencukupi'){
          this.props.setIsLoading(false)
          alert('saldo tidak mencukupi')
        } else if (result.data.message === 'topup sukses'){
        this.props.setIsLoading(false)
        window.location.reload();
        }
      })
      .catch(err => console.log(err))
    }
  }

  handleToggle = () => {
    this.setState({
      notif: '',
      bank: '',
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
          <button className="modal__method__content__button" ><a href={process.env.REACT_APP_WEB_PRODUCTION + '/tabsinvoice'} target="_blank" rel="noopener noreferrer" className="bidding__notif">Invoice</a></button>
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
        {value:'BNI', onClick: this.handleChangeBank},
        {value:'BRI', onClick: this.handleChangeBank},
        {value:'MANDIRI', onClick: this.handleChangeBank},
        {value:'Alfamart', onClick: this.handleChangeBank},
        {value:'Wallet', onClick: this.handleChangeBank}
      ]
    }

    return(
      <div>
        <label>Silahkan Pilih Salah Satu Bank Untuk Metode Pembayaran Virtual Account</label>
        <div className="modal__method__content__container" onChange={this.setBank}>
          <ButtonGroup className="modal__method__ButtonGroup" vertical>
            {bank.map(data => (
            <Button value={data.value} className="modal__method__Button" onClick={data.onClick}>{data.value}</Button>
            ))
            }
          </ButtonGroup>
        </div>
      </div>
    )
  }

  render() {
    console.log('bank', this.props)
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
    setIsLoadingTime: (bool, timer) => dispatch(setIsLoadingTime(bool, timer))
  }
}

const enhance = connect(mapStateToProps, mapDispatchToProps);
const connectComponent = enhance(withRouter(ModalPayment))

export default connectComponent
