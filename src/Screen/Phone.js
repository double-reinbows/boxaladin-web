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
			otp: ''
		}
	}

	render() {
		return (
			<div>
				<form className="form-horizontal" onSubmit={ (e) => this.handleFormSubmit(e)}>
          <div className="form-group">
            <div className="col-sm-4 col-sm-offset-4">
              <input name="phonenumber" required type="text" className="form-control" id="inputUsername" placeholder="phone number" onChange={ (e) => this.handleFormInput(e) } />
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
					<form className="form-horizontal" onSubmit={ (e) => this.submitOtp(e)}>
						<div className="form-group">
							<div className="col-sm-12">
								<input name="otp" required autoFocus type="text" maxLength={6} className="form-control" id="inputUsername" placeholder="Masukan 6 digit OTP" onChange={ (e) => this.handleFormInput(e) } />
							</div>
						</div>
						<div className="form-group">
	            <div className="col-sm-4 col-sm-offset-4">
	              <button type="submit" className="btn btn-primary">Confirm</button>
	            </div>
	          </div>
					</form>
				</Modal>

			</div>
		)
	}

	componentDidMount() {
		this.loginCheck()
		this.getPhoneNumbers()
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
				// this.setState({showOtpModal: false})
      }
		})
		.catch(err => console.log(err))

		this.setState({showOtpModal: false})
	}

	insertOtp(data) {
		this.setState({numberId: data.id})
		this.setState({showOtpModal: true})
		// alert('insert OTP')
	}

	reqOtp() {
		alert('request OTP')
	}

	showActionButton(dataNumber) {
		if (dataNumber.verified === false) {
			return (
				<div>
					<button onClick={() => this.insertOtp(dataNumber)}>Verify</button>
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
			}
		})
		.catch(err => console.log(err))
	}

	handleFormInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

	loginCheck() {
    if (localStorage.getItem('token') === null) {
      this.props.history.push('/')
    }
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
