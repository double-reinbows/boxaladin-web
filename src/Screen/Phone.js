import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement('#root');

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

class Phone extends React.Component {
	constructor() {
		super()
		this.state = {
			numbers: [],
			numberId: '',
			showOtpModal: false,
			otp: '',
			phonenumber: '',
			isVerified: false
		}
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<form className="form-horizontal" onSubmit={ (e) => this.handleFormSubmit(e)}>
          <div className="form-group">
            <div className="col-sm-4 col-sm-offset-4">
              <input name="phonenumber" required type="text" className="form-control" placeholder="(+62) 8xxx xxxx xxx" onChange={ (e) => this.handlePhoneNum(e) } />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4 col-sm-offset-4">
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </div>
        </form>

				<table className="table table-striped table-hover ">
				  <thead>
				    <tr>
				      <th>No.</th>
				      <th>Phone Number</th>
							<th>Status</th>
				      <th></th>
				    </tr>
				  </thead>
				  <tbody>
				    { this.showNumbers() }
				  </tbody>
				</table>

				<Modal
					isOpen={ this.state.showOtpModal }
					style={ customStyles }
				>
					<form className="form-horizontal" onSubmit={ (e) => this.submitOtp(e) }>
						<div className="form-group">
							<div className="col-sm-12">
								<input name="otp" required autoFocus type="text" maxLength={6} className="form-control" id="inputUsername" placeholder="Masukan 6 digit OTP" onChange={ (e) => this.handleFormInput(e) } />
							</div>
						</div>
						<div className="form-group">
	            <div className="col-sm-12 col-sm-offset-3">
								<button type="button" className="btn btn-xs btn-default" onClick={ () => this.setState({ showOtpModal: false }) }>Cancel</button>
	              <button style={{ marginLeft: 5 }} type="submit" className="btn btn-xs btn-primary">Confirm</button>
	            </div>
	          </div>
					</form>
				</Modal>

			</div>
		)
	}

	componentDidMount() {
		this.getPhoneNumbers()
	}

	handlePhoneNum(e) {
	  var num = e.target.value.split('')
	  if (num[0] === '0') {
	    num.splice(0, 1, '62')
	    this.setState({[e.target.name]: num.join('')})
	  } else if (num[0]+num[1]+num[2] === '+62') {
	    num.splice(0, 3, '62')
			this.setState({[e.target.name]: num.join('')})
	  } else if (num[0]+num[1] === '62') {
			this.setState({[e.target.name]: num.join('')})
		} else if (num[0] === '8') {
			this.setState({[e.target.name]: '62' + num.join('')})
		} else if (num.length === 0) {
			this.setState({[e.target.name]: num.join('')})
		}
		// console.log(e.target.value);
	}

	showNumbers() {
		return (
			this.state.numbers.map((data, idx) => {
				return (
					<tr className="active" key={idx}>
						<td>{idx+1}</td>
						<td>{data.number}</td>
						<td>{data.verified ? 'verified' : 'not verified'}</td>
						<td>{this.showActionButton(data)}</td>
					</tr>
				)
			})
		)
	}

	submitOtp(e) {
		e.preventDefault()

		axios({
			method: 'POST',
			url: `http://localhost:3000/phoneVerification`,
			data: {
				numberId: this.state.numberId,
				otp: this.state.otp
			}
		})
		.then(({data}) => {
      if (data.message === 'incorrect otp') {
				console.log(data)
      	alert(data.message)
      } else if (data.message === 'phone verified') {
				console.log(data)
				alert(data.message)
				this.getPhoneNumbers()
				this.setState({showOtpModal: false})
      }
		})
		.catch(err => console.log(err))
	}
// --------------------------------------------------------------------
  // handleTf = () => {
  //   fetch('http://localhost:3000/phonenumbers', {
  //     method: 'POST',
  //     // headers: {

  //     // },
  //     body: new URLSearchParams({
  //       number: this.state.noHp,
  //     }),
  //   })
  //   .then(res => res.json())
  //   .then(d => {
  //     console.log(d.verified);
  //     this.setState({
  //       isVerified: d.verified
  //     })
  //   })
	// }
// --------------------------------------------------------------------

	openOtpModal(dataNumber) {
		this.setState({numberId: dataNumber.id})
		this.setState({showOtpModal: true})
		this.sendSms(dataNumber)
	}

	sendSms(data) {
		console.log('Kirim sms!');
		return axios({
			method: 'POST',
			url: `http://localhost:3000/smsVerification`,
			data: {
				phoneId: data.id
			}
		})
		.then(response => {
			console.log('Request send sms done!');
		})
		.catch(err => console.log(err))
	}

	reqOtp() {
		alert('request OTP')
	}

	showActionButton(dataNumber) {
		if (dataNumber.verified === false) {
			return (
				<div>
					<button type="button" className="btn btn-xs btn-default" onClick={ () => this.openOtpModal(dataNumber) }>Verify</button>
				</div>
			)
		}
	}

	getPhoneNumbers() {
		axios({
			method: 'GET',
			url: `http://localhost:3000/phoneNumbers`,
			headers: {
				token: localStorage.getItem('token')
			}
		})
		.then(({data}) => {
			this.setState({numbers: data.data})
		})
		.catch(err => console.log(err))
	}

	handleFormSubmit(e) {
		e.preventDefault()
		// alert(this.state.phonenumber)

		if (this.state.phonenumber[0] + this.state.phonenumber[1] !== '62') {
			alert('Format nomor HP salah')
		} else {
			axios({
				method: 'POST',
				url: `http://localhost:3000/phonenumber`,
				data: {
					phonenumber: this.state.phonenumber
				},
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(response => {
				if (response.data.message === 'data added') {
					this.getPhoneNumbers()
				} else if (response.data.message === 'duplicate number') {
					alert(response.data.message)
				} else if (response.data.message === 'already use') {
					alert(response.data.message)
				}
			})
			.catch(err => console.log(err))
		}
	}

	handleFormInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
}

const mapStateToProps = (state) => {
	return {
		isLogin: state.userReducer.isLogin
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    //
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Phone)

export default connectComponent
