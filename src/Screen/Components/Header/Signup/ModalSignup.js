import React from 'react';
import Modal from 'react-modal'
import { ModalHeader, Button } from 'reactstrap';
import Signup from './Signup'
import { connect } from 'react-redux'

import { setModalLogin, setModalRegister } from '../../../../actions/'

class ModalSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.setModalRegister(!this.props.modalRegister)
  }

  openRegisterModal() {
    this.props.setModalLogin(!this.props.modalLogin)
    this.props.setModalRegister(!this.props.modalRegister)
  }


  render() {
    return (
      <div className="header-margin">
      { /**   <Button className="ButtonHeader" onClick={this.toggle}>
            <div className="ButtonHeader__big">
              {this.props.buttonLabel}
              Register
            </div>
        </Button> **/ }
        <div>
        <button style= {{
        backgroundColor: 'Transparent',
        backgroundRepeat:'no-repeat',
        border: 'none',
        cursor:'pointer',
        overflow: 'hidden' }} onClick={this.toggle} className="headMobile__text"> {this.props.buttonLabel} Register </button>
        </div>

        <Modal ariaHideApp={false} isOpen={this.props.modalRegister} toggle={this.toggle} className="modal__login">
          <div className="modal__login__container">
          <ModalHeader toggle={this.toggle} className="modal__login__header">
            <div className="modal__login__header__title">
              <h2> Selamat Datang di Boxaladin</h2>
              <h4> Daftar dengan akun baru </h4>
            </div>
          </ModalHeader>
            <div>
            <Signup />
            </div>
            <div className="modal__login__footer">
              <text onClick={() => this.openRegisterModal()} ><button className="modal__login__footer__button">Sudah Terdaftar ?</button></text>
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalSignup)

export default connectComponent
