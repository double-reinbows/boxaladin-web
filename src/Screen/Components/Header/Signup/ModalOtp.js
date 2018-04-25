import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { setModalRegister, setIsLoading, loginAction } from '../../../../actions/'

import Modal from 'react-modal'
import { Button, ModalHeader, ModalFooter} from 'reactstrap'
import axios from 'axios'

class ModalOtp extends Component {
  static propTypes = {
    buttongToggle: PropTypes.func,
    open: PropTypes.bool,
    phone: PropTypes.string,
    loginAction: PropTypes.func,
    setModalRegister: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = { 
      otp: '',
      notifOtp: '',
      disabled: false,
      count: 5,
      time: 60,
      show: true
    }
  }

  handleOtp(e){
    this.setState({
      otp: e.target.value
    })
  }

  sendOtp(e){
    e.preventDefault()

    if (this.state.otp === '') {
      this.setState({
        notifOtp: 'OTP Tidak Boleh Kosong'
      })
    } else {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/signupverification`,
      data: {
        phonenumber: this.props.phone,
        otp : this.state.otp,
        email : this.props.emailUser
      }
    })
    .then((dataOtp) => {
      console.log('email', this.props.emailUser)
      console.log(dataOtp)
      if (dataOtp.data.message === 'Phone Terverifikasi') {
        alert('No Hp Telah Diverifikasi')
        this.props.buttongToggle()
        this.props.loginAction()
        this.props.setModalRegister(false)

      }	else if ( dataOtp.data.message === 'incorrect otp') {
        this.setState({
          notifOtp: "OTP Salah"
        })
      } else if ( dataOtp.data.message === 'phone verified'){
        this.props.buttongToggle()
        this.props.loginAction()
        this.props.setModalRegister(false)
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
      data: {
        phonenumber: this.props.phone,
        email: this.props.emailUser
      }
    })
    .then((dataOtp) => {
      if (dataOtp.data === 'error'){
        alert("Terjadi Kesalahan di Sistem Kami, Silahkan Hubungi Customer Service Untuk Menverifikasi No Anda")
        this.setState({
          show: 'hidden'
        })
        this.props.buttongToggle()
        this.props.loginAction()
        this.props.setModalRegister(false)
      } else if (dataOtp.data === 'retry'){
        this.setState({
          notifOtp: 'otp Tidak Terkirim, Silahkan Kirim Ulang'
        })
      } else {
        console.log('otp sent')
      }
    })
  } else {
    this.props.buttongToggle()
    this.props.loginAction()
    this.props.setModalRegister(false)
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
  // show(){
  //   this.setState({
  //     show: 'hidden'
  //   })
  // }

  render() { 
    return ( 
      <Modal ariaHideApp={false} isOpen={this.props.open} toggle={this.props.buttongToggle} className='containerModalOtp' >
        <form onSubmit={e => this.sendOtp(e)}>
          <div className="modalOtp">
          <ModalHeader toggle={this.props.buttongToggle} className="ModalTop__otp"></ModalHeader>
            <div className="modal-body__otp">
              <div>
              <label className="modal-body__otp__label">Anda Akan di Missed Call Oleh Sistem Kami</label>
                <label className="modal-body__otp__label">Masukkan 4 Angka Terakhir Dari no yang Menelpon Anda</label>
              </div>
              <div>
                <input className="modal-body__otp__input" value={this.state.otp} onChange={e => this.handleOtp(e)} placeholder="otp"/>
              </div>
              <div>
                <Button className="modal-body__otp__button" color="primary" type="submit" >Submit</Button>{' '}
              </div>
              <div>
              </div>
              <div className='otpLabel'>
                <label className="alert__otp">{this.state.notifCount}</label>
                <label className="alert__otp">{this.state.notifOtp}</label>
              </div>

            </div>
            <ModalFooter>
            {/* <Button onClick={() => this.show()}></Button> */}

            <Button style ={{visibility:this.state.show}} disabled={this.state.disabled} onClick={() => this.resendOtp()} className="modal-body__otp__resend">Kirim Ulang OTP</Button>
            </ModalFooter>
          </div>
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    modalRegister: state.modalReducer.modalRegister,
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: () => dispatch(loginAction()),
    setModalRegister: (payload) => dispatch(setModalRegister(payload)),
    setIsLoading: (payload) => dispatch(setIsLoading(payload)),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalOtp)

export default connectComponent