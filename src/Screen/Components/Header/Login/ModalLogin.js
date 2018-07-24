import React from 'react';
import Modal from 'react-modal'

import { ModalHeader } from 'reactstrap';
import { connect } from 'react-redux'

import Login from './Login'
import { setModalLogin, setModalRegister } from '../../../../actions/'

class ModalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.props.setModalLogin(!this.props.modalLogin)
  }

  openRegisterModal() {
    this.props.setModalLogin(!this.props.modalLogin)
    this.props.setModalRegister(!this.props.modalRegister)
  }

  render() {
    return (
      <div className="header-margin">
      { /**  <Button className="ButtonHeader" onClick={this.toggle}>
          <div className="ButtonHeader__devide">
            <div className="ButtonHeader__big">
              {this.props.buttonLabel}
              Login
            </div>
          </div>
        </Button> **/ }
        <div>
        <button style= {{
          backgroundColor: 'Transparent',
          backgroundRepeat:'no-repeat',
          border: 'none',
          cursor:'pointer',
          overflow: 'hidden' }} onClick={this.toggle} className="headMobile__text"> {this.props.buttonLabel} Login </button>
        </div>
        <Modal ariaHideApp={false} isOpen={this.props.modalLogin} toggle={this.toggle} className="modal__login">
          <div className="modal__login__container">
          <ModalHeader toggle={this.toggle} className="modal__login__header">
            <div className="modal__login__header__title" >
              <h2>Selamat Datang di Boxaladin</h2>
              <h4> Daftar dengan akun baru </h4>
            </div>
          </ModalHeader>
            <div>
              <Login />
            </div>
            <div className="modal__login__footer">
              <text className="modal__login__footer__text" ><a className="lupapass"style={{ textDecoration: "none"}} href="/requestresetpassword"><button className="modal__login__footer__button">Lupa Password</button></a></text>
              <text onClick={() => this.openRegisterModal()} ><button className="modal__login__footer__button">Buat Akun Baru</button></text>
            </div>
          </div>
        </Modal>
      </div>
    );
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
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalLogin)

export default connectComponent
