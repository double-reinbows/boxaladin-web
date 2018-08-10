import React, { Fragment, Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Button, ButtonGroup } from 'reactstrap';

import Loading from '../Loading';
import LoadingTime from '../Loading/indexTime';
import { setIsLoading } from '../../../actions/';
import { setIsLoadingTime } from '../../../actions/';
import { refreshToken } from '../../../actions/userAction';
import FormatRupiah from '../../../utils/formatRupiah';
import HelperAxios from '../../../utils/axios';

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
  }

  componentDidMount() {
    this.props.refreshToken()
  }

  axiosTransaction = () => {
    const { bank } = this.state
    const { fixedendpoint, retailendpoint, walletendpoint } = this.props
    if ( bank !== 'Alfamart' && bank !== 'Wallet') {
      this.getTransaction(fixedendpoint, '')
    } else if ( bank === 'Alfamart') {
      this.getTransaction(retailendpoint, 'Alfamart')
    } else if ( bank === 'Wallet') {
      this.getTransaction(walletendpoint, 'Wallet')
    }
  }

  createObj() {
    const { text, data, location, brandId, amount, phone } = this.props
    const { bank } = this.state
    if (text === 'buy wallet') {
      return {
        amount: parseInt(data, 10),
        bankCode: bank
      }
    } else if (text === 'buy key'){
      return {
        keyId: parseInt(data, 10),
        bankCode: bank
      }
    } else if (text === 'buy pulsa' || text === 'buy pulsa 10k'){
      return {
        // priceid & brandid used for find product
        priceId: location.state.id,
        brandId: brandId,
        phoneNumber: phone,
        bankCode: bank,
        amount: amount
      }
    }
  }

  checkResponse = ({ warning }, callback) => {
    this.props.setIsLoading(false)
    if(warning) {
      alert(warning)
    }
    if(callback) {
      (callback())
    } 
  }

  getTransaction = async (axiosUrl, paymentType) => {
    const dataValue = this.createObj();
    const { push, refreshToken, setIsLoading, history} = this.props
    setIsLoading(true)
    HelperAxios('POST', axiosUrl, dataValue)
    .then(async result => {
      if (result.data.message === 'not verified user'){
        this.checkResponse({ warning: 'Silahkan Verifikasi Email Anda' })
      } else if (result.data === 'saldo limited') {
        this.checkResponse({ warning: 'Masukkan Jumlah Sesuai Range Saldo' })
      } else if (result.data === 'maksimum limit wallet') {
        this.checkResponse({ warning: 'Saldo Wallet Tidak Boleh Melebihi Rp. 2.000.000'})
      } else if (result.data === 'product not found') {
        this.checkResponse({ warning: 'Provider Tidak ditemukkan'})
      } else if (result.data === 'product not active') {
        this.checkResponse({ warning: 'Provider Sedang Tidak Bisa digunakan'})
      } 

      if (paymentType !== 'Wallet'){
        if (result.data.error_code === 'DUPLICATE_CALLBACK_VIRTUAL_ACCOUNT_ERROR'){
          this.checkResponse({callback: this.setState({notif: true})})
        } else if (result.data.status === 200) {
          this.props.history.push(`/${push}/${result.data.dataFinal.id}`)
        }
      }

      if (paymentType === 'Wallet') {
        if (result.data.message === 'saldo tidak mencukupi'){
          this.checkResponse(
            {warning: `saldo tidak mencukupi, saldo anda ${FormatRupiah(result.data.wallet)}`, 
              callback: this.setState({ disabledButton: true, bank: '', disabled: true})}
          )
        } else if (result.data.message === 'topup sukses'){
          await refreshToken()
          setIsLoading(false)
          window.location.reload();
        } else if (result.data.message === 'sukses pulsa'){
          await refreshToken()
          history.push(`/tabsinvoice`)
        }
      }
    })
    .catch(err => console.log(err))
  }

  async refreshToken(){
    await this.props.refreshToken()
  }

  handleToggle = async () => {
    await this.setState({
      notif: '',
      bank: '',
      disabled: true
    })
    this.props.toggle()
  }

  notifDuplicate() {
    if (this.state.notif === true) {
      return (
        <Fragment>
          <b>Pembayaran Anda Dengan No VA ini Belum diselesaikan</b>
          <br />
          <LoadingTime
            {...this.props.TimerLoading}
          />
          <button className="modal__method__content__button" onClick={() => this.cancelInvoice()} disabled = {this.state.disabledCancel}>Hapus</button>
          <button className="modal__method__content__button" ><a href="/tabsinvoice" target="_blank" rel="noopener noreferrer" className="bidding__notif">Invoice</a></button>
        </Fragment>
      )
    } else {
      return null
    }
  }

  cancelInvoice() {
    const { setIsLoading, setIsLoadingTime } = this.props
    setIsLoading(true);
    HelperAxios('DELETE', `virtualaccount`, { bank: this.state.bank })
    .then((data) => {
      setIsLoading(false);
      setIsLoadingTime(true, 0)
      this.timer = setInterval(() => {
        setIsLoadingTime(true, this.props.TimerLoading.timer + Math.floor(100 / 45))
        this.setState({
          disabledCancel: true
        })

        if (this.props.TimerLoading.timer >= 100) {
          clearInterval(this.timer);
          setIsLoadingTime(false)
          this.setState({
            notif : false
          })
        }
      }, 1000);
    })
    .catch(err => {
      console.log(err)
      setIsLoading(false)
    })
  }

  handleChangeBank = (e) => {
    this.setState({
      bank: e.target.value,
      disabled: false
    })
  }

  bankChoice = () => {
    const listBank = [
      {value:'BNI', onClick: this.handleChangeBank},
      {value:'BRI', onClick: this.handleChangeBank},
      {value:'MANDIRI', onClick: this.handleChangeBank},
      {value:'Alfamart', onClick: this.handleChangeBank}
    ]
    let bank = []
      if (this.props.text === 'buy wallet'){
        bank = [
          ...listBank
        ]
      } else if (this.props.text === 'buy pulsa' || this.props.text === 'buy key'){
        bank = [
          ...listBank,
          {value:'Wallet', onClick: this.handleChangeBank , disabled: this.state.disabledButton }
        ]
      } else if (this.props.text === 'buy pulsa 10k'){
        bank = [
          {value:'Wallet', onClick: this.handleChangeBank , disabled: false }
        ]
      }

    return(
      <Fragment>
        <label>Silahkan Pilih Salah Satu Bank Untuk Metode Pembayaran Virtual Account</label>
        <div className="modal__method__content__container">
          <ButtonGroup className="modal__method__ButtonGroup" vertical>
            {bank.map((data, idx) => (
            <Button key={idx} disabled={data.disabled} value={data.value} className="modal__method__Button" onClick={data.onClick}>{data.value}</Button>
            ))
            }
          </ButtonGroup>
        </div>
      </Fragment>
    )
  }

  render() {
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
