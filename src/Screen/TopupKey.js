import React from 'react'
import { connect } from 'react-redux'
import {
	Button,
	Form,
	FormGroup,
	Input
} from 'reactstrap'
import axios from 'axios'

import { getKeys } from '../actions/keyAction'

class TopupKey extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			idKeySelected: '',
			notif: ''
		}
	}

	render() {
		return (
			<div className="TopupKey">
				<h1 className="TopupKey__text">Top Up Your Aladin Key</h1>
				{ this.showForm() }
			</div>
		)
	}

	componentDidMount() {
		this.props.getKeys()
	}

	showForm() {
		return (
			<Form onSubmit={(e) => this.submitForm(e)}>
				<FormGroup>
					<Input type="select" name="aladinTopup" onChange={(e) => this.setState({idKeySelected: e.target.value})}>
						<option value=''>-- Select --</option>
						{this.props.keys.map((data, i) => {
							return (
								<option key={i} value={data.id}>{data.keyAmount} keys - Rp.{data.price}</option>
							)
						})}
					</Input>
					<label className="alert">{this.state.notif}</label>
          <br/>
				</FormGroup>

				<FormGroup>
					<Button color="primary" type="submit" size="lg" block>Topup</Button>
				</FormGroup>
			</Form>
		)
	}

	submitForm(e) {
		e.preventDefault()

		if (this.state.idKeySelected === '') {
			alert('Harus pilih salah satu voucher aladin key.')
		} else {
			axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_HOST}/topupKey`,
				data: {
					keyId: this.state.idKeySelected
				},
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(({data}) => {
				if (data.msg === 'not verified user') {
					return this.setState({
						notif: "Akun Anda belum terverifikasi.\nSilahkan verifikasi email dengan klik link yang kami kirim ke email Anda.",
					})
				}
				this.props.history.push(`/topupinvoice/${data.id}`)
			})
			.catch(err => console.log('Error:', err))
		}
	}

}

const mapStateToProps = (state) => {
	return {
		keys: state.keyReducer.keys
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getKeys: () => dispatch(getKeys())
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(TopupKey)

export default connectComponent
