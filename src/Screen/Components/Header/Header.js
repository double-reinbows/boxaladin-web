import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

import {connect} from 'react-redux'

import {logoutAction} from '../../../actions'

import logo from '../../../asset/Logo/LogoBig.svg'
import DropdownUser from './Dropdown/DropdownUser'

import ModalLogin from './Login/ModalLogin'
import ModalSignup from './Signup/ModalSignup'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar light expand="md" className="HeaderTop">
          <a href="/home">
            <img src={logo} alt="logo" className="BoxAladinLogo-Big" href="/home"/>
          </a>

          <NavbarToggler onClick={this.toggle} className="IconBurger"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            </Nav>
            {this.showRightButton()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
  showRightButton() {
    if (localStorage.getItem('token') !== null) {
      return (
        <Nav navbar className="HeaderTop__Right">

          <NavItem>
            <button className="ButtonTopUP">
              <label className="ButtonTopUP__label">Top Up  </label>{' '}
              <label className="ButtonTopUP__label__italic">Aladinkey!</label>
            </button>
          </NavItem>

          <NavItem>
            <DropdownUser />
          </NavItem>

        </Nav>
      )
    } else {
      return (
        <Nav navbar className="HeaderTop__Right">

            <ModalLogin />
            <ModalSignup />

        </Nav>
      )
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.props.logoutAction()
  }

}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin
    // dataUser: state.userReducer.dataUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(logoutAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default connectComponent
