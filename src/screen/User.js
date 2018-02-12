import React from 'react'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
import Modal from 'react-modal'
import axios from 'axios'
import { Button } from 'reactstrap'

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
			changePrimaryPhoneModal: false,
			idPhoneToChange: null,
			changePrimaryPhoneOTPModal: false
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
				{ this.showChangePhoneModal(this.state.numberToSend) }
				{ this.showChangePrimaryPhone() }
				{ this.showChangePrimaryPhoneOTP() }
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
				this.props.getPhoneNumbers()
				this.setState({phoneModal: false})
				this.setState({numberId: null})
				this.setState({OTP: null})
				alert(data.message)
      }
		})
		.catch(err => console.log(err))
	}

	finalSubmitChangePrimaryPhone(e) {
		e.preventDefault()
		// alert('Final submit!')
		console.log(`Data buat confirm change primary phone: ID=${this.state.numberId}, OTP=${this.state.OTP}`);
		
		axios({
				method: 'POST',
				url: `http://localhost:3000/changePrimary`,
				headers: {
					token: localStorage.getItem('token')
				},
				data: {
					numberId: this.state.numberId,
					otp: this.state.OTP
				}
			})
			.then(({data}) => {
				console.log(data.message)
				this.props.getPhoneNumbers()
				alert(data.message)
				this.setState({numberId: null})
				this.setState({changePrimaryPhoneOTPModal: false})
				this.setState({OTP: null})
			})
			.catch(err => console.log(err))
	}

	showChangePrimaryPhoneOTP() {
		return (
			<Modal
				isOpen={this.state.changePrimaryPhoneOTPModal}
				style={ customStyles }
			>
				<form className="form-horizontal" onSubmit={ (e) => this.finalSubmitChangePrimaryPhone(e) }>
					<div className="form-group">
						<div className="col-sm-12">
							<input name="OTP" required autoFocus type="text" maxLength={6} className="form-control" id="inputUsername" placeholder="Masukan 6 digit OTP" onChange={ (e) => this.setState({OTP: e.target.value}) } />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-12 col-sm-offset-3">
							<Button type="button" color="secondary" onClick={ () => this.setState({ changePrimaryPhoneOTPModal: false }) }>Cancel</Button>
							<Button style={{ marginLeft: 5 }} type="submit" color="primary">Submit</Button>
						</div>
					</div>
				</form>
			</Modal>
		)
	}

	submitChangePrimaryPhone(e) {
		e.preventDefault()
		// var numberId = this.state.numberId
		// this.state.numberId === null ? numberId = this.props.phoneNumbers[0].id : null

		if (this.state.numberId === null) {

			alert('Harus pilih salah satu nomor.')

		} else {

			axios({
				method: 'POST',
				url: `http://localhost:3000/smsVerification`,
				data: {
					phoneId: this.state.numberId
				},
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(response => {
				this.setState({changePrimaryPhoneModal: false})
				this.setState({changePrimaryPhoneOTPModal: true})
				console.log('Request OTP sms done!');
			})
			.catch(err => console.log(err))

		}
	}

	showChangePrimaryPhone() {
		return (
			<Modal
				isOpen={this.state.changePrimaryPhoneModal}
				style={ customStyles }
			>
				<form className="form-horizontal" onSubmit={ (e) => this.submitChangePrimaryPhone(e) }>
					<div className="form-group">
						<div className="col-sm-12">
							<select onChange={ (e) => this.setState({numberId: e.target.value}) }>
								<option value={null}>--Select Number--</option>
								{this.props.phoneNumbers.filter(phone => {
									return phone.primary === false && phone.verified === true
								})
								.map((phone, idx) => {
									return (
										<option key={idx} value={phone.id}>{phone.number}</option>
									)
								})}
							</select>
						</div>
					</div>

					<div className="form-group">
						<div className="col-sm-12 col-sm-offset-3">
							<Button type="button" color="secondary" onClick={ () => this.setState({ changePrimaryPhoneModal: false }) }>Cancel</Button>
							<Button style={{ marginLeft: 5 }} type="submit" color="primary">Set</Button>
						</div>
					</div>
				</form>
			</Modal>
		)
	}

	showChangePhoneModal(numValue) {
		// var numValue = this.state.numberToSend
		return (
			<Modal
				isOpen={this.state.changePhoneModal}
				style={ customStyles }
			>
				<form className="form-horizontal" onSubmit={ (e) => this.submitChangePhone(e) }>
					<div className="form-group">
						<div className="col-sm-12">
							<input value={numValue} name="numberToSend" required autoFocus type="text" maxLength={14} className="form-control" placeholder="Number to change" onChange={ (e) => this.handlePhoneNum(e) } />
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-12 col-sm-offset-3">
							<Button type="button" color="secondary" onClick={ () => this.setState({ changePhoneModal: false }) }>Cancel</Button>
							<Button style={{ marginLeft: 5 }} type="submit" color="primary">Change</Button>
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
							<Button type="button" color="secondary" onClick={ () => this.setState({ addPhoneModal: false }) }>Cancel</Button>
							<Button style={{ marginLeft: 5 }} type="submit" color="primary">Confirm</Button>
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
							<Button type="button" color="secondary" onClick={ () => this.setState({ phoneModal: false }) }>Cancel</Button>
							<Button style={{ marginLeft: 5 }} type="submit" color="primary">Confirm</Button>
						</div>
					</div>
				</form>
			</Modal>
		)
	}

	requestOTP(phone) {
		console.log(phone);
		
		// this.setState({numberId: phone.id})
		this.setState({phoneModal: true})
		
		axios({
			method: 'POST',
			url: `http://localhost:3000/smsVerification`,
			data: {
				phoneId: phone.id
			},
			headers: {
				token: localStorage.getItem('token')
			}
		})
		.then(response => {
			console.log('Request send sms done!');
			// this.setState({numberId: null})
			// phone.id = null
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
									<li key={idx}>
										{phone.number}
										{phone.verified === false ? (
											<span><Button onClick={ () => this.requestOTP(phone) } color="success" type="button">verify</Button> <Button type="button" color="secondary" onClick={() => this.changePhone(phone)}>change</Button> <Button type="button" color="danger" onClick={() => this.removePhone(phone)}>remove</Button></span>
										) : (
											<span><i style={{ color: "green" }}>verified</i> <Button type="button" color="danger" onClick={() => this.removePhone(phone)}>remove</Button></span>
										)}
										{phone.primary === true ? "(primary)" : null}
									</li>
								)
							})
					) : (
	          null
					)}
				</ul>
				<Button color="link" onClick={() => this.addPhone()}>Add</Button>
				<br/>
				<Button color="link" onClick={() => this.setState({changePrimaryPhoneModal: true})}>Select primary</Button>
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
		this.setState({numberToSend: phone.number})
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
					this.setState({numberToSend: null})
					this.setState({idPhoneToChange: null})
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
