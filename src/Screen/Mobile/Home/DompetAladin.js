import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPhoneNumbers } from '../../../actions/'
import { getUser } from '../../../actions/userAction'

class Dompet extends Component {

  componentDidMount() {
    if (!this.props.userInfo.id && localStorage.getItem('token')) {
      this.props.getUser()
    }
  }

  render() {
    return (
      <div className="dompetHome__container">
        <div className="dompetHome__content">
          <div className="dompetHome__headContent">
            <label className="dompetHome__headContent__text">DOMPET ALADIN</label>
            <Link to="dompetaladin" className="dompetHome__headContent__plus">+</Link>
          </div>
        </div>
        <div className="dompetHome__bodyContent">
          <label>key: {this.props.userInfo.aladinKeys ?  this.props.userInfo.aladinKeys : null}</label>
          <label>coin: {this.props.userInfo.coin ? this.props.userInfo.coin : null}</label>
          <label>wallet: {this.props.userInfo.wallet ? this.props.userInfo.wallet.toLocaleString(['ban','id']) : null}</label>
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
    getUser: () => dispatch(getUser())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Dompet)

export default connectComponent
