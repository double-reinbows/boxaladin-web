import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import Moment from 'moment'
import helperAxios from '../../../utils/axios' 
import ModalPrimary from '../../User/ModalPrimary'
import ModalChange from '../../User/ModalChange'
import ModalOtpUser from '../../Components/Modal/OTP/ModalOtpInput'
import ModalOtpImage from '../../Components/Modal/OTP/ModalOtpImage'
import FormatRupiah from '../../../utils/formatRupiah'

class MobileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      modalPrimary: false,
      modalChange: false,
      modalOtp: false,
      modalOtpImage: false,
      phoneTransaction: 0,
      successTransaction: 0
    }
  }

  componentDidMount() {
    this.getCount()
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

  mobileShowUser = () => {
    const {userInfo} = this.props
    const info = [
      {value: userInfo.aladinKeys, image:'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/key.png', alt:'Logo key'},
      {value: userInfo.coin, image:'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/koin-v2.png', alt:'Logo coin'},
    ]
    return (
      <div className='mobileUser-dataUser'>
        <div className='mobileUser-dataUser-title'>
          {/* <h2 className='mobileUser-dataUser-title-header'>{this.checkTitle().toUpperCase()}</h2> */}
          {/* <button className='mobileUser-dataUser-title-button baButton'><Link style={{color:'white', padding:'2px'}} to="/reward">Lihat Hadiah</Link></button> */}
        </div>
        <div className='mobileUser-dataUser-info'>
          <img className='mobileUser-dataUser-image' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/mail.png' alt='Logo Email'/>
          <label>{this.showEmail()}</label>
          {this.checkEmailVerified()}
        </div>
        {this.phone()}
        {info.map((data, index) => {
          return(
            <div className='mobileUser-dataUser-info' key={index}>
              <img className='mobileUser-dataUser-image' src={data.image} alt={data.alt}/>
              <label>{data.value}</label>
            </div>
          )
        })}
        <div className='mobileUser-dataUser-info'>
          <img className='mobileUser-dataUser-image' src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/uang.png" alt='Logo wallet'/>
          <label>{userInfo.wallet === undefined ? null : (FormatRupiah(userInfo.wallet))}</label>
        </div>
      </div>
    )
  }

  showEmail = () => {
    const {typedEmail, email} = this.props.userInfo
    if (typedEmail) {
      return typedEmail
    } else if (email) {
      return email
    } else {
      return "Anda Tidak Memasukkan Email"
    }
  }
  
  checkEmailVerified = () => {
    if (this.props.userInfo.emailVerified === true){
      return (
        <img className='baButton mobileUser-dataPhone-primary-icon' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/mobile+checklist.png' alt='checklist icon'/>
      )
    }
  }

  showUserIcon = () => {
    return (
      <img className='mobileUser-dataUser-image-profile' src={`https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/${this.checkTitle()}.png`} alt="Icon User"/>
    ) 
  }

  checkTitle = () => {
    const {phoneTransaction, successTransaction} = this.state
    if (phoneTransaction >= 200 && successTransaction >= 1200) {
      return 'zeus'
    } else if (phoneTransaction >= 150 && successTransaction >= 900) {
      return 'viking'
    } else if (phoneTransaction >= 100 && successTransaction >= 600) {
      return 'warrior'
    } else if (phoneTransaction >= 50 && successTransaction >= 300) {
      return 'zombie'
    } else {
      return 'orok'
    }
  }

  checkWin = () => {
    const title = this.checkTitle()
    if (title === 'orok'){
      return (
        <h3 style={{textAlign:'center'}}>Maaf Transaksi Anda Tidak Mencukupi Syarat Memenangkan Hadiah Boxaladin</h3>
      )
    } else {
      return (
        <div style={{fontSize: '13px', width:'85%'}}>
          <h3>Selamat!</h3>
          <h3>Anda Berhasil memenuhi Syarat Kami Untuk Mendapatkan Hadiah</h3>
          <label>Silahkan Screenshoot Halaman ini dan Hubungi Kami melalui</label>
          <li>WhatsApp: +62-877-8697-2843</li>
          <li>LINE: @boxaladin</li>
        </div>
      )
    }
  }

  showSuccessTransaction = () => {
    return(
      <div className="mobileUser-succes-transaction">
        <img className="mobileUser-succes-transaction-icon" src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/succes+transaction.png" alt="Icon Success"/>
        <h1><b>{this.state.successTransaction}</b></h1>
        <label>kali</label>
        <br/>
        <label>Jumlah Transaksi</label>
      </div>
    )
  }

  showPhoneTransaction = () => {
    return(
      <div className="mobileUser-phone-transaction">
        <img className="mobileUser-phone-transaction-icon" src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/phone+transaction.png" alt="Icon Phone"/>
        <h1><b>{this.state.phoneTransaction}</b></h1>
        <label>Nomor Handphone</label>
        <br/>
        <label>Jumlah Nomor Handphone</label>
      </div>
    )
  }

  phone = () => {
    const {phonenumber} = this.props.userInfo
    if (!phonenumber){
      return null
    } else if (phonenumber.length === 0) {
      return (
        <div className='mobileUser-dataUser-info'>
          <img className='mobileUser-dataUser-image' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/phone.png' alt="Logo Phone" />
          <button onClick={this.togglePrimary} className='baButton user-dataPhone-button-primary'>Tambah Nomor Primary</button>
        </div>
      )
    } else if (phonenumber[0].primary !== true) { 
      return (
        <div className='mobileUser-dataUser-info'>
          <img className='mobileUser-dataUser-image' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/phone.png' alt="Logo Phone" />
          <label>{phonenumber[0].number}</label>
        </div>
      )
    } else {
      return (
        <div className='mobileUser-dataUser-info'>
          <img className='mobileUser-dataUser-image' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/phone.png' alt="Logo Phone" />
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
            <img className='baButton mobileUser-dataPhone-primary-icon' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/mobile+checklist.png' alt='checklist icon'/>
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

  getCount = () => {
    const now = ((Moment().month()) + 1).toString()
    helperAxios('GET', 'countphonetransactions')
    .then(response => {
      if (response.data[0].to_char !== now) {
        return console.log('')
      } else {
        this.setState({
          phoneTransaction: response.data[0].count
        })
      }
    })
    .catch(err => console.log(err))

    helperAxios('GET', 'countsuccesstransactions')
    .then(response => {
      if (response.data.to_char !== now) {
        return console.log('')
      } else {
        this.setState({
          successTransaction: response.data.count
        })
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <Fragment>
        <div className="mobileUser-container">
          {/* {this.showUserIcon()} */}
          {this.mobileShowUser()}
        </div>
        <div className="mobileUser-transaction-content">
          {this.showSuccessTransaction()}
          {this.showPhoneTransaction()}
          {/* {this.checkWin()} */}
        </div>
        <ModalPrimary isOpen={this.state.modalPrimary} toggle={this.togglePrimary} userId={this.props.userInfo.id}/>
        <ModalChange isOpen={this.state.modalChange} toggle={this.toggleChange} phoneId={this.state.phoneId}/>
        <ModalOtpUser isOpen={this.state.modalOtp} endpoint={'olduserverification'} phone={this.state.phone} missPhone={this.state.missPhone}/>
        <ModalOtpImage isOpen={this.state.modalOtpImage}/>
      </Fragment>
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(MobileUser)

export default connectComponent
