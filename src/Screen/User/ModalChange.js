import React, { Component } from 'react';
import { Modal } from 'reactstrap'
import helperAxios from '../../utils/axios';
// import helperAxios from '../../utils/axios' 

class ModalChange extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      phone: '',
      notif: ''
    }
  }

  submitChangePhone = (e) => {
    e.preventDefault()
    helperAxios('PUT', (`phone/${this.props.phoneId}`), {phonenumber: this.state.phone})
		.then(response => {
			if (response.data.message === 'data changed') {
				window.location.reload();
			} else if (response.data.message === 'duplicate number') {
				this.setState({
					notif: 'Nomor Sudah Terdaftar',
					changePhoneModal: false,
				})
			} else if (response.data.message === 'Someone else has taken this number') {
				this.setState({
					notif: 'Nomor Sudah Di Pakai Akun Lain',
					changePhoneModal: false,
				})
			}
		})
		.catch(err => console.log(err))
  }
  
  handleChangPhone = (e) => {
    this.setState({
      phone: e.target.value
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
						<input name="numberToSend" type="number" minLength={9} maxLength={14} className="modal__check__add__input" placeholder="Ubah No" onChange={this.handleChangPhone} />
					</div>
          <label className="alert__user">{this.state.notif}</label>
					<div className="modal__check__delete">
						<button className="modal__check__delete__button" onClick={(e) => this.submitChangePhone(e)}>Ubah</button>
						<button className="modal__check__delete__button" onClick={this.props.toggle}>Batal</button>
					</div>
				</div>
			</Modal>
		)
  }
}

export default ModalChange;