import React from 'react';
import { Modal, ModalHeader, Button } from 'reactstrap';
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

  render() {
    return (
      <div className="header-margin">
        <Button className="ButtonHeader" onClick={this.toggle}>
          <div className="ButtonHeader__devide">
            <div className="ButtonHeader__big">
              {this.props.buttonLabel}
              Daftar
            </div>

            <div className="ButtonHeader__small">
              <img src={LoginIcon} alt="LoginIcon" className="ButtonHeader__iconLogin" href="/home"/>
            </div>
          </div>
        </Button>

        <Modal isOpen={this.props.modalRegister} toggle={this.toggle} className="{this.props.className} Modalz" backdrop="static">
          <ModalHeader toggle={this.toggle} className="ModalTop"></ModalHeader>
          <Signup />
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