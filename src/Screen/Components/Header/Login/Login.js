import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap';

import { loginAction, logoutAction, getPhoneNumbers } from '../../../../actions'
import { getUser } from '../../../../actions/userAction'

const URL = `${process.env.REACT_APP_API_HOST}/`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      username: ''
    }
  }

  logIn(e) {
    e.preventDefault()
    axios.post(URL + 'signin', {
      username: this.state.username,
      password: this.state.password
    })
    .then(({data}) => {
      if (data.message === 'username not found') {
        console.log(data)
        alert(data.message)
      } else if (data.message === 'password incorrect') {
        console.log(data)
        alert(data.message)
      } else if (data.message === 'login success') {
        console.log(data)
        localStorage.setItem('token', data.token)

        // const decoded = jwt.verify(data.token, 'satekambing')

        this.props.loginAction()
        this.props.getUser()
        this.props.getPhoneNumbers()
      }
    })
    .catch(e => {
      console.log(e)
    })
  }

  logInInputHandler(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    console.log('State:', this.state);
    console.log('Props:', this.props);
    return (
      <div className="Login">
        <form className="form-horizontal" onSubmit={ (e) => this.logIn(e)}>

          <div>
            <label className="Login__Title1">
              Anda harus login terlebih dahulu untuk melihat harga
            </label>
          </div>

          <div>
            <label className="Login__Title2">
              Login
            </label>
          </div>

          <div className="form-group Login__Form">
            <label>Email address</label>
            <input  name="username" type="username" className="form-control inputz" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter your email or username here" onChange={ (e) => this.logInInputHandler(e) }/>
          </div>

          <div className="form-group Login__Form">
            <label>Password</label>
            <input name="password" type="password"  className="form-control inputz" id="exampleInputPassword" aria-describedby="passwordHelp" placeholder="Enter your password" onChange={ (e) => this.logInInputHandler(e) }/>
            <label className="Login__LupaPassword"><a className="lupapass" href="/signup">lupa password?</a></label>
          </div>

          <div className="form-group">
              <Button type="submit" className="Login__ButtonLogin">Login</Button>
          </div>

          <label className="Login__Daftar">Belum memiliki akun? daftar <a href="/signup" className="Login__Link"> disini</a></label>

        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin,
    dataUser: state.userReducer.dataUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: () => dispatch(loginAction()),
    logoutAction: () => dispatch(logoutAction()),
    getPhoneNumbers: () => dispatch(getPhoneNumbers()),
    getUser: () => dispatch(getUser())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Login)

export default connectComponent
