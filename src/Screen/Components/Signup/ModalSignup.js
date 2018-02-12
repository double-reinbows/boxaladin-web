import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginIcon from '../../../asset/Login/login.svg'
import Signup from '../../Signup'


class ModalSignup extends React.Component {
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
        <Button className="ButtonLogin" onClick={this.toggle}>
          {this.props.buttonLabel}
          Signup
          <hr className="dropdownLoginHr"/>
          <img src={LoginIcon} alt="LoginIcon" className="ButtonLogin__iconLogin" href="/home"/>
        </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Signup</ModalHeader>
            <Signup />
          </Modal>
        </div>
      );
    }
  }

export default ModalSignup;
