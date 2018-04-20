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

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>


        <DropdownToggle className="ButtonHeader">
          <div className="ButtonHeader__devide">
            <div className="ButtonHeader__big">
              Profil
            </div>

            <div className="ButtonHeader__small">
              <img src={ExpandIcon} alt="LoginIcon" className="ButtonHeader__iconLogin" href="/home"/>
            </div>
          </div>
        </DropdownToggle>

        <DropdownMenu className="DropdownUser__item">

            <DropdownItem  className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/home">Home</Link>
            </DropdownItem>
          {/* <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/pulsa">Pulsa</Link>
          </DropdownItem> */}
          <a href="/me">
          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/me">Profile Saya</Link>
          </DropdownItem>
          </a>

          <a href="/dompetaladin">
          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/dompetaladin">Dompet Aladin</Link>
          </DropdownItem>
          </a>

          <a href="/game">
          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/game">Ruang Game</Link>
          </DropdownItem>
          </a>

          <a href="/win">
          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/gameresult">Hasil Game</Link>
          </DropdownItem>
          </a>

          <a href="/invoice">
            <DropdownItem className="DropdownUser__inside">
              <Link className="DropdownUser__inside__link" to="/invoice">Invoice</Link>
            </DropdownItem>
          </a>

          <a href="/topupinvoice">
            <DropdownItem className="DropdownUser__inside">
              <Link className="DropdownUser__inside__link" to="/topupinvoice">Topup-Invoice</Link>
            </DropdownItem>
          </a>

          {/* <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/claimreward">Claim Reward</Link>
          </DropdownItem> */}

          <DropdownItem divider />

          <DropdownItem className="DropdownUser__inside" onClick={() => this.logout()}>
            Keluar
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
