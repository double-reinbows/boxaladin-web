import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {setModalRegister, setIsLoading, loginAction } from '../../../../actions/'
import Modal from 'react-modal'
import {Button, ModalHeader, ModalFooter, InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap'
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
    otpForm: PropTypes.JSX,
    resendOtp: PropTypes.func,
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
      clear: false
    }
  }

  handleOtp(e){
    if (this.state.otp.length < 4) {
      this.setState({
        otp: e.target.value,
      });
    }
    // console.log(this.state.otp);
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
        console.log(dataOtp);
        if (dataOtp.data.message === 'phone verified') {
          alert('Selamat! Anda mendapat 5 Kunci Gratis!')
          buttonToggle();
          loginAction();
          setModalRegister(false);
        }	else if ( dataOtp.data.message === 'incorrect otp') {
          this.setState({
            notifOtp: "OTP Salah",
          });
        // } else if ( dataOtp.data.message === 'phone verified'){
        //   buttonToggle();
        //   loginAction();
        //   setModalRegister(false);
        }
      // }).catch(err => console.log(err));
      }).catch(err => console.log('error'));
    }
  }

  resendOtp() {
    let {count, time} = this.state;
    let {phone, emailUser, buttonToggle, loginAction, setModalRegister} = this.props;
    let notifyResendOtp = this.props.resendOtp;
    notifyResendOtp();
    this.setState({
      count: count - 1,
      otp: '',
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

  clearOtp() {
    console.log('jalan clear otp')
    this.setState({otp: ''},()=>{
      console.log(this.state.otp)
    });
  }

  render() {
    let {createdAt, otp, notifCount, notifOtp, show, disabled} = this.state;
    let {text, submit, buttonToggle, open, otpForm} = this.props;
    let otpFormJSX = null;
    let hardcore = '123'
    if (otpForm) {
      otpFormJSX = (<TextInput value={otp} backspaceOnly autoClear={this.state.clear} onChange={e => this.handleOtp(e)}></TextInput>);
    }
    return (
      <Modal ariaHideApp={false} isOpen={open} toggle={buttonToggle} className='modal__otp' >
        <form onSubmit={e => this.sendOtp(e)}>
          <div className="modal__otp__container">
          <ModalHeader toggle={buttonToggle} className="modal__otp__header"></ModalHeader>
            <div className="modal__otp__content">
              <label>Verify Nomor Anda Untuk Dapat 5 AladinKey Gratis!</label>
              <label>Anda Akan di Missed Call Oleh Sistem Kami. Mohon Jangan Angkat.</label>
              <label>{text}</label>
              <div>
              <TextInput value={otp} backspaceOnly autoClear={this.state.clear} onChange={e => this.handleOtp(e)}></TextInput>
              </div>
              <div>
              <InputGroup size="lg" style={{height: '50px', justifyContent: 'center'}}>
                <Input type={'search'} value={1} style={{
                      width: '9%',
                      marginRight: '10px',
                      borderRadius: '5px !important',
                      backgroundColor: '#F7F7FA',
                      color: '#A5AEB6',
                      borderRadius: '5px',
                      padding: '2rem',
                      fontSize: '19px',
                      flex: 'inherit'
                }}></Input>
                <Input style={{
                      width: '9%',
                      marginRight: '10px',
                      borderRadius: '5px !important',
                      backgroundColor: '#F7F7FA',
                      color: '#A5AEB6',
                      borderRadius: '5px',
                      padding: '2rem',
                      fontSize: '19px',
                      flex: 'inherit'
                }}></Input>
                <Input style={{
                      width: '9%',
                      marginRight: '10px',
                      borderRadius: '5px !important',
                      backgroundColor: '#F7F7FA',
                      color: '#A5AEB6',
                      borderRadius: '5px',
                      padding: '2rem',
                      fontSize: '19px',
                      flex: 'inherit'
                }}></Input>
                <Input style={{
                      width: '9%',
                      marginRight: '10px',
                      borderRadius: '5px !important',
                      backgroundColor: '#F7F7FA',
                      color: '#A5AEB6',
                      borderRadius: '5px',
                      flex: 'inherit',
                      padding: '2rem',
                      fontSize: '19px'
                }}></Input>
              </InputGroup>
              </div>
              <div>
                <Button className="body__otp__button" color="primary" onClick={() => this.clearOtp()}>Clear</Button>
                {submit}
              </div>
              <div className='modal__otp__content__alert'>
                <label className="alert__otp">{notifCount}</label>
                <label className="alert__otp">{notifOtp}</label>
              </div>
            </div>
            <ModalFooter className="modal__otp__footer">
            <Button style ={{visibility:show}} disabled={disabled} onClick={() => this.resendOtp()} className="modal__otp__content__button">Kirim Ulang OTP</Button>
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
