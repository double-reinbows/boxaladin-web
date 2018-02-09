import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'

import ExpandIcon from '../../../../asset/Login/expand.svg'

import {connect} from 'react-redux'

import {logoutAction} from '../../../../actions/'

class DropdownUser extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>

        <DropdownToggle className="ButtonLogin">
          Profile
          <hr/>
          <img src={ExpandIcon} alt="LoginIcon" className="ButtonLogin__icon2" href="/home"/>
        </DropdownToggle>

        <DropdownMenu className="DropdownUser__item">

          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/me">User Profile</Link>
          </DropdownItem>

          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/invoice">Invoice</Link>
          </DropdownItem>

          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/invoice">Aladinkey: </Link>
          </DropdownItem>

          <DropdownItem divider />

          <DropdownItem className="DropdownUser__inside__link" onClick={() => this.logout()}>
            Logout
          </DropdownItem>

        </DropdownMenu>
      </Dropdown>
    );
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(DropdownUser)

export default connectComponent
