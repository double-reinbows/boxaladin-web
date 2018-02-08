import React from 'react'
import { connect } from 'react-redux'
import {
	Container,
	Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap'
import axios from 'axios'

import { getKeys } from '../actions/keyAction'

class TopupKey extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			idKeySelected: ''
		}
	}

	render() {
		console.log('State:', this.state)
		console.log('Props:', this.props)

		return (
			<div>
				<Container>
					<h1>TopUp</h1>
					{ this.showForm() }
				</Container>
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
				</FormGroup>

				<FormGroup>
					<Button color="primary" type="submit">Topup</Button>
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
				url: `http://localhost:3000/topupKey`,
				data: {
					keyId: this.state.idKeySelected
				},
				headers: {
					token: localStorage.getItem('token')
				}
			})
			.then(({data}) => {
				console.log('Response.data:',data)
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
