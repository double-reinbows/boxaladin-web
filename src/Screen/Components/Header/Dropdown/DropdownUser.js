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
      dropdownOpen: false,
      text: 'Menu'
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeText = (text) => {
    this.setState({
      text: text
    })
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>


        <DropdownToggle className="ButtonHeader">
          <div className="ButtonHeader__devide">
            <div className="ButtonHeader__big">
              {this.state.text}
            </div>

            <div className="ButtonHeader__small" style= {{ backgroundColor: "transparent", borderLeftStyle: "solid", borderLeftWidth: "3px", borderColor: "#FFCD06"}}>
              <img src={ExpandIcon} alt="LoginIcon" className="ButtonHeader__iconLogin" href="/home"/>
            </div>
          </div>
        </DropdownToggle>

        <DropdownMenu className="DropdownUser__item">

            <DropdownItem  className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" onClick={(e) => this.changeText('Home')} to="/home">Home</Link>
            </DropdownItem>
          {/* <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" to="/pulsa">Pulsa</Link>
          </DropdownItem> */}

          {/* <a href="/me"> */}
          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" onClick={(e) => this.changeText('Profile')} to="/me">Profile Saya</Link>
          </DropdownItem>
          {/* </a> */}

          {/* <a href="/dompetaladin"> */}
          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" onClick={(e) => this.changeText('Dompet')} to="/dompetaladin">Dompet Aladin</Link>
          </DropdownItem>
          {/* </a> */}

          {/* <a href="/game"> */}
          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" onClick={(e) => this.changeText('Game')} to="/game">Ruang Game</Link>
          </DropdownItem>
          {/* </a> */}

          {/* <a href="/win"> */}
          <DropdownItem className="DropdownUser__inside">
            <Link className="DropdownUser__inside__link" onClick={(e) => this.changeText('Hasil Game')} to="/gameresult">Hasil Game</Link>
          </DropdownItem>
          {/* </a> */}

          {/* <a href="/tabsinvoice"> */}
            <DropdownItem className="DropdownUser__inside">
              <Link className="DropdownUser__inside__link" onClick={(e) => this.changeText('Invoice')} to="/tabsinvoice">Invoice</Link>
            </DropdownItem>
          {/* </a> */}

            <DropdownItem className="DropdownUser__inside">
              <Link className="DropdownUser__inside__link" onClick={(e) => this.changeText('FAQ')} to="/about">FAQ</Link>
            </DropdownItem>
          

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
