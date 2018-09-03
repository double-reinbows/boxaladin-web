import React, {Component} from 'react';
import {connect} from 'react-redux';
import { setModalLogin, setModalRegister, setIsLoading, loginAction } from '../../../../actions/';
import axios from 'axios';
import Loading from '../../Loading/';
import ModalOtp from './ModalOtp';
import SuccessModalOtp from './SuccessModalOtp';
import {Button} from 'reactstrap';
import formatEmail from '../../../../utils/formatEmail';
import envChecker from '../../../../utils/envChecker'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // _formIsValid: false,
      phonenumber: '08',
      notif: '',
      dataUser: {},
      email: '',
      typedEmail: '',
      modalOtp: false,
      state: null,
      text: '',
      submit: null,
      password: '',
      confirm_password: '',
      otpForm: false,
      modalSuccessOtp: false,
    }
    this.signUpInputHandler = this.signUpInputHandler.bind(this)
    this.toggle = this.toggle.bind(this);
    this.toggleOtp = this.toggleOtp.bind(this);
    this.toggleSuccessOtp = this.toggleSuccessOtp.bind(this);
    this.resendOtp = this.resendOtp.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
    this.props.loginAction();
    this.props.setModalRegister(false);
  }

  toggleOtp() {
    const {loginAction, setModalRegister} = this.props;
    loginAction();
    setModalRegister(false);
    this.setState({
      modalOtp: !this.state.modalOtp,
    })
  }

  toggleSuccessOtp() {
    this.setState({
      modalSuccessOtp: true,
      modalOtp: false,
    })
  }

  /**
  * Di ini isinya validator login form.
  * Mulai dari nama, username, password, email, dll.
  *
  * Untuk pola regex (kecuali gmailDotCheck), saya ambil dari:
  * https://www.9lessons.info/2009/03/perfect-javascript-form-validation.html
  * ++++++++++++++++++++++++++++
  * yang harus divalidasi:
  * first and family name
  * username
  * password
  * email (filled and with or without dot) <+ dipindah ke backend
  */
  gmailDotCheck(obj) {
    let pattern = /(\w+)\.(\w+)@gmail.com/;
    if (pattern.test(obj.email)) {
      this.setState({
        typedEmail: obj.email,
        email: obj.email.replace(pattern, `$1$2@gmail.com`),
      })
    }
  }

  // vEmail() {
  //   let patt = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  //   if (patt.test(this.state.email) || !this.state.email) {
  //     this.setState({_vEmail: true});
  //   }
  // }

	handlePhoneNum(e) {
    var num = e.target.value.split('');
    if (num.length < 2) {
      this.setState({notif: 'Nomor Anda harus mulai dengan 08.'});
    } else if(num[0] !== '0' || num[1] !== '8') {
      this.setState({phonenumber: '08'});
    } else if (num.length > 13) {
      this.setState({notif: 'Nomor Anda telah mencapai panjang maksimal.'});
    } else {//(num[0] === '0') {
      this.setState({phonenumber: num.join(''), notif: ''});
		}
	}

  // vPassword() {
  //   /**
  //    * Password harus 8 karakter atau lebih, alphanumeric, special characters.
  //    * Spasi ga termasuk.
  //    * Tapi pola di sini ga nge-cek apakah password yang dimasukin sudah kombinasi upper-lower case atau belum,
  //    * sudah include special char atau belum, dst.
  //    * Yang divalidasi simply jumlah karakter dan karakter yang boleh masuk.
  //    */
  //   if (this.state.password === '' || this.state.password === undefined) {
  //     this.setState({
  //       _vPassword: false,
  //       notif: "Password Harus diisi",
  //       password: '',
  //       confirm_password: '',
  //     });
  //   } else if (!/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/.test(this.state.password)) {
  //     this.setState({
  //       _vPassword: false,
  //       notif : "Password Minimal Terdiri Dari 6 Huruf/Angka atau Lebih",
  //       password: '',
  //       confirm_password: '',
  //     })
  //   } else if (/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/.test(this.state.password)) {
  //     this.setState({_vPassword: true});
  //   }
  // }


  /**
   * Valid atau tidaknya form (keseluruhan)
   * dievaluasi di sini
   */
  // async formIsValid() {
  //   await this.vPassword()
  //   await this.vEmail()
  //   if (
  //     this.state._vPassword &&
  //     this.state._vEmail
  //   ) {
  //     this.setState({_formIsValid: true});
  //   } else {
  //     this.setState({_formIsValid: false});
  //   }
  // }

  async signUp(e) {
    e.preventDefault()
    let {password, confirm_password, email, phonenumber, typedEmail} = this.state;
    let {setIsLoading} = this.props;
    setTimeout(() => {
        this.setState({
          text: 'Silahkan masukkan 4 angka terakhir dari nomor panggilan tersebut.',
          submit: (<Button className="modal-body__otp__button" color="primary" type="submit" >Submit</Button>),
          otpForm: true,
        });
    }, 20000);
    if (password !== confirm_password) {
      return this.setState({
        notif: "Password Tidak Sama",
      });
    } else if (phonenumber.length < 9){
      return this.setState({
        notif: 'Format No HP salah'
      })
    } else {

      setIsLoading(true);
    
      let payload = {
        email: email,
        phonenumber: phonenumber,
        password: password,
        typedEmail: typedEmail,
      }
      axios({
        method: 'POST',
        url: `${envChecker('api')}/v2/signup`,
        headers: {
          key: process.env.REACT_APP_KEY,
        },
        data: payload
      })
        .then(({data}) => {
          if (data.hasOwnProperty('isUsed')) {
            this.setState({
              notif: "Nomor atau email sudah digunakan",
            })
          } else if (!/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/.test(this.state.password)) {
            this.setState({
              notif : "Password Minimal Terdiri Dari 6 Huruf/Angka atau Lebih",
              password: '',
              confirm_password: '',
            })
          } else if (data.message === 'Signup Berhasil'){
            localStorage.setItem('token', data.token);
            this.setState({
              dataUser: payload,
              email: payload.email,
              modalOtp: !this.state.modalOtp,
            });
          }
          return this.props.setIsLoading(false)
        })
        .catch(e => {
          // console.log(e)
          return this.props.setIsLoading(false)
        })
    }
  }

  signUpInputHandler(e) {
    this.setState({[e.target.name]: e.target.value.trim()});
  }

  resendOtp() {
    this.setState({
      text: 'Silakan Angkat No yang Menelpon Anda.',
      submit: null,
      otpForm: false,
    });
    setTimeout(() => {
        this.setState({
          text: 'Masukkan 4 angka terakhir dari no yang menelpon anda',
          submit: (<Button className="modal-body__otp__button" color="primary" type="submit" >Submit</Button>),
          otpForm: true,
        });
    }, 20000);
  }

  signUpInputToLowerHandler(e) {
    this.setState({ 
      email : formatEmail(e.target.value),
      typedEmail: e.target.value 
    });
  }

  render() {
    let {isLoading} = this.props;
    let {notif, phonenumber, email, submit, text, modalOtp, password,
      confirm_password, typedEmail, otpForm, modalSuccessOtp} = this.state;
    return (
      <div className="Signup">

        <Loading isLoading={isLoading} />

        <form className="form-horizontal" onSubmit={e => this.signUp(e)}>

          <div className="form-group Signup__Form">
            <label>Alamat Email :</label>
            <input name="typedEmail"
              className="form-control inputz"
              value={typedEmail}
              type="email"
              aria-describedby="emailHelp"
              placeholder="Masukkan Email Kamu"
              onChange={e => this.signUpInputToLowerHandler(e)}
            />
          </div>

          <div className="form-group Signup__Form">
            <label>Nomor Handphone :</label>
            <input name="phonenumber" required
              className="form-control inputz"
              value={phonenumber}
              type="number"
              aria-describedby="phonenumberHelp"
              placeholder="Masukkan No Handphone Kamu*"
              onChange={e => this.handlePhoneNum(e)}
            />
          </div>

          <div className="form-group Signup__Form">
            <label>Password :</label>
            <input name="password" required
              className="form-control inputz"
              value={password}
              type="password"
              aria-describedby="passwordHelp"
              placeholder="Masukkan Password Kamu*"
              onChange={e => this.signUpInputHandler(e)}
            />
          </div>
          <div className="form-group Signup__Form">
            <label>Ketik Ulang Password :</label>
            <input name="confirm_password" required
              className="form-control inputz"
              value={confirm_password}
              type="password"
              aria-describedby="passwordHelp"
              placeholder="Ketik Ulang Password Kamu*"
              onChange={e => this.signUpInputHandler(e)}
            />
            <div className="labelSignUp">
              <label className= "labelFont">(*)wajib diisi</label>
            </div>
          </div>



          <label className="alert">{notif}</label>
          <br/>

          <div className="form-group">
            <button type="submit" className="Signup__ButtonLogin">Daftar</button>
          </div>

        </form>
        <ModalOtp
          open={modalOtp}
          buttonToggle={this.toggleOtp}
          phone={phonenumber}
          emailUser={email}
          text={text}
          submit={submit}
          otpForm={otpForm}
          resendOtp={this.resendOtp}
          toggleSuccessOtp={this.toggleSuccessOtp}
        />
        <SuccessModalOtp
          open={modalSuccessOtp}
          buttonToggle={this.toggleSuccessOtp}
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    modalLogin: state.modalReducer.modalLogin,
    modalRegister: state.modalReducer.modalRegister,
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: () => dispatch(loginAction()),
    setModalLogin: (payload) => dispatch(setModalLogin(payload)),
    setModalRegister: (payload) => dispatch(setModalRegister(payload)),
    setIsLoading: (payload) => dispatch(setIsLoading(payload)),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Signup)

export default connectComponent
