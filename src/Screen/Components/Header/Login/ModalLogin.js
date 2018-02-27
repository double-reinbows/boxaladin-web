import React from 'react';

import { Modal, ModalHeader, Navbar } from 'reactstrap';
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
        <div>
          <Navbar className="ButtonLoginz" onClick={this.toggle}>
            <div className="ButtonLoginz__devide">
              <div className="ButtonLoginz__big">
                {this.props.buttonLabel}
                Login
              </div>

              <div className="ButtonLoginz__small">
                <img src={LoginIcon} alt="LoginIcon" className="ButtonLoginSignup__iconLogin" href="/home"/>
              </div>
            </div>
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
