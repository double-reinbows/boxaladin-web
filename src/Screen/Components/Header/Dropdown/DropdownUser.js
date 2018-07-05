import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
              <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Login/expand.svg' alt="LoginIcon" className="ButtonHeader__iconLogin" href="/home"/>
            </div>
          </div>
        </DropdownToggle>

        <DropdownMenu className="DropdownUser__item">

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Home')} to="/home">
            <DropdownItem  className="DropdownUser__inside">
              Home
            </DropdownItem>
          </LinkContainer>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Profile')} to="/me">
            <DropdownItem className="DropdownUser__inside">
              Profile
            </DropdownItem>
          </LinkContainer>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Dompet')} to="/dompetaladin">
            <DropdownItem className="DropdownUser__inside">
              Dompet Aladin
            </DropdownItem>
          </LinkContainer>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Game')} to="/game">
            <DropdownItem className="DropdownUser__inside">
              Ruang Game
            </DropdownItem>
          </LinkContainer>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Hasil Game')} to="/gameresult">
            <DropdownItem className="DropdownUser__inside">
              Hasil Game
            </DropdownItem>
          </LinkContainer>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('Invoice')} to="/tabsinvoice">
            <DropdownItem className="DropdownUser__inside">
              Invoice
            </DropdownItem>
          </LinkContainer>

          <LinkContainer className="DropdownUser__inside__link" onClick={(e) => this.changeText('FAQ')} to="/about">
            <DropdownItem className="DropdownUser__inside">
              FAQ
            </DropdownItem>
          </LinkContainer>

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
