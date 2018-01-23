import React from 'react'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
import Modal from 'react-modal'
import axios from 'axios'

import { loginAction, getPhoneNumbers } from '../actions/'

const customStyles = {
	overlay : {
    position          : 'absolute',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.80)'
  },
  content : {
    position                   : 'absolute',
    top                        : '200px',
    left                       : '500px',
    right                      : '500px',
    bottom                     : '200px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '50px'

  }
};

class User extends React.Component {
	constructor() {
		super()
		this.state = {
			phoneModal: false,
			OTP: null,
			numberId: null,
			addPhoneModal: false,
			numberToSend: null,
			changePhoneModal: false,
			idPhoneToChange: null
		}
	}

	render() {
		console.log('State:', this.state);
		console.log('Props:', this.props);
		return (
			<div>
				{ this.showDataUser() }
				{ this.showPhoneModal() }
				{ this.showAddPhoneModal() }
				{ this.showAChangePhoneModal() }
			</div>
		)
	}

	componentDidMount() {
		this.setDataUser()
		this.props.getPhoneNumbers()
	}

	submitOTP(e) {
		e.preventDefault()

		axios({
			method: 'POST',
			url: `http://localhost:3000/phoneVerification`,
			data: {
				numberId: this.state.numberId,
				otp: this.state.OTP
			}
		})
		.then(({data}) => {
      if (data.message === 'incorrect otp') {
				console.log(data)
      	alert(data.message)
      } else if (data.message === 'phone verified') {
				console.log(data)
				alert(data.message)
				this.props.getPhoneNumbers()
				this.setState({phoneModal: false})
				this.setState({numberId: null})
				this.setState({OTP: null})
      }
		})
		.catch(err => console.log(err))
	}

	showAChangePhoneModal() {
		return (
			<Modal
				isOpen={this.state.changePhoneModal}
				style={ customStyles }
			>
				<form className="form-horizontal" onSubmit={ (e) => this.submitChangePhone(e) }>
					<div className="form-group">
						<div className="col-sm-12">
							<input name="numberToSend" required autoFocus type="text" maxLength={14} className="form-control" placeholder="Phone Number" onChange={ (e) => this.handlePhoneNum(e) } />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-12 col-sm-offset-3">
							<button type="button" className="btn btn-xs btn-default" onClick={ () => this.setState({ changePhoneModal: false }) }>Cancel</button>
							<button style={{ marginLeft: 5 }} type="submit" className="btn btn-xs btn-primary">Change</button>
						</div>
					</div>
				</form>
			</Modal>
		)
	}

	showAddPhoneModal() {
		return (
			<Modal
				isOpen={this.state.addPhoneModal}
				style={ customStyles }
			>
				<form className="form-horizontal" onSubmit={ (e) => this.submitPhone(e) }>
					<div className="form-group">
						<div className="col-sm-12">
							<input name="numberToSend" required autoFocus type="text" maxLength={14} className="form-control" placeholder="Phone Number" onChange={ (e) => this.handlePhoneNum(e) } />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-12 col-sm-offset-3">
							<button type="button" className="btn btn-xs btn-default" onClick={ () => this.setState({ addPhoneModal: false }) }>Cancel</button>
							<button style={{ marginLeft: 5 }} type="submit" className="btn btn-xs btn-primary">Confirm</button>
						</div>
					</div>
				</form>
			</Modal>
		)
	}

	handlePhoneNum(e) {
	  var num = e.target.value.split('')
	  if (num[0] === '0') {
	    num.splice(0, 1, '62')
	    this.setState({numberToSend: num.join('')})
	  } else if (num[0]+num[1]+num[2] === '+62') {
	    num.splice(0, 3, '62')
			this.setState({numberToSend: num.join('')})
	  } else if (num[0]+num[1] === '62') {
			this.setState({numberToSend: num.join('')})
		} else if (num[0] === '8') {
			this.setState({numberToSend: '62' + num.join('')})
		} else if (num.length === 0) {
			this.setState({numberToSend: num.join('')})
		}
		// console.log(e.target.value);
	}

	showPhoneModal() {
		return (
			<Modal
				isOpen={this.state.phoneModal}
				style={ customStyles }
			>
				<form className="form-horizontal" onSubmit={ (e) => this.submitOTP(e) }>
					<div className="form-group">
						<div className="col-sm-12">
							<input name="otp" required autoFocus type="text" maxLength={6} className="form-control" id="inputUsername" placeholder="Masukan 6 digit OTP" onChange={ (e) => this.setState({OTP: e.target.value}) } />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-12 col-sm-offset-3">
							<button type="button" className="btn btn-xs btn-default" onClick={ () => this.setState({ phoneModal: false }) }>Cancel</button>
							<button style={{ marginLeft: 5 }} type="submit" className="btn btn-xs btn-primary">Confirm</button>
						</div>
					</div>
				</form>
			</Modal>
		)
	}

