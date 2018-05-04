import React from 'react';
import Modal from 'react-modal'
import { ModalHeader, Button } from 'reactstrap';
import LoginIcon from '../../../../asset/Login/login.svg'
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
        <Button className="ButtonHeader" onClick={this.toggle}>
            <div className="ButtonHeader__big">
              {this.props.buttonLabel}
              Daftar
            </div>
        </Button>

        {/* <Modal isOpen={this.props.modalRegister} toggle={this.toggle} className="{this.props.className} Modalz" backdrop="static">
          <ModalHeader toggle={this.toggle} className="ModalTop"></ModalHeader>
        </Modal> */}

        <Modal ariaHideApp={false} isOpen={this.props.modalRegister} toggle={this.toggle} className="{this.props.className} modalz">
          <div className="modalContent">
          <ModalHeader toggle={this.toggle} className="ModalTop">
            <div className="modalText" >
              <h2  style={{textAlign: 'center', width:"100%"}}> Selamat Datang di Boxaladin</h2>
              <h4 className="h4ModalTitle"> Daftar dengan akun baru </h4>
            </div>
          </ModalHeader>
            <div className="modal-body">
            <Signup />
            </div>
            <div className="footerModal">
              <text onClick={() => this.openRegisterModal()} ><button className="buttonModalLogin">Sudah Terdaftar ?</button></text>
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
