import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {logoutAction} from '../../../actions'

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
          <Link onClick={e=>this.setState({_isResetText: true})} to="/home" className="logoHeader">
            <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Logo/LogoBig.svg' alt="logo" className="BoxAladinLogo-Big" href="/home"/>
          </Link>

          <NavbarToggler onClick={this.toggle} className="IconBurger"/>
          <Collapse isOpen={this.state.isOpen} navbar className="HeaderTopz">
            <Nav className="ml-auto" navbar>
            </Nav>
            {this.showRightButton()}
          </Collapse>
        </Navbar>

        <Navbar light expand="md" className="HeaderTopM">


          <Link onClick={e=>this.setState({_isResetText: true})} to="/home" className="HeaderTopM__logo">
            <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Logo/LogoBig.svg' alt="logo" className="BoxAladinLogo-Big" href="/home" />
          </Link>
            {this.showRightButton()}
        </Navbar>

      </div>
    );
  }
  showRightButton() {
    if (localStorage.getItem('token') !== null) {
      return (
        <Nav navbar className="HeaderTop__Right" style={{  width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <NavItem>
            <DropdownUser isResetText={this.state._isResetText} onResetCalback={()=>this.setState({_isResetText: false})}/>
          </NavItem>

        </Nav>
      )
    } else {
      return (
        <Nav navbar className="HeaderTop__Right" >
            <ModalLogin />
            <ModalSignup />
        </Nav>
      )
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.props.logoutAction()
    window.location.reload()
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
