import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import { setModalLogin, setModalRegister, loginAction } from '../actions/'
import { getUser, refreshToken } from '../actions/userAction'

const BA_API_HOST = `${process.env.REACT_APP_API_HOST}`

class EmailVerificationDone extends React.Component {
  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div className="emailVerification">
        <header className="emailVerification__header">
          <img src="https://s3-ap-southeast-1.amazonaws.com/boxaladin.com/BoxAladin.png" className="emailVerification__header__image"/>
        </header>
        <div className="emailVerification__content">
          <p className="emailVerification__content__textHead">Halo !</p>
          <p className="emailVerification__content__textMiddle">
            Kamu telah menverifikasi email {this.props.userInfo.typedEmail} sebagai akun baru di Boxaladin. klik gambar dibawah ini untuk mulai berbelanja:
          </p>
          <div className="emailVerification__content__image">
            <a href="https://www.boxaladin.com">
              <img src="https://s3-ap-southeast-1.amazonaws.com/boxaladin.com/logo.png" />
            </a>
          </div>
        </div>
        { this.showLoginLink() }
      </div>
    )
  }

  componentDidMount() {
    this.verifyEmail()
    this.props.loginAction()
    this.props.getUser()
    this.props.refreshToken()
  }

  verifyEmail() {
    const email = this.props.location.search.split('&')[0].split('=')[1]
    const email_token = this.props.location.search.split('&')[1].split('=')[1]

    // console.log('verify email:', email_token, email)
    axios({
      method: 'GET',
      headers: {
        key: process.env.REACT_APP_KEY
      },
      url: `${BA_API_HOST}/emailVerification?email=${email}&encoded=${email_token}`
    })
    .then(response => console.log('response'))
    .catch(err => console.log(err))
  }



  showLoginLink() {
    if (localStorage.getItem('token') == null) {
      return (
        // <h3 className="emailVerification__text">Click <Link to="/login">here</Link> to login</h3>
        <h3 className="emailVerification__text">Tekan <text onClick={() => this.openLoginModal()}><b>disini</b></text> untuk masuk</h3>
      )
    }
  }

  openLoginModal() {
    this.props.setModalLogin(!this.props.modalLogin)
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
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
    refreshToken: () => dispatch(refreshToken()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(EmailVerificationDone)

export default connectComponent
