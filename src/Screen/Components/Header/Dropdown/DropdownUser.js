import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom'

import ExpandIcon from '../../../../asset/Login/expand.svg'

import {connect} from 'react-redux'

import {logoutAction} from '../../../../actions/'
import { getUser } from '../../../../actions/userAction'

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
    console.log('State DropDown:', this.state)
    console.log('Props DropDown:', this.props)

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>


        <DropdownToggle className="ButtonHeader">
          <div className="ButtonHeader__devide">
            <div className="ButtonHeader__big">
              Profile
            </div>

            <div className="ButtonHeader__small">
              <img src={ExpandIcon} alt="LoginIcon" className="ButtonHeader__iconLogin" href="/home"/>
            </div>
          </div>
        </DropdownToggle>

        <DropdownMenu className="DropdownUser__item">

          <DropdownItem disabled="true" className="DropdownUser__inside">
            Hi, Sobat
          </DropdownItem>

          {/* <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/pulsa">Pulsa</Link>
          </DropdownItem> */}

          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/me">User Profile</Link>
          </DropdownItem>

          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/invoice">Invoice</Link>
          </DropdownItem>

          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/topupinvoice">Topup-Invoice</Link>
          </DropdownItem>

          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/dompetaladin">Dompet Aladin</Link>
          </DropdownItem>

          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/game">Play Game</Link>
          </DropdownItem>

          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/win">Game Result</Link>
          </DropdownItem>

          {/* <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/claimreward">Claim Reward</Link>
          </DropdownItem> */}

          <DropdownItem divider />

          <DropdownItem className="DropdownUser__inside" onClick={() => this.logout()}>
            Logout
          </DropdownItem>

        </DropdownMenu>
      </Dropdown>
    );
  }

  componentDidMount() {
    this.props.getUser()
  }

  logout() {
    localStorage.removeItem('token')
    this.props.logoutAction()
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    userInfo: state.userReducer.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(logoutAction()),
    getUser: () => dispatch(getUser())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(DropdownUser)

export default connectComponent
