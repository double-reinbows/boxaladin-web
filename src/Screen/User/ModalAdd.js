import React, { Component } from 'react';
import axios from 'axios';
import { Modal } from 'reactstrap'
import { connect } from 'react-redux'

import { getPhoneNumbers } from '../../actions/'

class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.submitPhone = this.submitPhone.bind(this)
    this.state = { 
      numberToSend: '',
      notif: ''
    }
  }

	submitPhone(e){
		e.preventDefault()
		// alert(this.state.numberToSend)

			axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_HOST}/phonenumber`,
				data: {
					phonenumber: this.state.numberToSend
				},
				headers: {
					token: localStorage.getItem('token'),
					key: process.env.REACT_APP_KEY
				}
			})
			.then(response => {
				if (response.data.message === 'data added') {
          window.location.reload();
				} else if (response.data === 'duplicate number') {
					this.setState({
						notif: 'No Hp Sudah Ada',
					})
				} else if (response.data.message === 'already use') {
					this.setState({
						notif: "No Hp Sudah Digunakan",
					})
				}
			})
			.catch(err => console.log(err))
  }

  handlePhoneNum = (e) => {

    // this.setState({
    //   numberToSend: e.target.value
    // })

    var num = e.target.value.split('')
    if (num[0] === '0') {
      num.splice(0, 1, '0')
      this.setState({numberToSend: num.join('')})
    } else if (num[0] + num[1] + num[2] === '+62') {
      num.splice(0, 3, '0')
      this.setState({numberToSend: num.join('')})
    } else if (num[0] + num[1] === '62') {
      num.splice(0, 2, '0')
      this.setState({numberToSend: num.join('')})
    } else if (num[0] === '8') {
      num.splice(0, 0, '0')
      this.setState({numberToSend: num.join('')})
    } else if (num.length === 0) {
      this.setState({numberToSend: num.join('')})
    } else if (e.target.value === '') {
      this.setState({notif: 'Format No Hp Salah'})
    } else {
			this.setState({notif: 'Format No Hp Salah'})
		}
	}
  
  render() { 
    console.log(this.state.numberToSend)
    return ( 
		<Modal isOpen={this.props.openModalAdd} className="modal__check">
    <div className="modal__check__container">
        <div className="modal__check__delete__content">
          <label className="modal__check__delete__label"><b>Masukan Nomor Hape:</b></label>
        </div>
        <div className="modal__check__add">
          <input name="numberToSend" maxLength={14} className="modal__check__add__input" placeholder="Phone Number" onChange={this.handlePhoneNum} />
        </div>
        <label className="alert__user">{this.state.notif}</label>
        <div className="modal__check__delete">
          <button className="modal__check__delete__button" onClick={(e) => this.submitPhone(e)} color="primary">Setuju</button>
          <button className="modal__check__delete__button" onClick={this.props.buttonToggle}>Batal</button>
        </div>
    </div>
		</Modal>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		phoneNumbers: state.userReducer.phoneNumbers
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPhoneNumbers: () => dispatch(getPhoneNumbers()),
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalAdd)

export default connectComponent


