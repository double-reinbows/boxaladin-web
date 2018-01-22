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
			numberId: null
		}
	}

	render() {
		console.log('State:', this.state);
		console.log('Props:', this.props);
		return (
			<div>
				{ this.showDataUser() }
				{ this.showPhoneModal() }
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
      }
		})
		.catch(err => console.log(err))
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
				{this.props.phoneNumbers !== null ? (
						this.props.phoneNumbers.map((phone, idx) => {
							return (
								<h4 key={idx}>{phone.number} {phone.verified === false ? <button onClick={ () => this.requestOTP(phone) } className="btn btn-xs btn-success" type="button">verify</button> : <i style={{ color: "green" }}>verified</i>}</h4>
							)
						})
				) : (
          null
				)}
			</div>
		)
	}

	showDataUser() {
		return (
			<div>
				<h3>{this.props.dataUser !== null ? this.props.dataUser.first_name : null} {this.props.dataUser !== null ? this.props.dataUser.family_name : null}</h3>
				<h4>{this.props.dataUser !== null ? this.props.dataUser.email : null}</h4>
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
