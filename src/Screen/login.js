import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginAction, logoutAction } from '../actions/'

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
        localStorage.setItem('token', data.token)
        this.props.loginAction()
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
    return (
      <div>
        <form className="form-horizontal" onSubmit={ (e) => this.logIn(e)}>
          <div className="form-group">
            <div className="col-sm-4 col-sm-offset-4">
              <input name="username" required type="text" className="form-control" id="inputUsername" placeholder="username" onChange={ (e) => this.logInInputHandler(e) } />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4 col-sm-offset-4">
              <input name="password" required type="password" className="form-control" id="inputPassword" placeholder="password" onChange={ (e) => this.logInInputHandler(e) } />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4 col-sm-offset-4">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
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
    loginAction: () => dispatch(loginAction()),
    logoutAction: () => dispatch(logoutAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Login)

export default connectComponent
