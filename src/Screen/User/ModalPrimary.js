import React, { Component } from 'react';
// import Modal from 'react-modal'
import axios from 'axios'
import { Modal } from 'reactstrap'
import ModalOtpUser from './ModalOtpUser'
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
    console.log(this.state.phone)
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/olduserotp`,
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
      console.log('Data create phone', data)
      if (data.data === 'ada no hp verified/primary'){
        this.setState({
          notif: 'No Hp Sudah Terverifikasi, Masukkan No Lain',
        })
      } else if ( data.data === 'phone created'){
        this.setState({
          notif: '',
          oldUserModal: true
        })
      }
    })
    .catch(err => console.log(err))
  }

  render() { 
    return (  
      <div>
        <Modal isOpen={this.props.open} className="modalPrimary__phone">
          <form className="modalPrimary__phone__content" onSubmit={(e) => this.submitOldUserPhone(e)}>
            <label><b>Masukan Nomor Hape:</b></label>
            <div className="modalPrimary__phone__content__form">
              <input name="numberToSend" required autoFocus type="text" maxLength={14} className="modalPrimary__phone__input" placeholder="Phone Number" value={this.state.phone} onChange={(e) => this.handleOldUserPhone(e)} />
            </div>
            <label className="modalPrimary__phone__alert">{this.state.notif}</label>

            <div className="modalPrimary__phone__content__buttonContainer">
              <button className="modalPrimary__phone__button" type="submit" color="primary">Setuju</button>
              <button className="modalPrimary__phone__button" type="button" color="danger" onClick={this.props.buttonToggle}>Batal</button>
            </div>
          </form>
        </Modal>
        <ModalOtpUser openOtpUser={this.state.oldUserModal} userEmail={this.props.emailUser} userPhone={this.state.phone}/>
      </div>
    )
  }
}

export default ModalPrimaryPhone;