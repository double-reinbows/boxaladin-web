import axios from 'axios'
import React, { Component } from 'react'

const URL = 'http://localhost:3000/'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _formIsValid: false
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
        email: obj.email.replace(pattern, `$1$2@gmail.com`),
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

    if (this.state._vFname && this.state._vUsername && this.state._vPassword && this.state._vEmail) {
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
        first_name: this.state.first_name,
        family_name: this.state.family_name,
        password: this.state.password,
        salt: this.state.salt,
        sex: this.state.sex,
        typed_email: this.state.typed_email,
        username: this.state.username
      }
      console.log(payload)
      axios.post(URL + 'signup', payload)
      .then(({data}) => {
        // console.log(data)
        // localStorage.setItem('token', data)
        if (data.hasOwnProperty('isUsed')) {
          let msg = ''
          if (data.isUsed.username) msg += 'Username already taken\n'
          if (data.isUsed.email) msg += 'Email already used'
          alert(msg)
        } else {
          localStorage.setItem('token', data)
          console.log('>>>Signed up')
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
    this.setState({ [e.target.name]: e.target.value.trim() })
  }

  render () {
    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={(e) => this.signUp(e)} >
          <label>
            First Name
            <input type="text" name="first_name" placeholder="Input First Name" value={this.state.first_name} onChange={this.signUpInputHandler}/>
          </label>
          <br/>
          <label>
            Family Name
            <input type="text" name="family_name" placeholder="Input Last Name" value={this.state.family_name} onChange={this.signUpInputHandler}/>
          </label>
          <br/>
          <label>
            Username
            <input type="text" name="username" placeholder="Input Username" value={this.state.username} onChange={this.signUpInputHandler}/>
          </label>
          <br/>
          <label>
            Password
            <input type="password" name="password" placeholder="Input Password" value={this.state.password} onChange={this.signUpInputHandler}/>
          </label>
          <br/>
          <label>
            Sex
            <select name="sex" value={this.state.sex} onChange={this.signUpInputHandler}>
              <option value={null}></option>
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </label>
          <br/>
          <label>
            Salt
            <input type="text" name="salt" placeholder="Garam sementara" value={this.state.salt} onChange={this.signUpInputHandler}/>
          </label>
          <br/>
          <label>
            Email
            <input type="text" name="email" placeholder="Input Email" value={this.state.email} onChange={this.signUpInputHandler}/>
          </label>
          <br/>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}

export default Signup
