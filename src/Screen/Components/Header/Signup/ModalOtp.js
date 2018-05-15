import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { setModalRegister, setIsLoading, loginAction } from '../../../../actions/'

import Modal from 'react-modal'
import { Button, ModalHeader, ModalFooter} from 'reactstrap'
import axios from 'axios'
import TextInput from 'react-otp'

class ModalOtp extends Component {
  static propTypes = {
    buttonToggle: PropTypes.func,
    open: PropTypes.bool,
    phone: PropTypes.string,
    loginAction: PropTypes.func,
    setModalRegister: PropTypes.func,
    text: PropTypes.string,
    submit: PropTypes.JSX,
  }
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      notifOtp: '',
      disabled: false,
      count: 5,
      time: 60,
      show: true,
      formTimer: false,
    }
  }

  handleOtp(e){
    this.setState({
      otp: e.target.value
    })
  }

  sendOtp(e){
    e.preventDefault();
    let {otp} = this.state;
    let {phone, emailUser, buttonToggle, loginAction, setModalRegister} = this.props;
    if (otp === '') {
      this.setState({
        notifOtp: 'OTP Tidak Boleh Kosong',
      })
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/signupverification`,
        headers: {
          key: process.env.REACT_APP_KEY
        },
        data: {
          phonenumber: phone,
          otp : otp,
          email : emailUser
        }
      })
      //--------------------- ask about difference between 'phone verified' and 'phone Terverifikasi'
      .then((dataOtp) => {
        if (dataOtp.data.message === 'Phone Terverifikasi') {
          alert('Selamat! Anda mendapat 5 Kunci Gratis!')
          buttonToggle();
          loginAction();
          setModalRegister(false);
        }	else if ( dataOtp.data.message === 'incorrect otp') {
          this.setState({
            notifOtp: "OTP Salah",
          });
        } else if ( dataOtp.data.message === 'phone verified'){
          buttonToggle();
          loginAction();
          setModalRegister(false);
        }
      // }).catch(err => console.log(err));
      }).catch(err => console.log('error'));
    }
  }

  resendOtp(){
    let {count, time} = this.state;
    let {phone, emailUser, buttonToggle, loginAction, setModalRegister} = this.props;
    this.setState({
      count : count - 1,
    })
    if (count > 0 ){
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/otp`,
        headers: {
          key: process.env.REACT_APP_KEY
        },
        data: {
          phonenumber: phone,
          email: emailUser
        }
      })
      .then((dataOtp) => {
        if (dataOtp.data === 'error'){
          alert("Terjadi Kesalahan di Sistem Kami, Silahkan Hubungi Customer Service Untuk Menverifikasi No Anda")
          this.setState({
            show: 'hidden',
          })
          buttonToggle();
          loginAction();
          setModalRegister(false);
        } else if (dataOtp.data === 'retry'){
          this.setState({
            notifOtp: 'otp Tidak Terkirim, Silahkan Kirim Ulang',
          })
        } else {
          console.log('otp sent')
        }
      })
    } else {
      buttonToggle();
      loginAction();
      setModalRegister(false);
    }
    this.timer = setInterval(() => {
      this.setState({
        time: time - 1,
        disabled: true,
        notifCount: `${count} OTP Sisa Yang Dapat Dikirim`
      })

      if (time <= 0) {
        clearInterval(this.timer);
        this.setState({
          time: 60,
          disabled: false
        })
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let {createdAt, otp, notifCount, notifOtp, show, disabled} = this.state;
    let {text, submit, buttonToggle, open} = this.props;
    // console.log('Current time on render ', Date.now()+0);
    // console.log('STATE state ', this.state);
    return (
      <Modal ariaHideApp={false} isOpen={open} toggle={buttonToggle} className='containerModalOtp' >
        <form onSubmit={e => this.sendOtp(e)}>
          <div className="modalOtp">
          <ModalHeader toggle={buttonToggle} className="ModalTop__otp"></ModalHeader>
            <div className="modal-body__otp">
              <div className="labelOtp">
                <label className="modal-body__otp__label">Verify Nomor Anda Untuk Dapat 5 AladinKey Gratis!</label>
                <label className="modal-body__otp__label">Anda Akan di Missed Call Oleh Sistem Kami. Mohon Jangan Angkat.</label>
                <label className="modal-body__otp__label">{text}</label>
              </div>
            <div>
              <TextInput value={otp} onChange={e => this.handleOtp(e)}></TextInput>
            </div>
            <div>
              {submit}
            </div>
            <div className='otpLabel'>
              <label className="alert__otp">{notifCount}</label>
              <label className="alert__otp">{notifOtp}</label>
            </div>

            </div>
            <ModalFooter className="otpModalFooter">

            <Button style ={{visibility:show}} disabled={disabled} onClick={() => this.resendOtp()} className="modal-body__otp__resend">Kirim Ulang OTP</Button>
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
