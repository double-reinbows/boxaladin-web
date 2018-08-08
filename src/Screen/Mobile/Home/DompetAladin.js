//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
// import { getUser } from '../../../actions/userAction'

type Props = {
  // getUser: Function,
  userInfo: object
}
class Dompet extends Component <Props> {

  // componentDidMount() {
  //   if (!this.props.userInfo.id && localStorage.getItem('token')) {
  //     this.props.getUser()
  //   }
  // }

  render() {
    return (
      <div className="dompetHome__container">
        <div className="dompetHome__content">
          <div className="dompetHome__headContent">
            <div>
            <label className="dompetHome__headContent__text">DOMPET ALADIN</label>
              <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/wallet.svg' className="dompetHome__headContent__logo" alt="Logo Wallet"/>
            </div>
            <Link to="/dompetaladin" className="dompetHome__headContent__plus">+</Link>
          </div>
        </div>
        <div className="dompetHome__bodyContent">
          <div className="dompetHome__bodyContent__container">
            <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/Key.png' className="dompetHome__bodyContent__logo" alt="Logo Kunci"/>
            <label>: {this.props.userInfo.aladinKeys ?  this.props.userInfo.aladinKeys : 0}</label>
          </div>
          <div className="dompetHome__bodyContent__container">
            <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/koin-v2.png' className="dompetHome__bodyContent__logo" alt="Logo Koin"/>
            <label>: {this.props.userInfo.coin ? this.props.userInfo.coin : 0}</label>
          </div>
          <div className="dompetHome__bodyContent__container">
            <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/uang.png' className="dompetHome__bodyContent__logo" alt="Logo Uang"/>
            <label>: {this.props.userInfo.wallet ? this.props.userInfo.wallet.toLocaleString(['ban','id']) : 0}</label>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getUser: () => dispatch(getUser())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Dompet)

export default connectComponent
