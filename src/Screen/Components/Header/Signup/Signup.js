import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setModalLogin, setModalRegister, setIsLoading, loginAction } from '../../../../actions/'
import axios from 'axios'
import Loading from '../../Loading/'
import ModalOtp from './ModalOtp'
import {Button} from 'reactstrap';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _formIsValid: false,
      phonenumber: '08',
      notif: '',
      // modal: false,
      dataUser: {},
      email: '',
      typedEmail: '',
      modalOtp: false,
      state: null,
      text: 'Silakan tunggu sampai miscallnya selesai sebelum masukkan kode.',
      submit: null,
      password: '',
      confirm_password: '',
      otpForm: false,
    }
    this.signUpInputHandler = this.signUpInputHandler.bind(this)
    this.toggle = this.toggle.bind(this);
    this.toggleOtp = this.toggleOtp.bind(this);
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
    this.setState({
      modalOtp: !this.state.modalOtp,
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

  vEmail() {
    let patt = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (this.state.email === '' || this.state.email === undefined) {
      this.setState({email: undefined, _vEmail: false});
    } else if (!patt.test(this.state.email)) {
      this.setState({email: undefined, _vEmail: false});
      this.setState({
        notif: "Format Email Yang Anda Masukkan Salah",
      });
    } else if (patt.test(this.state.email)) {
      this.setState({_vEmail: true});
    }
  }

	handlePhoneNum(e) {
    var num = e.target.value.split('');
    // console.log(num);
    if (num.length < 2) {
      this.setState({notif: 'Nomor Handphone harus mulai dengan 08.'});
    } else {//(num[0] === '0') {
      // num.splice(0,? 1, '0');
      // console.log(typeof num.join(''));
      this.setState({[e.target.name]: num.join(''), notif: ''});
    // } else if (num[0] + num[1] + num[2] === '+62') {
    //   num.splice(0, 3, '0');
    //   this.setState({[e.target.name]: num.join(''), notif: ''});
    // } else if (num[0] + num[1] === '62') {
    //   num.splice(0, 2, '0');
    //   this.setState({[e.target.name]: num.join(''), notif: ''});
    // } else if (num[0] === '8') {
    //   num.splice(0, 0, '0');
    //   this.setState({[e.target.name]: num.join(''), notif: ''});
    // } else if (num.length === 0) {
    //   this.setState({[e.target.name]: num.join(''), notif: ''});
    // } else {
		// 	this.setState({notif: 'Format No Hp Salah'});
		}
	}

  vPassword() {
    /**
     * Password harus 8 karakter atau lebih, alphanumeric, special characters.
     * Spasi ga termasuk.
     * Tapi pola di sini ga nge-cek apakah password yang dimasukin sudah kombinasi upper-lower case atau belum,
     * sudah include special char atau belum, dst.
     * Yang divalidasi simply jumlah karakter dan karakter yang boleh masuk.
     */
    if (this.state.password === '' || this.state.password === undefined) {
      this.setState({
        password: undefined,
        _vPassword: false,
        notif: "Password Harus diisi",
        password: '',
        confirm_password: '',
      });
    } else if (!/^[A-Za-z0-9!@#$%^&*()_]{8,20}$/.test(this.state.password)) {
      this.setState({
        password: undefined,
        _vPassword: false,
        notif : "Password Harus Terdiri Dari 8 Huruf/Angka atau Lebih",
        password: '',
        confirm_password: '',
      })
    } else if (/^[A-Za-z0-9!@#$%^&*()_]{8,20}$/.test(this.state.password)) {
      this.setState({_vPassword: true});
    }
  }

  // vconfirm_password() {
  //   if (this.state.confirm_password !== this.state.password) {
  //     alert('Password must same')
  //   }
  // }

  // vUsername() {
  //   /**
  //    * Username yang diizinkan: alphanumeric, 3-20 karakter.
  //    * No special characters kecuali '_' (underscore)
  //    */
  //   if (/^[A-Za-z0-9_]{3,20}$/.test(this.state.username)) {
  //     this.setState({_vUsername: true});
  //   } else {
  //     this.setState({username: undefined, _vFname: false});
  //     alert('Wrong username format');
  //   }
  // }

  /**
   * Valid atau tidaknya form (keseluruhan)
   * dievaluasi di sini
   */
  async formIsValid() {
    // await this.vFname()
    // await this.vLname()
    // await this.vUsername()
    await this.vPassword()
    await this.vEmail()
    // await this.vconfirm_password()
    if (
      // this.state._vFname &&
      // this.state._vUsername &&
      this.state._vPassword &&
      this.state._vEmail
    ) {
      this.setState({_formIsValid: true});
    } else {
      this.setState({_formIsValid: false});
    }
  }

  async signUp(e) {
    e.preventDefault()
    let {password, confirm_password, _formIsValid, email, phonenumber, typedEmail} = this.state;

    let {setIsLoading} = this.props;
    setTimeout(() => {
        this.setState({
          text: 'Masukkan 4 angka terakhir dari no yang menelpon anda',
          submit: (<Button className="modal-body__otp__button" color="primary" type="submit" >Submit</Button>),
          otpForm: true,
        });
    }, 20000);
    if (password !== confirm_password) {
      return this.setState({
        notif: "Password Tidak Sama",
      });
    }

    setIsLoading(true);

    await this.formIsValid();

    if (_formIsValid) {
      let payload = {
        email: email,
        phonenumber: phonenumber,
        password: password,
        // confirm_password: confirm_password,
        typedEmail: typedEmail,
      }
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/signup`,
        headers: {
          key: process.env.REACT_APP_KEY,
        },
        data: payload
      })
        .then(({data}) => {
          // console.log(data)
          if (data.hasOwnProperty('isUsed')) {
            if (data.isUsed.username) {
              this.setState({
                notif: "Email sudah digunakan",
              })
            } else if (data.isUsed.email) {
              this.setState({
              notif: "Email sudah digunakan",
              })
            }
          }  else if (data.hasOwnProperty('phoneIsUsed')) {
            this.setState({
              notif: "No Hp sudah digunakan",
            })
          }   else {

            if (data.errors) {
              this.setState({
                notif: "Email Sudah digunakan",
              })
            } else {
              localStorage.setItem('token', data.token)
              this.setState({
                dataUser: payload,
                // modal: true,
                email: payload.email
              }, () => {
                this.toggleOtp();
              });
              // this.props.loginAction()
              /**
               * Tinggal tambah, kalau udah sukses signup mau ngapain lagi
               * selain terima token.
               * Redirect ke home misalnya? Atau dilempar lagi ke halaman login?
               */
              // this.props.setModalRegister(false)

            }

          }
          return this.props.setIsLoading(false)
        })
        .catch(e => {
          // console.log(e)
          return this.props.setIsLoading(false)
        })
    } else {
      return this.props.setIsLoading(false)
    }
  }

  signUpInputHandler(e) {
    this.setState({[e.target.name]: e.target.value.trim()});
  }

  signUpInputToLowerHandler(e) {
    var email = e.target.value
    var user = email.split('@')[0]
    var provider = email.split('@')[1]

    if (provider === 'gmail.com') {
      let userWithoutDot = user.split('.').join('')
      const result = userWithoutDot + '@gmail.com'
      this.setState({ email : result.trim().toLowerCase(), typedEmail: email })
    }
    else {
      const result = e.target.value
      this.setState({ email : result.trim().toLowerCase(), typedEmail: email})

    }
    // console.log(this.state.email);
  }
  resendOtp() {
    this.setState({
      text: 'Silakan tunggu sampai miscallnya selesai sebelum masukkan kode.',
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

  render() {
    let {isLoading} = this.props;
    let {notif, open, phonenumber, email, submit, text, modalOtp, password,
      confirm_password, typedEmail, otpForm} = this.state;
    return (
      <div className="Signup">

        <Loading isLoading={isLoading} />

        <form className="form-horizontal" onSubmit={e => this.signUp(e)}>

          <div className="form-group Signup__Form">
            <label>Alamat Email</label>
            <input name="typedEmail" required
              className="form-control inputz"
              value={typedEmail}
              type="email"
              aria-describedby="emailHelp"
              placeholder="Masukkan Email Kamu*"
              onChange={e => this.signUpInputToLowerHandler(e)}
            />
          </div>

          <div className="form-group Signup__Form">
            <label>Nomor Handphone</label>
            <input name="phonenumber" required
              className="form-control inputz"
              value={phonenumber}
              type="integer"
              aria-describedby="phonenumberHelp"
              placeholder="Masukkan No Handphone Kamu*"
              onChange={e => this.handlePhoneNum(e)}
            />
          </div>

          <div className="form-group Signup__Form">
            <label>Password</label>
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
            <label>Ketik Ulang Password</label>
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
            resendOtp={this.resendOtp}/>
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
