import React,{Component} from 'react';
import { Modal, ModalFooter} from 'reactstrap'
import helperAxios from '../../utils/axios'

class ModalOtpUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpUser: '',
      notifOtp: '',
      count: 5,
      time: 60,
      show: true,
      disabled: false,
    }
  }
  handleOtpUser = (e) => {
    this.setState({
      otpUser: e.target.value
    })
  }

  sendOtp = (e) => {
    e.preventDefault()

    if (this.state.otpUser === '') {
      this.setState({
        notifOtp: 'OTP Tidak Boleh Kosong'
      })
    } else {
      helperAxios('POST', 'olduserverification', {phonenumber: this.props.phone, otp : parseInt(this.state.otpUser, 10)})
      .then(response => {
        console.log('response', response)
        if (response.data.message === 'Phone Terverifikasi') {
          alert('No Hp Pernah Diverifikasi')
        }	else if ( response.data.message === 'incorrect otp') {
          this.setState({
            notifOtp: "OTP Salah"
          })
        } else if ( response.data.message === 'phone verified'){
          window.location.reload();
        }
      })
      .catch(err => console.log(err))
      }
  }

  resendOtp = () => {
    this.setState({
      count : this.state.count - 1,
    })
    if (this.state.count > 0 ){
      helperAxios('POST', 'otp', {phonenumber: this.props.phone})
      .then(response => {
        if (response.data === 'error'){
          alert("Terjadi Kesalahan di Sistem Kami, Silahkan Hubungi Customer Service Untuk Menverifikasi No Anda")
          this.setState({
            show: 'hidden'
          })
          window.location.reload();
        } else if (response.data === 'retry'){
          this.setState({
            notifOtp: 'otp Tidak Terkirim, Silahkan Kirim Ulang'
          })
        }
      })
    }
    this.timer = setInterval(() => {
      this.setState({
        time: this.state.time - 1,
        disabled: true,
        notifCount: `${this.state.count} OTP Sisa Yang Dapat Dikirim`
      })

      if(this.state.time <= 0) {
        clearInterval(this.timer);
        this.setState({
          time: 60,
          disabled: false
        })
      }
    }, 1000)
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} className="modalOtpUser">
        <form onSubmit={this.sendOtp}>
          <div className="modalOtpUser__container">
          <div className="modal__check__container__header">
            <button className="modal__check__button" onClick={this.props.toggle}>X</button>
          </div>
            <div>
              <label className="modalOtpUser__label">Anda Akan di Missed Call Oleh Sistem Kami</label>
              <label className="modalOtpUser__label">Masukkan 4 Angka Terakhir Dari no yang Menelpon Anda</label>
            </div>
            <input type="text" maxLength={4} className="modalOtpUser__input" placeholder="OTP" value={this.state.otpUser} onChange={this.handleOtpUser} />
            <div>
              <div>
                <label className="alert__user">{this.state.notifOtp}</label>
              </div>
              <div>
                <label className="modalPrimary__phone__alert">{this.state.notifCount}</label>
              </div>
            </div>
            <div>
              <button className='baButton user-dataPhone-button-verify' color="primary" type="submit" >Submit</button>
            </div>
            <ModalFooter>
              <button style ={{visibility:this.state.show}} disabled={this.state.disabled} onClick={this.resendOtp} className="modal-body__otp__resend">Kirim Ulang OTP</button>
            </ModalFooter>
          </div>
        </form>
      </Modal>
    )
  }
}

export default ModalOtpUser
