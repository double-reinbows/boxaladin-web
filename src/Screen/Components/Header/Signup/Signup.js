import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginAction} from '../../../../actions'

const URL = `${process.env.REACT_APP_API_HOST}/`

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _formIsValid: false,
      phonenumber: ''
    }
    this.signUpInputHandler = this.signUpInputHandler.bind(this)
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
    let pattern = /(\w+)\.(\w+)@gmail.com/
    if (pattern.test(obj.email)) {
      console.log('dotted gmail')
      this.setState({
        typed_email: obj.email,
        email: obj.email.replace(pattern, `$1$2@gmail.com`)
      })
    }
  }

  vEmail() {
    let patt = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    if (this.state.email === '' || this.state.email === undefined) {
      this.setState({email: undefined, _vEmail: false})
    } else if (!patt.test(this.state.email)) {
      this.setState({email: undefined, _vEmail: false})
      alert('Wrong email address')
    } else if (patt.test(this.state.email)) {
      this.setState({_vEmail: true})
    }
  }

  vFname() {
    /**
     * Pola yang dipakai buat nama hanya huruf,
     * tanpa angka, spasi atau special character.
     * Untuk pola di sini, jumlah karakter yang diizinkan 3-20 karakter.
     */
    if (this.state.first_name === '' || this.state.first_name === undefined) {
      console.log('first_name kosong')
      this.setState({first_name: undefined, _vFname: false})
      alert('First name must be filled')
    } else if (!/^[A-Za-z]{3,20}$/.test(this.state.first_name)) {
      alert('First name must be 3 char or more')
      this.setState({first_name: undefined, _vFname: false})
      alert('First name must be 3 char or more')
    } else if (/^[A-Za-z]{3,20}$/.test(this.state.first_name)) {
      this.setState({_vFname: true})
    }
  }

  vLname() {
    /**
     * Basically sama kayak vFname.
     * Tapi karena last name null-able, perlu sedikit modifikasi.
     * Logic-nya adalah, kalau family_name diisi, baru state-nya dievaluasi. Kalau kosong, ya sudah.
     * Last name yang diizinkan: Satu huruf atau lebih, dan hanya huruf.
     * Kalau mau nambah 'boleh pakai spasi', ganti polanya jadi
     * /^[A-Za-z ]{1,20}$/
     */
    if (/^[ ]{1,20}$/.test(this.state.family_name)) {
      this.setState({family_name: undefined})
    } else if (!/^[A-Za-z ]{1,20}$/.test(this.state.family_name)) {
      this.setState({family_name: undefined})
      alert('Wrong name format')
    }
  }

  handlePhoneNum(e) {
    var num = e.target.value.split('')
    if (num[0] === '0') {
      num.splice(0, 1, '62')
      this.setState({[e.target.name]: num.join('')})
    } else if (num[0] + num[1] + num[2] === '+62') {
      num.splice(0, 3, '62')
      this.setState({[e.target.name]: num.join('')})
    } else if (num[0] + num[1] === '62') {
      this.setState({[e.target.name]: num.join('')})
    } else if (num[0] === '8') {
      this.setState({[e.target.name]: '62' + num.join('')})
    } else if (num.length === 0) {
      this.setState({[e.target.name]: num.join('')})
    }
    // console.log(e.target.value);
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
      this.setState({password: undefined, _vPassword: false})
      alert('Password must be filled')
    } else if (!/^[A-Za-z0-9!@#$%^&*()_]{8,20}$/.test(this.state.password)) {
      this.setState({password: undefined, _vPassword: false})
      alert('Password must 8 char or more')
    } else if (/^[A-Za-z0-9!@#$%^&*()_]{8,20}$/.test(this.state.password)) {
      this.setState({_vPassword: true})
    }
  }

  vUsername() {
    /**
     * Username yang diizinkan: alphanumeric, 3-20 karakter.
     * No special characters kecuali '_' (underscore)
     */
    if (/^[A-Za-z0-9_]{3,20}$/.test(this.state.username)) {
      this.setState({_vUsername: true})
    } else {
      this.setState({username: undefined, _vFname: false})
      alert('Wrong username format')
    }
  }

  /**
   * Valid atau tidaknya form (keseluruhan)
   * dievaluasi di sini
   */
  async formIsValid() {
    await this.vFname()
    await this.vLname()
    await this.vUsername()
    await this.vPassword()
    await this.vEmail()

    if (
      this.state._vFname &&
      this.state._vUsername &&
      this.state._vPassword &&
      this.state._vEmail
    ) {
      this.setState({_formIsValid: true})
    } else {
      this.setState({_formIsValid: false})
    }
  }

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  async signUp(e) {
    e.preventDefault()
    await this.formIsValid()

    if (this.state._formIsValid) {
      let payload = {
        email: this.state.email,
        firstName: this.state.first_name,
        familyName: this.state.family_name,
        phonenumber: this.state.phonenumber,
        password: this.state.password,
        sex: this.state.sex,
        typedEmail: this.state.typed_email,
        username: this.state.username
      }
      axios
        .post(URL + 'signup', payload)
        .then(({data}) => {
          // console.log(data)
          // localStorage.setItem('token', data)
          if (data.hasOwnProperty('isUsed')) {
            if (data.isUsed.username) alert('username already used')
            else if (data.isUsed.email) alert('email already used')
          } else {
            localStorage.setItem('token', data.token)
            console.log('>>>Signed up')
            this.props.loginAction()
            /**
             * Tinggal tambah, kalau udah sukses signup mau ngapain lagi
             * selain terima token.
             * Redirect ke home misalnya? Atau dilempar lagi ke halaman login?
             */
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  signUpInputHandler(e) {
    this.setState({[e.target.name]: e.target.value.trim()})
  }

  signUpInputToLowerHandler(e) {
    this.setState({ [e.target.name]: e.target.value.trim().toLowerCase() })
  }

  render() {
    console.log(this.state)
    return (
      <div className="Signup">
        <form className="form-horizontal" onSubmit={e => this.signUp(e)}>
          <div>
            <label className="Login__Title2">
              Register
            </label>
          </div>

          <div className="form-group Signup__Form">
            <label>Email address</label>
            <input name="email" required type="email" className="form-control inputz" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter your email here" onChange={e => this.signUpInputHandler(e)} />
          </div>

          <div className="form-group Signup__Form">
            <label>Phone Number</label>
            <input name="phonenumber" required type="integer" className="form-control inputz" id="inputPhonenumber" aria-describedby="phonenumberHelp" placeholder="Enter your phonenumber here" onChange={e => this.handlePhoneNum(e)}/>
          </div>

          <div className="form-group Signup__Form">
            <label>Password</label>
            <input name="password" required type="password" className="form-control inputz" id="inputPassword" aria-describedby="passwordHelp" placeholder="Enter your password here" onChange={e => this.signUpInputHandler(e)} />
          </div>

          <div className="form-group Signup__Form">
            <label>Confirm Password</label>
            <input name="password" required type="password" className="form-control inputz" id="inputPassword" aria-describedby="passwordHelp" placeholder="Enter your password here" onChange={e => this.signUpInputHandler(e)} />
          </div>

          <input
            name="condition"
            type="checkbox"/>
          <label className="Signup__Condition">Saya telah membaca syarat dan kondisi yang berlaku</label>


          <div className="form-group">
            <button type="submit" className="Signup__ButtonLogin">Register</button>
          </div>


        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: () => dispatch(loginAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Signup)

export default connectComponent
