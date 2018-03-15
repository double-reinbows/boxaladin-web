import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import { setModalLogin, setModalRegister, loginAction } from '../actions/'
import { getUser } from '../actions/userAction'

const BA_API_HOST = `${process.env.REACT_APP_API_HOST}`

class EmailVerificationDone extends React.Component {
  render() {
    return (
      <div className="emailVerification">
        <h1 className="emailVerification__text">Your email is verified.</h1>
        { this.showLoginLink() }
      </div>
    )
  }

  componentDidMount() {
    this.verifyEmail()
    this.props.loginAction()
    this.props.getUser()
  }

  verifyEmail() {
    const email_token = this.props.location.search.split('=')[1]
    axios({
      method: 'GET',
      url: `${BA_API_HOST}/emailVerification?encoded=${email_token}`
    })
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }

  showLoginLink() {
    if (localStorage.getItem('token') == null) {
      return (
        // <h3 className="emailVerification__text">Click <Link to="/login">here</Link> to login</h3>
        <h3 className="emailVerification__text">Click <text onClick={() => this.openLoginModal()}>here</text> to login</h3>
      )
    }
  }

  openLoginModal() {
    this.props.setModalLogin(!this.props.modalLogin)
  }

}

const mapStateToProps = (state) => {
  return {
    modalLogin: state.modalReducer.modalLogin,
    modalRegister: state.modalReducer.modalRegister,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalLogin: (payload) => dispatch(setModalLogin(payload)),
    setModalRegister: (payload) => dispatch(setModalRegister(payload)),
    loginAction: () => dispatch(loginAction()),
    getUser: () => dispatch(getUser()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(EmailVerificationDone)

export default connectComponent
