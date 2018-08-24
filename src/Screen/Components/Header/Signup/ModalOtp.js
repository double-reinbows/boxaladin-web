import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {setModalRegister, setIsLoading, loginAction } from '../../../../actions/';
import Modal from 'react-modal';
import {Button, ModalHeader, ModalFooter} from 'reactstrap';
import axios from 'axios';
import envChecker from '../../../../utils/envChecker'

class ModalOtp extends Component {
  static propTypes = {
    buttonToggle: PropTypes.func,
    open: PropTypes.bool,
    phone: PropTypes.string,
    loginAction: PropTypes.func,
    setModalRegister: PropTypes.func,
    text: PropTypes.string,
    submit: PropTypes.JSX,
    otpForm: PropTypes.bool,
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
    // console.log(e.target.value);
    if (this.state.otp.length < 4 || e.target.value.length < 4) {
      this.setState({
        otp: e.target.value,
      });
    }
  }

  sendOtp(e){
    e.preventDefault();
    let {otp} = this.state;
    let {phone, emailUser, toggleSuccessOtp} = this.props;
    if (otp === '') {
      this.setState({
        notifOtp: 'OTP Tidak Boleh Kosong',
      })
    } else {
      axios({
        method: 'POST',
        url: `${envChecker('api')}/v2/signupverification`,
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
        if (dataOtp.data.message === 'phone verified') {
          toggleSuccessOtp();
        }	else if ( dataOtp.data.message === 'incorrect otp') {
          this.setState({
            notifOtp: "OTP Salah",
          });
        } else if ( dataOtp.data.message === 'Hp pernah diverifikasi') {
          this.setState({
            notifOtp: "Hp pernah diverifikasi",
          });
        }
      //.catch(err => console.log(err));
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
      notifOtp: '',
    })
    if (count > 0 ){
      axios({
        method: 'POST',
        url: `${envChecker('api')}/otp`,
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
    this.setState({otp: ''});
  }

  render() {
    let { otp, notifCount, notifOtp, show, disabled} = this.state;
    let {text, submit, buttonToggle, open, otpForm} = this.props;
    let otpFormJSX = otpForm ? (<input required className="form-control inputz" value={otp} type="text" pattern="[0-9]*"
                              onChange={e => this.handleOtp(e)} style={{width: "25%", margin: 'auto'}}/>
                            ) : null;

    let clear = otp.length >= 4 ?
      (<Button className="modal-body__otp__button" color="primary" onClick={() => this.clearOtp()} style={{'marginRight': '15px'}}>Clear</Button>)
      : null;

    return (
      <Modal ariaHideApp={false} isOpen={open} toggle={buttonToggle} className='modal__otp' >
        <form onSubmit={e => this.sendOtp(e)}>
          <div className="modal__otp__container">
          <ModalHeader toggle={buttonToggle} className="modal__otp__header"></ModalHeader>
            <div className="modal__otp__content">
              <h1>Verify Nomor Anda Untuk Dapat 5 AladinKey Gratis!</h1>
              <h2>Akan ada panggilan masuk ke hape anda.</h2>
              <label>{text}</label>
            <div className="form-group Signup__Form">
              {otpFormJSX}
            </div>
            <div>
              {clear}
              {submit}
            </div>
            <div className='modal__otp__content__alert'>
              <label className="alert__otp">{notifCount}</label>
              <label className="alert__otp">{notifOtp}</label>
            </div>

            </div>
            <ModalFooter className="modal__otp__footer">
            <Button style ={{visibility:show}} disabled={disabled} onClick={() => this.resendOtp()} className="modal__otp__content__button">Kirim kembali</Button>
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalOtp);

export default connectComponent;
