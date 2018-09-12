import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive';
import helperAxios from '../../utils/axios' 
import ListPhone from './ListPhone'
import ModalPrimary from './ModalPrimary'
import ModalChange from './ModalChange'
import ModalOtpUser from '../Components/Modal/OTP/ModalOtpInput'
import ModalOtpImage from '../Components/Modal/OTP/ModalOtpImage'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      modalPrimary: false,
      modalChange: false,
      modalOtp: false,
      modalOtpImage: false,
      phoneId: '',
      phone: '',
      missPhone: ''
    }
  }

  togglePrimary = () => {
    this.setState({
      modalPrimary: !this.state.modalPrimary
    })
  }

  toggleChange = (id) => {
    this.setState({
      modalChange: !this.state.modalChange,
      phoneId: id
    })
  }

  toggleOtp = () => {
    this.setState({
      modalOtp: !this.state.modalOtp
    })
  }

  showUser = () => {
    const {userInfo} = this.props
    const info = [
      {value: userInfo.aladinKeys, image:'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/key.png', alt:'Logo key'},
      {value: userInfo.coin, image:'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/coin.png', alt:'Logo coin'}
    ]
    return (
      <div className='user-dataUser'>
        <div className='user-dataUser-info'>
          <img className='user-dataUser-image' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/mail.png' alt='Logo Email'/>
          <label>{userInfo.typedEmail ? (userInfo.typedEmail) : ('Anda Tidak Memasukkan Email')}</label>
        </div>
        {info.map((data, index) => {
          return(
            <div className='user-dataUser-info' key={index}>
              <img className='user-dataUser-image' src={data.image} alt={data.alt}/>
              <label>{data.value}</label>
            </div>
          )
        })}
      </div>
    )
  }

  mobileShowUser = () => {
    const {userInfo} = this.props
    return (
      <div className='user-dataUser'>
        <div className='user-dataUser-info'>
          <img className='user-dataUser-image' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/mail.png' alt='Logo Email'/>
          <label>{userInfo.typedEmail ? (userInfo.typedEmail) : ('Anda Tidak Memasukkan Email')}</label>
        </div>
      </div>
    )
  }

  phone = () => {
    const {phonenumber} = this.props.userInfo
    if (!phonenumber){
      return null
    } else if (phonenumber.length === 0) {
      return (
        <div className='user-dataPhone'>
          <img className='user-dataUser-image' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/phone.png' alt="Logo Phone" />
          <button onClick={this.togglePrimary} className='baButton user-dataPhone-button-primary'>Tambah Nomor Primary</button>
        </div>
      )
    } else {
      return (
        <div className='user-dataPhone'>
          <img className='user-dataUser-image' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/phone.png' alt="Logo Phone" />
            {this.phonePrimary(phonenumber)}
        </div>
      )
    }
  }

  phonePrimary = (number) => {
    return number.filter(filter => {
      return filter.primary === true
    })
    .map((data, index) => {
      if (data.verified === true){
        return (
          <Fragment key={index}>
            <label>{data.number}</label>
            <label className='user-dataPhone-label-verified'>(Verified)</label>
          </Fragment>
        )
      } else {
        return (
          <Fragment key={index}>
            <label>{data.number}</label>
            <button onClick={() => this.sendVerification(data.number)} className='baButton user-dataPhone-button-verify'>Verify</button>
            <button onClick={() => this.toggleChange(data.id)} className='baButton user-dataPhone-button-verify'>Ubah</button>
          </Fragment>
        )
      }
    })
  }

  sendVerification = (phone) => {
    this.setState({
      modalOtpImage: true
    })
    helperAxios('POST', 'otp', {phonenumber : phone})
    .then(response => {
      this.setState({
        modalOtpImage: false,
        modalOtp: true,
        phone,
        missPhone: response.data
      })
    })
  }

  render() { 
    return ( 
      <div className='user-container baBackground'>
        <h1 className='user-container-title'>Profile Saya</h1>
        <MediaQuery query="(max-device-width: 720px)">
          {this.mobileShowUser()}
        </MediaQuery>
        <MediaQuery query="(min-device-width: 721px)">
          {this.showUser()}
        </MediaQuery>
        
        {this.phone()}
        <ListPhone/>
        <ModalPrimary isOpen={this.state.modalPrimary} toggle={this.togglePrimary} userId={this.props.userInfo.id}/>
        <ModalChange isOpen={this.state.modalChange} toggle={this.toggleChange} phoneId={this.state.phoneId}/>
        <ModalOtpUser isOpen={this.state.modalOtp} endpoint={'olduserverification'} phone={this.state.phone} missPhone={this.state.missPhone}/>
        <ModalOtpImage isOpen={this.state.modalOtpImage}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(User)

export default connectComponent