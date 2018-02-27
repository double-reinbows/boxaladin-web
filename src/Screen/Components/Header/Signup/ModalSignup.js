import React from 'react';
import { Modal, ModalHeader, Navbar } from 'reactstrap';
import LoginIcon from '../../../../asset/Login/login.svg'
import Signup from './Signup'

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
        <div className="header-margin">
          <Navbar className="ButtonLoginz" onClick={this.toggle}>
            <div className="ButtonLoginz__devide">
              <div className="ButtonLoginz__big">
                {this.props.buttonLabel}
                Signup
              </div>

              <div className="ButtonLoginz__small">
                <img src={LoginIcon} alt="LoginIcon" className="ButtonLoginz__iconLogin" href="/home"/>
              </div>
            </div>
          </Navbar>

          <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} Modalz" backdrop="static">
            <ModalHeader toggle={this.toggle} className="ModalTop"></ModalHeader>
            <Signup />
          </Modal>
        </div>
      );
    }
  }

export default ModalSignup;
