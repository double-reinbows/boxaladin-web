import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import ModalOtpImage from './ModalOtpImage'
import HelperAxios from '../../../../utils/axios'
import SuccessModalOtp from './SuccesOtp';
import PropTypes from 'prop-types';

class ModalOtpInput extends Component {
  static propTypes = {
    endpoint: PropTypes.string,
    isOpen: PropTypes.bool,
    missPhone: PropTypes.string,
    phone: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      otp: 0,
      notifOtp: '',
      notifCount: '',
      modalImage: false,
      disabledRetry: false,
      disabledSubmit: true,
      count: 5,
      time: 60,
      modalSuccess: false,
      newMissPhone: ''
    }
  }

  handleInput = (e) => {
    this.setState({
      otp: e.target.value,
      disabledSubmit: false
    })
  }

  retry = () => {
    const {count} = this.state;
    const { phone } = this.props;
    this.setState({
      modalImage: !this.state.modalImage,
      count: count - 1,
      otp: 0,
    })
    if (count > 0 ){
      HelperAxios('POST', 'otp', {phonenumber: phone})
      .then(response => {
        if (response.data === 'error'){
          alert("Terjadi Kesalahan di Sistem Kami, Silahkan Verifikasi Nomor anda di Halaman Profile User")
          window.location.reload()
        } else if (response.data === 'retry'){
          this.setState({
            notifOtp: 'otp Tidak Terkirim, Silahkan Kirim Ulang',
          })
        } else {
          this.setState({
            modalImage: false,
            newMissPhone: response.data
          })
        }
      })
    }
    this.timer = setInterval(() => {
      this.setState({
        time: this.state.time - 1,
        disabledRetry: true,
        notifCount: `${this.state.count} OTP Sisa Yang Dapat Dikirim`
      })
  
      if(this.state.time <= 0) {
        clearInterval(this.timer);
        this.setState({
          time: 60,
          disabledRetry: false
        })
      }
    }, 1000)
  }

  submit = () => {
    const {otp} = this.state;
    const {endpoint, phone} = this.props;
    if (otp === 0) {
      this.setState({
        notifOtp: 'OTP Tidak Boleh Kosong',
      })
    } else {
      HelperAxios('POST', `${endpoint}`, {phonenumber:phone, otp: parseInt(otp, 10)})
      .then(response => {
        console.log(response)
        if (response.data.message === 'phone verified') {
          this.setState({
            modalSuccess: true
          })
          setTimeout(() => {
            window.location.reload()
        }, 3000)
        }	else if ( response.data.message === 'incorrect otp') {
          this.setState({
            notifOtp: "OTP Salah",
          });
        } else if ( response.data.message === 'Hp pernah diverifikasi') {
          this.setState({
            notifOtp: "Hp pernah diverifikasi",
          });
        }
      }).catch(err => console.log('error'));
    }
  }

  handlePhonenumber = () => {
    const {newMissPhone} = this.state
    const {missPhone } = this.props
    if (this.state.newMissPhone){
      return (
        <Fragment>
        <label>Masukkan 4 Angka Terakhir dari Nomor</label> <label style={{color:'red'}}>{newMissPhone}xxxx</label>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
        <label>Masukkan 4 Angka Terakhir dari Nomor</label> <label style={{color:'red'}}>{missPhone}xxxx</label>
        </Fragment>
      )
    }
  }

  render() { 
    console.log(this.state.time)
    return (  
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__otp__input">
        <div className="modal__otp__input__container">
        <h2 className="modal__otp__input__title">Verifikasi Nomor Untuk Mendapat 5 Key Gratis</h2>
        <img className="modal__otp__input__image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Home/handphone.png' alt="phone"/>
          <br/>
          <label>Anda Akan di Misscall di Nomor {this.props.phone}</label>
          {this.handlePhonenumber()}
          <div className="modal__otp__input__content">
            <input maxLength={4} type="number" className="modal__otp__input__content-input" onChange={this.handleInput} placeholder="OTP"/>
            <br/>
            <button style={{marginTop:"2%"}} onClick={this.submit} disabled={this.state.disabled}className="modal__otp__input__content-button baButton">Submit</button>
            <br/>
            <label className="alert__otp">{this.state.notifOtp}</label>
            <label className="alert__otp">{this.state.notifCount}</label>
          </div>
          <div className="modal__otp__input__content__button">
            <button onClick={this.retry} disabled={this.state.disabledRetry}className="modal__otp__input__content-button baButton">Retry</button>
          </div>
        </div>
        <ModalOtpImage isOpen={this.state.modalImage}/>
        <SuccessModalOtp isOpen={this.state.modalSuccess}/>
      </Modal>
    )
  }
}

export default ModalOtpInput
