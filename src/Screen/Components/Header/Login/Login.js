import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'

import { loginAction, logoutAction, getPhoneNumbers, setModalLogin, setModalRegister, setIsLoading } from '../../../../actions'
import { getUser } from '../../../../actions/userAction'
import envChecker from '../../../../utils/envChecker'

import Loading from '../../Loading/'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      numberEmail: '',
      notif: ''
    }
  }

  logIn(e) {
    e.preventDefault()
    this.props.setIsLoading(true)
    const regex = /(@)/gm
    const isExisting = regex.test(this.state.numberEmail)
    if (isExisting === true) {
      axios({
        method: 'POST',
        url: `${envChecker('api')}/signin`,
        headers: {
          key: process.env.REACT_APP_KEY
        },
        data: {
          email: this.state.numberEmail,
          password: this.state.password
        },
      })
      .then(({data}) => {
        this.props.setIsLoading(false)
        if (data.message === 'email not found') {
          this.setState({
            notif: "Nomor HP Atau Email Tidak Terdaftar, Silakan Register Jika Belum Memiliki Akun",
          })
        } else if (data.message === 'password incorrect') {
          this.setState({
            notif: "Password Yang Anda Masukkan Salah",
          })
        } else if (data.message === 'login success') {
          localStorage.setItem('token', data.token)
          this.props.loginAction()
          this.props.getUser()
          this.props.getPhoneNumbers()
          this.props.setModalLogin(false)
          this.props.setModalRegister(false)
          this.props.history.push('/')
        }
      })
    } else {
      axios({
        method: 'POST',
        url: `${envChecker('api')}/v2/signin`,
        headers: {
          key: process.env.REACT_APP_KEY
        },
        data: {
          numberEmail: this.state.numberEmail,
          password: this.state.password
        },
      })
      .then(({data}) => {
        this.props.setIsLoading(false)
        if (data.message === 'phone number not found') {
          this.setState({
            notif: "Nomor HP Atau Email Tidak Terdaftar, Silakan Register Jika Belum Memiliki Akun",
          })
        } else if (data.message === 'password incorrect') {
          this.setState({
            notif: "Password Yang Anda Masukkan Salah",
          })
        } else if (data.message === 'login success') {
          localStorage.setItem('token', data.token)
          this.props.loginAction()
          this.props.getUser()
          this.props.getPhoneNumbers()
          this.props.setModalLogin(false)
          this.props.setModalRegister(false)
          this.props.history.push('/')
        }
      })
    }
  }

  logInInputHandler(e) {
    this.setState({ [e.target.name]: e.target.value.trim() })
  }

  logInInputToLowerHandler(e) {
    this.setState({ [e.target.name]: e.target.value.trim().toLowerCase() })
  }

  render () {
    return (
      <div className="Login">

        <Loading isLoading={ this.props.isLoading } />

        <form className="form-horizontal" onSubmit={ (e) => this.logIn(e)}>

          <div className="form-group Login__Form">
            <label>Nomor HP atau Email : </label>
            <input name="numberEmail" className="form-control inputz" aria-describedby="numberHelp" placeholder="Masukkan nomor handphone atau email kamu*" onChange={ (e) => this.logInInputToLowerHandler(e) }/>
          </div>

          <div className="form-group Login__Form">
            <label>Password :</label>
            <input name="password" type="password"  className="form-control inputz" aria-describedby="passwordHelp" placeholder="Masukkan password kamu*" onChange={ (e) => this.logInInputHandler(e) }/>
            <label className= "labelFont">(*)wajib diisi </label>
            { /*<label className="Login__LupaPassword"><a className="lupapass" href="/requestresetpassword">lupa password?</a></label> */}
            {/* <Link to="/requestresetpassword" className="Login__LupaPassword lupapass">lupa password?</Link> */}

          </div>

          <label className="alert">{this.state.notif}</label>
          <br/>

          <div className="form-group">
              <Button type="submit" className="Login__ButtonLogin">Login</Button>
          </div>

          { /*<label className="Login__Daftar">Belum memiliki akun? daftar <text onClick={() => this.openRegisterModal()} className="Login__Link"> disini</text></label>*/}


        </form>
      </div>
    )
  }

  openRegisterModal() {
    this.props.setModalLogin(!this.props.modalLogin)
    this.props.setModalRegister(!this.props.modalRegister)
  }

}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin,
    dataUser: state.userReducer.dataUser,
    modalLogin: state.modalReducer.modalLogin,
    modalRegister: state.modalReducer.modalRegister,
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: () => dispatch(loginAction()),
    logoutAction: () => dispatch(logoutAction()),
    getPhoneNumbers: () => dispatch(getPhoneNumbers()),
    getUser: () => dispatch(getUser()),
    setModalLogin: (payload) => dispatch(setModalLogin(payload)),
    setModalRegister: (payload) => dispatch(setModalRegister(payload)),
    setIsLoading: (bool) => dispatch(setIsLoading(bool)),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Login)

export default withRouter(connectComponent)
