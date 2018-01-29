import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
import IconUser from '../asset/Login/user.svg'

import { loginAction, logoutAction, getPhoneNumbers } from '../actions/'

const URL = 'http://localhost:3000/'

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
        localStorage.setItem('token', localStorage.getItem('token') || data.token)

        const decoded = jwt.verify(data.token, 'satekambing')
        console.log('Data decoded:', decoded);
        this.props.loginAction(decoded)
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
    console.log('Props:', this.props);
    return (
      <div className="containerz">
        <div className="containerrr">
          <div>
            <img src={IconUser} alt="IconUser" className="IconUser" />
          </div>
          <form className="form-horizontal" onSubmit={ (e) => this.logIn(e)}>
            <div className="form-group">
              <label>Email address</label>
              <input name="username" type="username" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter your email or username here" onChange={ (e) => this.logInInputHandler(e) }/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email or username with anyone else.</small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password"  className="form-control" id="exampleInputPassword" aria-describedby="passwordHelp" placeholder="Enter your password" onChange={ (e) => this.logInInputHandler(e) }/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (payload) => dispatch(loginAction(payload)),
    logoutAction: () => dispatch(logoutAction()),
    getPhoneNumbers: () => dispatch(getPhoneNumbers())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Login)

export default connectComponent