	requestOTP(phone) {
		this.setState({numberId: phone.id})
		this.setState({phoneModal: true})

		axios({
			method: 'POST',
			url: `http://localhost:3000/smsVerification`,
			data: {
				phoneId: phone.id
			}
		})
		.then(response => {
			console.log('Request send sms done!');
		})
		.catch(err => console.log(err))
	}

	showPhoneNumbers() {
		return (
			<div>
				<h4>phones: </h4>
				<ul>
					{this.props.phoneNumbers !== null ? (
							this.props.phoneNumbers.map((phone, idx) => {
								return (
									<li key={idx}>{phone.number} {phone.verified === false ? <span><button onClick={ () => this.requestOTP(phone) } className="btn btn-xs btn-success" type="button">verify</button> <button type="button" className="btn btn-xs btn-default" onClick={() => this.changePhone(phone)}>change</button> <button type="button" className="btn btn-xs btn-danger" onClick={() => this.removePhone(phone)}>remove</button></span> : <span><i style={{ color: "green" }}>verified</i> <button type="button" className="btn btn-xs btn-danger" onClick={() => this.removePhone(phone)}>remove</button></span>}</li>
								)
							})
					) : (
	          null
					)}
				</ul>
				<a onClick={() => this.addPhone()}>Add</a>
			</div>
		)
	}

	submitPhone(e) {
		e.preventDefault()
		// alert(this.state.numberToSend)

		if (this.state.numberToSend[0] + this.state.numberToSend[1] !== '62') {
			alert('Format nomor HP salah')
		} else {
			axios({
				method: 'POST',
				url: `http://localhost:3000/phonenumber`,
				data: {
					phonenumber: this.state.numberToSend
				},
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(response => {
				if (response.data.message === 'data added') {
					this.props.getPhoneNumbers()
					this.setState({addPhoneModal: false})
				} else if (response.data.message === 'duplicate number') {
					alert(response.data.message)
				} else if (response.data.message === 'already use') {
					alert(response.data.message)
				}
			})
			.catch(err => console.log(err))
		}
	}

	addPhone() {
		this.setState({addPhoneModal: true})
	}

	changePhone(phone) {
		this.setState({idPhoneToChange: phone.id})
		this.setState({changePhoneModal: true})
	}

	submitChangePhone(e) {
		e.preventDefault()
		// console.log('Submit change phone!');

		if (this.state.numberToSend[0] + this.state.numberToSend[1] !== '62') {
			alert('Format nomor HP salah')
		} else {
			axios({
				method: 'PUT',
				url: `http://localhost:3000/phone/${this.state.idPhoneToChange}`,
				data: {
					phonenumber: this.state.numberToSend
				},
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(response => {
				if (response.data.message === 'data changed') {
					this.props.getPhoneNumbers()
					this.setState({changePhoneModal: false})
				} else if (response.data.message === 'duplicate number') {
					alert(response.data.message)
				} else if (response.data.message === 'already use') {
					alert(response.data.message)
				}
			})
			.catch(err => console.log(err))
		}
	}

	removePhone(phone) {
		// alert('Remove phone here!')
		axios({
			method: 'DELETE',
			url: `http://localhost:3000/phone/${phone.id}`
		})
		.then(({data}) => {
			console.log('Data remove phone:', data)
			this.props.getPhoneNumbers()
		})
		.catch(err => console.log(err))
	}

	showDataUser() {
		return (
			<div>
				<h3>{this.props.dataUser !== null ? this.props.dataUser.first_name : null} {this.props.dataUser !== null ? this.props.dataUser.family_name : null}</h3>
				<h4>username: {this.props.dataUser !== null ? this.props.dataUser.username : null}</h4>
				<h4>email: {this.props.dataUser !== null ? this.props.dataUser.email : null}</h4>
				{ this.showPhoneNumbers() }
			</div>
		)
	}

	setDataUser() {
		const decoded = jwt.verify(localStorage.getItem('token'), 'satekambing')
		console.log('Data decoded:', decoded);
		this.props.loginAction(decoded)
	}
}

const mapStateToProps = (state) => {
	return {
		isLogin: state.userReducer.isLogin,
		dataUser: state.userReducer.dataUser,
		phoneNumbers: state.userReducer.phoneNumbers
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loginAction: (payload) => dispatch(loginAction(payload)),
		getPhoneNumbers: () => dispatch(getPhoneNumbers())
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(User)

export default connectComponent
