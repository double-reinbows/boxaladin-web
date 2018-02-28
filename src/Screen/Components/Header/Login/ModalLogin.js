import React from 'react';

import { Modal, ModalHeader, Navbar, Button } from 'reactstrap';
import { connect } from 'react-redux'

import LoginIcon from '../../../../asset/Login/login.svg'
import Login from './Login'

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
