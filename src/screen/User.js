import React from 'react'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
import Modal from 'react-modal'
import axios from 'axios'
import { Button } from 'reactstrap'

import { getPhoneNumbers } from '../actions/'
import { getUser } from '../actions/userAction'

import Logo from '../asset/TabsHome/IconTabs1.svg'
import IconCoin from '../asset/user/IconCoin.svg'
import IconEmail from '../asset/user/IconEmail.svg'
import IconKey from '../asset/user/IconKey.svg'
import IconPhone from '../asset/user/IconPhone.svg'
import IconUser from '../asset/user/IconUser.svg'
import IconCheck from '../asset/user/IconCheck.svg'


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
			<div className="User">
				<div className="User__container">
					<label className="User__Label">
						User Profile Page
					</label>
					{ this.showDataUser() }
					
					{ this.showPhoneModal() }
					{ this.showAddPhoneModal() }
					{ this.showChangePhoneModal(this.state.numberToSend) }
					{ this.showChangePrimaryPhone() }
					{ this.showChangePrimaryPhoneOTP() }
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.props.getUser()
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

		this.setState({numberId: phone.id})
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
			<div className="User__Phone">
				<div className="User__Phone__row1">
					<img src={IconPhone} className="User__show__logo" alt="Logo"/>
					<label>Your registered phone number</label>
				</div>
				<div className="User__Phone__row2">
					<ul>
						{this.props.phoneNumbers !== null ? (
								this.props.phoneNumbers.map((phone, idx) => {
									return (
										<li key={idx} className="User__Phone__row2__li">
											<div className="User__Phone__row2__number">
												{phone.number}
											</div>
											{phone.verified === false ? (
												<div className="User__Phone__row2__unverify">
													<div className="User__Phone__row2__unverify__1">
														<Button onClick={ () => this.requestOTP(phone) } color="success" type="button" className="User__Phone__row2__unverify__1__button1">
															verify
														</Button>
													</div>
													<div className="User__Phone__row2__unverify__2">
														<Button type="button" color="secondary" onClick={() => this.changePhone(phone)} className="User__Phone__row2__unverify__2__button2">
															change
														</Button>
													</div>
													<div className="User__Phone__row2__unverify__3">
														<Button type="button" color="danger" onClick={() => this.removePhone(phone)} className="User__Phone__row2__unverify__3__button3">
															remove
														</Button>
													</div>
												</div>
											) : (
												<div className="User__Phone__row2__verify">
													<div className="User__Phone__row2__verify__1">
														<label className="User__Phone__row2__verify__1__button4" style={{ color: "green" }}>
															verified
														</label>
													</div>
													<div className="User__Phone__row2__verify__2">
														<Button type="button" color="danger" onClick={() => this.removePhone(phone)} className="User__Phone__row2__verify__2__button5">
															remove
														</Button>
													</div>
													<div className="User__Phone__row2__verify__3">
														{phone.primary === true ? 
															<img src={IconCheck} className="User__Phone__row2__verify__3__check" alt="Logo"/> 
														: null}
													</div>
												</div>
											)}
											
										</li>
									)
								})
						) : (
							null
						)}
					</ul>
					
					<div className="User__Phone__row3">
						<Button color="success" onClick={() => this.addPhone()} className="User__Phone__row3__button1">Add New Phonenumber</Button>
						<Button color="danger" onClick={() => this.setState({changePrimaryPhoneModal: true})} className="User__Phone__row3__button2">Select primary Phonenumber</Button>
					</div>

				</div>
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
				<h3>{this.props.userInfo !== null ? this.props.userInfo.first_name : null} {this.props.userInfo !== null ? this.props.userInfo.family_name : null}</h3>
				<div className="User__show">
					<img src={IconUser} className="User__show__logo" alt="Logo"/>
					{this.props.userInfo !== null ? this.props.userInfo.username : null}
				</div>
				<div className="User__show">
					<img src={IconEmail} className="User__show__logo" alt="Logo"/> 
					{this.props.userInfo !== null ? this.props.userInfo.email : null}
				</div>
				<div className="User__show">
					<img src={IconKey} className="User__show__logo" alt="Logo"/>
					{this.props.userInfo !== null ? this.props.userInfo.aladinKeys : null}
				</div>
				<div className="User__show">
					<img src={IconCoin} className="User__show__logo" alt="Logo"/>
					{this.props.userInfo !== null ? this.props.userInfo.coin : null}
				</div>
				{ this.showPhoneNumbers() }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo,
		phoneNumbers: state.userReducer.phoneNumbers
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPhoneNumbers: () => dispatch(getPhoneNumbers()),
		getUser: () => dispatch(getUser())
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(User)

export default connectComponent
