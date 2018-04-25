import React, { Component } from 'react';
// import Modal from 'react-modal'
import axios from 'axios'
import { Button, Modal } from 'reactstrap'

class ModalPrimaryPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      phone:''
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
      url: `${process.env.REACT_APP_API_HOST}/olduserotp`,
      data: {
        phonenumber: this.state.phone
      },
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then((data) => {
      console.log('Data create phone', data)
      console.log(this.state.phone)
      if (data.data === 'ada no hp verified/primary'){
        this.setState({
          notif: 'No Hp Sudah Terverifikasi, Masukkan No Lain'
        })
      } else {
        console.log('otp sent')
      }
    })
    .catch(err => console.log(err))
  }

  render() { 
    console.log(this.state)
    return (  
      <Modal isOpen={this.props.open} className="modalPrimary__phone">
        <form className="modalPrimary__phone__content" onSubmit={(e) => this.submitOldUserPhone(e)}>
          <div className="modalPrimary__phone__content__form">
            <input name="numberToSend" required autoFocus type="text" maxLength={14} className="modalPrimary__phone__input" placeholder="Phone Number" value={this.state.phone} onChange={(e) => this.handleOldUserPhone(e)} />
          </div>
          <label className="modalPrimary__phone__alert">{this.state.notif}</label>

          <div className="modalPrimary__phone__content__buttonContainer">
            <Button className="modalPrimary__phone__button" type="button" color="danger" onClick={() => this.props.buttongToggle()}>Batal</Button>
            <Button className="modalPrimary__phone__button" type="submit" color="primary">Setuju</Button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default ModalPrimaryPhone;