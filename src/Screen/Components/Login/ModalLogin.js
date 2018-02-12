import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginIcon from '../../../asset/Login/login.svg'
import Login from '../../Login'

class ModalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    // this.props.modal = false;

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    console.log(this.state);
    console.log(this.props);
      return (
        <div>
          <Button className="ButtonLogin" onClick={this.toggle}>
            {this.props.buttonLabel}
            Login
            <hr className="dropdownLoginHr"/>
            <img src={LoginIcon} alt="LoginIcon" className="ButtonLogin__iconLogin" href="/home"/>
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <Login />
          </Modal>
        </div>
      );
    }
  }

export default ModalLogin;
