import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'reactstrap'

import envChecker from '../../utils/envChecker'

class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.submitPhone = this.submitPhone.bind(this)
    this.state = {
      phonenumber: '',
      notif: ''
    }
  }

	submitPhone(e){
    e.preventDefault()
    if (this.state.phonenumber.length < 10){
      return this.setState({
        notif: 'Format No Hp Salah'
      })
    }
		axios({
			method: 'POST',
			url: `${envChecker('api')}/phonenumber`,
			data: {
				phonenumber: this.state.phonenumber
			},
			headers: {
				token: localStorage.getItem('token'),
			}
		})
		.then(response => {
			if (response.data.message === 'data added') {
        window.location.reload();
			} else if (response.data === 'duplicate number') {
				this.setState({
					notif: 'No Hp Sudah Ada',
				})
			}
		})
		.catch(err => console.log(err))
  }

  handleChangeNumber = (e) => {
    this.setState({
      phonenumber: e.target.value
    })
  }

  render() {
    return (
		<Modal isOpen={this.props.isOpen} className="modal__check">
    <div className="modal__check__container">
        <div className="modal__check__delete__content">
          <label className="modal__check__delete__label"><b>Masukan Nomor Hape:</b></label>
        </div>
        <div className="modal__check__add">
          <input name="numberToSend" maxLength={14} className="modal__check__add__input" placeholder="Phone Number" onChange={this.handleChangeNumber} />
        </div>
        <label className="alert__user">{this.state.notif}</label>
        <div className="modal__check__delete">
          <button className="modal__check__delete__button" onClick={(e) => this.submitPhone(e)} color="primary">Setuju</button>
          <button className="modal__check__delete__button" onClick={this.props.toggle}>Batal</button>
        </div>
    </div>
		</Modal>
    )
  }
}

export default ModalAdd
