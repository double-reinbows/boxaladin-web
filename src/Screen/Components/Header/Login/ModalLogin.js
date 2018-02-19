import React from 'react';
<<<<<<< HEAD:src/Screen/Components/Header/Login/ModalLogin.js
import { Modal, ModalHeader, Navbar } from 'reactstrap';
import LoginIcon from '../../../../asset/Login/login.svg'
import Login from './Login'
=======
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'

import LoginIcon from '../../../asset/Login/login.svg'
import Login from '../../Login'
import { loginAction } from '../../../actions/'
>>>>>>> f7859a280404f83ccb707aca6dbc259771114b77:src/Screen/Components/Login/ModalLogin.js

class ModalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
      return (
        <div>
          <Navbar className="ButtonLoginSignup" onClick={this.toggle}>
            {this.props.buttonLabel}
            Login
            <hr className="dropdownLoginHr"/>
            <img src={LoginIcon} alt="LoginIcon" className="ButtonLoginSignup__iconLogin" href="/home"/>
          </Navbar>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} Modalz" backdrop="static">
            <ModalHeader toggle={this.toggle} className="ModalTop"></ModalHeader>
            <Login />
          </Modal>
        </div>
      );
    }
  }

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalLogin)

export default connectComponent
