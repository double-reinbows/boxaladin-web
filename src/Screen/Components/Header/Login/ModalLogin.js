import React from 'react';

import { Modal, ModalHeader, Navbar, Button } from 'reactstrap';
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

  render() {
    return (
      <div className="header-margin">
        <Button className="ButtonHeader" onClick={this.toggle}>
          <div className="ButtonHeader__devide">
            <div className="ButtonHeader__big">
              {this.props.buttonLabel}
              Login
            </div>

            <div className="ButtonHeader__small">
              <img src={LoginIcon} alt="LoginIcon" className="ButtonHeader__iconLogin" href="/home"/>
            </div>
          </div>
        </Button>
        <Modal isOpen={this.props.modalLogin} toggle={this.toggle} className="{this.props.className} Modalz" backdrop="static">
          <ModalHeader toggle={this.toggle} className="ModalTop"></ModalHeader>
          <Login />
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
