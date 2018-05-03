import React from 'react';
import Modal from 'react-modal'

import { ModalHeader, Button } from 'reactstrap';
import { connect } from 'react-redux'

import LoginIcon from '../../../../asset/Login/login.svg'
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
        <Button className="ButtonHeader" onClick={this.toggle}>
          <div className="ButtonHeader__devide">
            <div className="ButtonHeader__big">
              {this.props.buttonLabel}
              Masuk
            </div>

          </div>
        </Button>
        <Modal ariaHideApp={false} isOpen={this.props.modalLogin} toggle={this.toggle} className="{this.props.className} modalz">
          <div className="modalContent">
          <ModalHeader toggle={this.toggle} className="ModalTop">
          <div className="modalText" >
            <h2  style={{textAlign: 'center', width:"100%"}}> Selamat Datang di Boxaladin</h2>
            <h4 className="h4ModalTitle"> Daftar dengan akun baru </h4>
          </div>
          </ModalHeader>
            <div className="modal-body">
              <Login />
            </div>
            <div className="footerModal">
              <text className="borderFloat" ><a className="lupapass"style={{ textDecoration: "none"}} href="/requestresetpassword">Lupa Password</a></text>
              <text onClick={() => this.openRegisterModal()} >Buat Akun Baru</text>
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
