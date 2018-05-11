import React,{Component} from 'react';
// import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalFooter} from 'reactstrap'
import axios from 'axios'

class ModalOtpUser extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      otpUser: '',
      notifOtp: '',
      count: 5,
      time: 60,
      show: true,
      disabled: false,
    }
  }
  handleOtpUser(e){
    this.setState({
      otpUser: e.target.value
    })
  }

  sendOtp(e){
    e.preventDefault()

    if (this.state.otpUser === '') {
      this.setState({
        notifOtp: 'OTP Tidak Boleh Kosong'
      })
    } else {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/olduserverification`,
      headers: {
        key: process.env.REACT_APP_KEY
      },
      data: {
        phonenumber: this.props.userPhone,
        otp : this.state.otpUser,
        email : this.props.userEmail
      }
    })
    .then((dataOtp) => {
      if (dataOtp.data.message === 'Phone Terverifikasi') {
        alert('No Hp Telah Diverifikasi')
      }	else if ( dataOtp.data.message === 'incorrect otp') {
        this.setState({
          notifOtp: "OTP Salah"
        })
      } else if ( dataOtp.data.message === 'phone verified'){
        console.log('sukses')
        window.location.reload();
      }
    })
    .catch(err => console.log(err))
    }
  }

  resendOtp(){
    this.setState({
      count : this.state.count - 1,
    })
    if (this.state.count > 0 ){
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/otp`,
        headers: {
          key: process.env.REACT_APP_KEY
        },
        data: {
          phonenumber: this.props.userPhone,
          email: this.props.userEmail,
        }
      })
      .then((dataOtp) => {
        if (dataOtp.data === 'error'){
          alert("Terjadi Kesalahan di Sistem Kami, Silahkan Hubungi Customer Service Untuk Menverifikasi No Anda")
          this.setState({
            show: 'hidden'
          })
          window.location.reload();
        } else if (dataOtp.data === 'retry'){
          this.setState({
            notifOtp: 'otp Tidak Terkirim, Silahkan Kirim Ulang'
          })
        } else {
          console.log('otp sent')
        }
      })
    } 
    this.timer = setInterval(() => {
      this.setState({
        time: this.state.time - 1,
        disabled: true,
        notifCount: `${this.state.count} OTP Sisa Yang Dapat Dikirim`
      })
  
      if(this.state.time <= 0) {
        clearInterval(this.timer);
        this.setState({
          time: 60,
          disabled: false
        })
      }
    }, 1000)
  }

  render() { 
    return ( 
      <Modal ariaHideApp={false} isOpen={this.props.openOtpUser} className="modalOtpUser">
        <form onSubmit={e => this.sendOtp(e)}>
          <div className="modalOtpUser__container">
          <ModalHeader className="modalOtpUser__modalHeader" toggle={this.props.buttonToggle}></ModalHeader>
            <div>
              <label className="modalOtpUser__label">Anda Akan di Missed Call Oleh Sistem Kami</label>
              <label className="modalOtpUser__label">Masukkan 4 Angka Terakhir Dari no yang Menelpon Anda</label>
            </div>
            <input type="text" maxLength={4} className="modalOtpUser__input" placeholder="OTP" value={this.state.otpUser} onChange={(e) => this.handleOtpUser(e)} />
            <div>
              <div>
                <label className="modalPrimary__phone__alert">{this.state.notifOtp}</label>
              </div>
              <div>
                <label className="modalPrimary__phone__alert">{this.state.notifCount}</label>
              </div>
            </div>

            <div>
              <button className="modalOtpUser__button" color="primary" type="submit" >Submit</button>{' '}
            </div>
            <ModalFooter>
              <button style ={{visibility:this.state.show}} disabled={this.state.disabled} onClick={() => this.resendOtp()} className="modal-body__otp__resend">Kirim Ulang OTP</button>
            </ModalFooter>
          </div>
        </form>
      </Modal>
    )
  }
}

export default ModalOtpUser
