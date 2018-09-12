import React, { Component } from 'react';
// import Modal from 'react-modal'
import axios from 'axios'
import { Modal } from 'reactstrap'
import envChecker from '../../utils/envChecker'
import ModalOtpUser from '../Components/Modal/OTP/ModalOtpInput'
import ModalOtpImage from '../Components/Modal/OTP/ModalOtpImage'
class ModalPrimaryPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone:'',
      modalOtp: false,
      missPhone: '',
      modalOtpImage: false
    }
  }

  handleOldUserPhone = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  submitOldUserPhone = (e) => {
    this.props.toggle()
    this.setState({
      modalOtpImage: !this.state.modalOtpImage
    })
    e.preventDefault()
    let num = this.state.phone.split('')
    if (num[0] === '0') {
      num.splice(0, 1, '0')
      this.setState({
        phone: num.join('')
      })
    } else if (num[0] + num[1] + num[2] === '+62') {
      num.splice(0, 3, '0')
      this.setState({
        phone: num.join('')
      })
    } else if (num[0] + num[1] === '62') {
      num.splice(0, 2, '0')
      this.setState({
        phone: num.join('')
      })
    } else if (num[0] === '8') {
      num.splice(0, 0, '0')
      this.setState({
        phone: num.join('')
      })
    }
    axios({
      method: 'POST',
      url: `${envChecker('api')}/olduserotp`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        phonenumber: this.state.phone,
      }
    })
    .then(response => {
      if (response.data === 'ada no hp verified/primary'){
        this.setState({
          modalOtpImage: false
        })
        alert('Maaf tapi nomor ini sudah terdaftar dengan akun orang lain. Silakan hubungi Customer Service di LINE @boxaladin')
      } else {
        this.setState({
          modalOtpImage: false,
          modalOtp: true,
          notif: '',
          missPhone: response.data
        })
      }
    })
    .catch(err => console.log(err))
  }

  closeModal = () => {
    this.setState({
      phone: ''
    },
    () => this.props.toggle()
    )
  }

  render() {
    console.log(this.state.phone)
    return (
      <div>
        <Modal isOpen={this.props.isOpen} className="modalPrimary__phone">
          <form className="modalPrimary__phone__content" onSubmit={this.submitOldUserPhone}>
            <div className="modal__check__container__header">
              <button className="modal__check__button" onClick={this.closeModal}>X</button>
            </div>
            <label><b>Masukan Nomor Hape:</b></label>
            <div className="modalPrimary__phone__content__form">
              <input name="numberToSend" required autoFocus type="number" maxLength={14} className="modalPrimary__phone__input" placeholder="Phone Number" onChange={this.handleOldUserPhone}/>
            </div>
            <label className="modalPrimary__phone__alert">{this.state.notif}</label>
            <div className="modalPrimary__phone__content__buttonContainer">
              <button className="modalPrimary__phone__button" type="submit" color="primary">Setuju</button>
              <button className="modalPrimary__phone__button" type="button" color="danger" onClick={this.closeModal}>Batal</button>
            </div>
          </form>
        </Modal>
        <ModalOtpUser isOpen={this.state.modalOtp} endpoint={'olduserverification'} phone={this.state.phone} missPhone={this.state.missPhone}/>
        <ModalOtpImage isOpen={this.state.modalOtpImage}/>
      </div>
    )
  }
}

export default ModalPrimaryPhone;
