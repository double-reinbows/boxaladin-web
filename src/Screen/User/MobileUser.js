import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import helperAxios from '../../utils/axios' 

class MobileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      phoneTransaction: 0,
      succesTransaction: 0
    }
  }

  componentDidMount() {
    this.getCount()
  }

  mobileShowUser = () => {
    const {userInfo} = this.props
    const info = [
      {value: userInfo.aladinKeys, image:'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/key.png', alt:'Logo key'},
      {value: userInfo.wallet, image:'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/uang.png', alt:'Logo wallet'},
      {value: userInfo.coin, image:'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/coin.png', alt:'Logo coin'}
    ]
    return (
      <div className='mobileUser-dataUser'>
        <div>
          <img className='mobileUser-dataUser-image-profile' src="https://vignette.wikia.nocookie.net/tumblr-survivor-athena/images/7/7a/Blank_Avatar.png/revision/latest?cb=20161204161729" alt="Icon User"/>
        </div>
        <div className='mobileUser-dataUser-info'>
          <img className='mobileUser-dataUser-image' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/mail.png' alt='Logo Email'/>
          <label>{userInfo.typedEmail ? (userInfo.typedEmail) : ('Anda Tidak Memasukkan Email')}</label>
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

  getCount = () => {
    helperAxios('GET', 'countphonetransactions')
    .then(response => {
      this.setState({
        phoneTransaction: response.data.count
      })
    })
    .catch(err => console.log(err))

    helperAxios('GET', 'countsuccesstransactions')
    .then(response => {
      this.setState({
        succesTransaction: response.data.response
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="mobileUser-container">
        {this.mobileShowUser()}
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(MobileUser)

export default connectComponent
