import React, { Component } from 'react';
// import Modal from 'react-modal'
import axios from 'axios'
import { Modal } from 'reactstrap'
import ModalOtpUser from './ModalOtpUser'
import envChecker from '../../utils/envChecker'

class ModalPrimaryPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone:'',
      oldUserModal: false
    }
  }

  handleOldUserPhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  submitOldUserPhone(e){
    e.preventDefault()

    var num = this.state.phone.split('')
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
        key: process.env.REACT_APP_KEY,
        token: localStorage.getItem('token')
      },
      data: {
        phonenumber: this.state.phone,
        email: this.props.emailUser
      }
    })
    .then((data) => {
      if (data.data === 'ada no hp verified/primary'){
        this.setState({
          notif: 'Maaf tapi nomor ini sudah terdaftar dengan akun orang lain. Silakan hubungi Customer Service di LINE @boxaladin',
        })
      } else if ( data.data === 'phone created'){
        this.setState({
          notif: '',
          oldUserModal: true
        })
      } else {
        this.setState({
          notif: 'Nomor yang di input wajib sama dengan nomor primary yang sudah terdaftar.',
        })
      }
    })
    .catch(err => console.log(err))
  }

  closeModal = () => {
    this.setState({
      phone: ''
    },
    () => this.props.buttonToggle()
    )
  }

  closeOtpModal = () => {
    this.setState({
      oldUserModal: !this.state.oldUserModal
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.open} className="modalPrimary__phone">
          <form className="modalPrimary__phone__content" onSubmit={(e) => this.submitOldUserPhone(e)}>
            <div className="modal__check__container__header">
              <button className="modal__check__button" onClick={this.props.buttonToggle}>X</button>
            </div>
            <label><b>Masukan Nomor Hape:</b></label>
            <div className="modalPrimary__phone__content__form">
              <input name="numberToSend" required autoFocus type="text" maxLength={14} className="modalPrimary__phone__input" placeholder="Phone Number" value={this.state.phone} onChange={(e) => this.handleOldUserPhone(e)} />
            </div>
            <label className="modalPrimary__phone__alert">{this.state.notif}</label>
            <div className="modalPrimary__phone__content__buttonContainer">
              <button className="modalPrimary__phone__button" type="submit" color="primary">Setuju</button>
              <button className="modalPrimary__phone__button" type="button" color="danger" onClick={this.closeModal}>Batal</button>
            </div>
          </form>
        </Modal>
        <ModalOtpUser buttonToggle={this.closeOtpModal} openOtpUser={this.state.oldUserModal} userEmail={this.props.emailUser} userPhone={this.state.phone}/>
      </div>
    )
  }
}

export default ModalPrimaryPhone;
