import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'reactstrap'
import axios from 'axios'

import { getPhoneNumbers } from '../../actions/'
import { getUser } from '../../actions/userAction'

// import Logo from '../asset/TabsHome/IconTabs1.svg'
import IconCoin from '../../asset/user/coin.png'
import IconEmail from '../../asset/user//mail.png'
import IconKey from '../../asset/user/key.png'
import IconPhone from '../../asset/user/phone.png'
// import IconUser from '../../asset/user/user.png'
import IconCheck from '../../asset/user/checked.png'
import ModalPrimaryPhone from './ModalPrimary'
import ModalDelete from './ModalDelete'
import ModalText from '../Components/Modal/ModalText'
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
			idPhoneToDelete: '',
			changePrimaryPhoneOTPModal: false,
			notif: '',
			oldUserModal: false,
			openModalDelete: false,
			modalCheck: false
		}
		this.toggle = this.toggle.bind(this);

	}

	render() {
		return (
			<div className="user">
				<div className="user__container">
					<label className="user__title__header">
						Profil Saya
					</label>
					<div className="user__info__container">
						{/* <div>
							<img src={IconUser} className="user__show__logo__user" alt="User" />

						</div> */}

					{ this.showDataUser() }

					</div>
					{ this.showPhoneModal() }

					{ this.showAddPhoneModal() }
					{ this.showChangePhoneModal(this.state.numberToSend) }
					{ this.showChangePrimaryPhone() }

					{ this.showChangePrimaryPhoneOTP() }
					<ModalPrimaryPhone open={this.state.oldUserModal} buttongToggle={this.toggle} emailUser={this.props.userInfo.email}/>
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
			url: `${process.env.REACT_APP_API_HOST}/phoneVerification`,
			headers: {
        key: process.env.REACT_APP_KEY
      },
			data: {
				numberId: this.state.numberId,
				otp: this.state.OTP
			}
		})
		.then(({data}) => {
      if (data.message === 'incorrect otp') {
      	this.setState({
					notif: data.message,
				})
      } else if (data.message === 'phone verified') {
				this.props.getPhoneNumbers()
				this.setState({phoneModal: false})
				this.setState({numberId: null})
				this.setState({OTP: null})
				this.setState({
					notif: data.message,
				})
      }
		})
		.catch(err => console.log(err))
	}

	finalSubmitChangePrimaryPhone(e) {
		e.preventDefault()
		// alert('Final submit!')

		axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_HOST}/changePrimary`,
				headers: {
					token: localStorage.getItem('token'),
					key: process.env.REACT_APP_KEY
				},
				data: {
					numberId: this.state.numberId,
					otp: this.state.OTP
				}
			})
			.then(({data}) => {
				this.props.getPhoneNumbers()
				this.setState({
					notif: data.message,
				})
				this.setState({numberId: null})
				this.setState({changePrimaryPhoneOTPModal: false})
				this.setState({OTP: null})
			})
			.catch(err => console.log(err))
	}

	// modal untuk OTP setelah change primary number
	showChangePrimaryPhoneOTP() {
		return (
			<Modal isOpen={this.state.changePrimaryPhoneOTPModal} className="ModalPhone">
				<form className="modalContent" onSubmit={ (e) => this.finalSubmitChangePrimaryPhone(e) }>

					<div className="form-group ModalContent__form">
						<input name="OTP" required autoFocus type="text" maxLength={6} className="form-control" id="inputUsername" placeholder="Masukan 6 digit OTP" onChange={ (e) => this.setState({OTP: e.target.value}) } />
					</div>

					<div className="form-group ModalContent__button">
					<button className="user__show__button" onClick={ () => this.setState({ changePrimaryPhoneOTPModal: false }) }>Batal</button>
					<button className="user__show__button" type="submit" color="primary">Submit</button>
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

			this.setState({
				notif: 'Harus Pilih Salah Satu Nomor',
			})

		} else {

			axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_HOST}/smsVerification`,
				data: {
					phoneId: this.state.numberId
				},
				headers: {
					token: localStorage.getItem('token'),
					key: process.env.REACT_APP_KEY
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

	// modal untuk select primary phone
	showChangePrimaryPhone() {
		return (
			<Modal isOpen={this.state.changePrimaryPhoneModal} className="ModalPhone">
				<form className="ModalContent" onSubmit={ (e) => this.submitChangePrimaryPhone(e) }>

					<div className="form-group ModalContent__form">
						<select className="ModalContent__select"onChange={ (e) => this.setState({numberId: e.target.value}) }>
							<option selected="true" disabled="true" value={null}>--Pilih No--</option>
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

					<div className="form-group ModalContent__button">
					<button className="user__show__button" onClick={ () => this.setState({ changePrimaryPhoneModal: false }) }>Batal</button>
					<button className="user__show__button" type="submit" color="primary">Ubah</button>
					</div>
				</form>

			</Modal>
		)
	}

	// modal untuk change
	showChangePhoneModal(numValue) {
		// var numValue = this.state.numberToSend
		return (
			<Modal isOpen={this.state.changePhoneModal} className="modal__check">
			<div className="modal__check__container">
					<div className="modal__check__delete__content">
						<label className="modal__check__delete__label"><b>Masukan Nomor Hape:</b></label>
					</div>
					<div className="modal__check__add">
						<input value={numValue} name="numberToSend" type="text" maxLength={14} className="modal__check__add__input" placeholder="Ubah No" onChange={ (e) => this.handlePhoneNum(e) } />
					</div>
					<div className="modal__check__delete">
						<button className="modal__check__delete__button" onClick={(e) => this.submitChangePhone(e)}>Ubah</button>
						<button className="modal__check__delete__button" onClick={ () => this.setState({ changePhoneModal: false }) }>Batal</button>
					</div>
				</div>
			</Modal>
		)
	}

	// modal untuk add phone
	showAddPhoneModal() {
		return (
		<Modal isOpen={this.state.addPhoneModal} className="modal__check">
			<div className="modal__check__container">
				<form onSubmit={e => this.submitPhone(e)}>
					<div className="modal__check__delete__content">
						<label className="modal__check__delete__label"><b>Masukan Nomor Hape:</b></label>
					</div>
					<div className="modal__check__add">
						<input name="numberToSend" maxLength={14} className="modal__check__add__input" placeholder="Phone Number" onChange={e => this.handlePhoneNum(e)} />
					</div>
					<div className="modal__check__delete">
						<button className="modal__check__delete__button" type="submit" color="primary">Setuju</button>
						<button className="modal__check__delete__button" onClick={() => this.addPhone()} >Batal</button>
					</div>
				</form>
			</div>
		</Modal>
		)
	}

	handlePhoneNum(e) {
    var num = e.target.value.split('')
    if (num[0] === '0') {
      num.splice(0, 1, '0')
      this.setState({[e.target.name]: num.join('')})
    } else if (num[0] + num[1] + num[2] === '+62') {
      num.splice(0, 3, '0')
      this.setState({[e.target.name]: num.join('')})
    } else if (num[0] + num[1] === '62') {
      num.splice(0, 2, '0')
      this.setState({[e.target.name]: num.join('')})
    } else if (num[0] === '8') {
      num.splice(0, 0, '0')
      this.setState({[e.target.name]: num.join('')})
    } else if (num.length === 0) {
      this.setState({[e.target.name]: num.join('')})
    } else {
			this.setState({notif: 'Format No Hp Salah'})
		}
	}
//Modal for verify number
	showPhoneModal() {
		return (
			<Modal isOpen={this.state.phoneModal} className="ModalPhone">

				<form className="ModalContent" onSubmit={ (e) => this.submitOTP(e) }>

					<div className="form-group ModalContent__form">
						<input name="otp" required autoFocus type="text" maxLength={6} className="form-control" id="inputUsername" placeholder="Masukan 6 digit OTP" onChange={ (e) => this.setState({OTP: e.target.value}) } />
					</div>

					<div className="form-group ModalContent__button">
						<button className="user__show__button" onClick={ () => this.setState({ phoneModal: false }) }>Batal</button>
						<button className="user__show__button" type="submit" color="primary">Setuju</button>
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
			url: `${process.env.REACT_APP_API_HOST}/smsVerification`,
			data: {
				phoneId: phone.id
			},
			headers: {
				token: localStorage.getItem('token'),
				key: process.env.REACT_APP_KEY
			}
		})
		.then(response => {
			console.log('Request send sms done!');
			// this.setState({numberId: null})
			// phone.id = null
		})
		.catch(err => console.log(err))
	}

	toggle() {
    this.setState({
			oldUserModal: !this.state.oldUserModal,
			notif: '',
    })
	}

	addPhone = () => {
		this.setState({
			addPhoneModal: !this.state.addPhoneModal
		})
	}

	showPhoneNumbers() {
		return <div className="user__phone">
        <div className="user__phone__row1">
					<div className="user__phone__row1__phoneNumber">
	          <img src={IconPhone} className="user__show__logo" alt="Logo" />
						<div className = "user__phone__row1__phoneWidth">
							{this.props.phoneNumbers.length !== 0 ? this.props.phoneNumbers.map((phone, idx) => {
								return (
									<div>
										{phone.primary === false ? null :
											<div className="user__phone__row1__phoneInfo">
												<label>{phone.number}</label>
												<label>(Verified)</label>
											</div>}
									</div>
								)
							}) :
							<button className="user__show__button" onClick={() => this.toggle()}> Verifikasi Nomor </button>}
						</div>
						</div>
							{ this.props.phoneNumbers.length !== 0 ?
								<label className="user__title">
	            		No Hp Terdaftar
	          		</label> :
									null }
	        </div>
        <div className="user__phone__row2">
          <ul>
            {this.props.phoneNumbers !== null ? this.props.phoneNumbers.map(
                  (phone, idx) => {
                    return (
                      <li key={idx} className="user__phone__row2__li">
                        <div className="user__phone__row2__number">
                          {phone.primary === false ? phone.number : null }
                        </div>
                        {phone.verified === false && phone.primary === false ? (
                          <div className="user__phone__row2__unverify">
                            <div className="user__phone__row2__unverify__2">
														<button className="user__phone__row2__unverify__2__button2"
                                onClick={() => this.changePhone(phone)}
                              >
                                Ubah
                              </button>
                            </div>
                            <div className="user__phone__row2__unverify__3">
														<button className="user__phone__row2__unverify__3__button3"
																// onClick={() => this.removePhone(phone)}
																onClick={() => this.toggleRemove(phone)}
                              >
                                Hapus
                              </button>

                            </div>
                          </div>
                        ) : null }
                      </li>
                    );
                  }
								) : null}
							<ModalDelete phone={this.state.idPhoneToDelete} openModalDelete={this.state.openModalDelete} buttonToggle={this.toggleModalDelete}/>
          </ul>
					<label className="alert__user">{this.state.notif}</label>

          <div className="user__phone__row3">
					{this.props.phoneNumbers.length === 0 ? null :
					<button className="user__phone__row3__button1" onClick={() => this.addPhone()}>
						Tambah No Baru
					</button>}
          </div>
        </div>
				<ModalText isOpen={this.state.modalCheck} toggle={this.state.toggle} props="Cek Hape Anda"/>
      </div>;
	}

	submitPhone(e) {
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
					this.props.getPhoneNumbers()
					this.setState({
						addPhoneModal: false,
						notif: ''
					})
				} else if (response.data === 'duplicate number') {
					this.setState({
						notif: 'No Hp Sudah Ada',
					})
				} else if (response.data.message === 'already use') {
					this.setState({
						notif: response.data.message,
					})
				}
			})
			.catch(err => console.log(err))

	}



	changePhone(phone) {
		this.setState({
			numberToSend: phone.number,
			idPhoneToChange: phone.id,
			changePhoneModal: true
		})
	}

	submitChangePhone(e) {
		e.preventDefault()
		// console.log('Submit change phone!');

		// if (this.state.numberToSend[0] + this.state.numberToSend[1] !== '62') {
		// 	this.setState({
    //     notif: "Format No Hp Salah",
    //   })
		// } else {
			axios({
				method: 'PUT',
				url: `${process.env.REACT_APP_API_HOST}/phone/${this.state.idPhoneToChange}`,
				data: {
					phonenumber: this.state.numberToSend
				},
				headers: {
					token: localStorage.getItem('token'),
					key: process.env.REACT_APP_KEY
				}
			})
			.then(response => {
				if (response.data.message === 'data changed') {
					this.setState({
						changePhoneModal: false,
						numberToSend: null,
						idPhoneToChange: null
					},
					this.props.getPhoneNumbers()

				)
				} else if (response.data.message === 'duplicate number') {
					this.setState({
						notif: response.data.message,
					})
				} else if (response.data.message === 'already use') {
					this.setState({
						notif: response.data.message,
					})
				}
			})
			.catch(err => console.log(err))
		// }
	}

	toggleRemove = (phone) => {
		this.setState({
			openModalDelete: !this.state.openModalDelete,
			idPhoneToDelete: phone.id
		})
	}

	toggleModalDelete = () => {
		this.setState({
			openModalDelete: !this.state.openModalDelete
		})
	}

	toggleCheck = () => {
		this.setState({
			modalCheck: !this.state.modalCheck,
			notif: ''
		})
	}

	showDataUser() {
		return (
			<div className="user__show__container">
				<h3>{this.props.userInfo !== null ? this.props.userInfo.first_name : null} {this.props.userInfo !== null ? this.props.userInfo.family_name : null}</h3>
				<div className="user__show">
					<img src={IconEmail} className="user__show__logo" alt="Logo"/>
					<div className="user__show__email">
					{this.props.userInfo !== null ? this.props.userInfo.email : null}
						<div style= {{ width:"16%" }}>
							{this.props.userInfo !== null ? (this.props.userInfo.emailVerified ? <img src={IconCheck} className="user__show__logo__verified" alt="Logo"/>
								:
								(<button  className="user__show__button" onClick={() => this.resendEmailVerification()}> Verifikasi </button>)) : null
							}
						</div>

					</div>


				</div>
				<div className="user__show">
					<img src={IconKey} className="user__show__logo" alt="Logo"/>
					{this.props.userInfo !== null ? this.props.userInfo.aladinKeys : null}
				</div>
				<div className="user__show">
					<img src={IconCoin} className="user__show__logo" alt="Logo"/>
					{this.props.userInfo !== null ? this.props.userInfo.coin : null}
				</div>
				{ this.showPhoneNumbers() }
				
				<ModalText isOpen={this.state.modalCheck} toggle={this.toggleCheck} text="Cek Email Anda"/>
			</div>
		)
	}

	resendEmailVerification() {
		console.log('RESEND EMAIL!')

		axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API_HOST}/resendemailverification`,
			headers: {
				token: localStorage.getItem('token'),
				key: process.env.REACT_APP_KEY
			}
		})
		.then(response => {
			if (response.status === 200) {
				return this.setState({
					modalCheck: !this.state.modalCheck
				})
			}
			return null
		})
		.catch(err => {
			return console.log('ERROR:', err)
		})
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
