import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  import {connect} from 'react-redux'

  import {logoutAction} from '../actions/'

  import {Link} from 'react-router-dom'

  import logo from '../asset/Logo/LogoBig.svg'

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
        <Navbar color="faded" light expand="md">
        <img
          src={logo}
          alt="logo"
          className="logo"
        />
          <NavbarToggler onClick={this.toggle} />
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
        <Nav navbar>
          <NavItem>
            <NavLink href="/product">PRODUCT</NavLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              USER
            </DropdownToggle>
            <DropdownMenu >
              <DropdownItem>
                User Profile
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Button color="danger" onClick={() => this.logout()}>
                  Logout
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      )
    } else {
      return (
        <Nav navbar>
          <NavItem>
            <NavLink href="/home">HOME</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/howitworks">HOW ITS WORKS</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contactus">CONTACT US</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/signup">NOT YET MEMBER</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">MEMBER'S AREA</NavLink>
          </NavItem>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(logoutAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default connectComponent
