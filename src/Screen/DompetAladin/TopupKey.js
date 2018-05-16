import React from 'react'
import { connect } from 'react-redux'
import {
	Form,
	FormGroup,
	Input
} from 'reactstrap'
import axios from 'axios'

import { getKeys } from '../../actions/keyAction'
import FormatRupiah from '../../utils/formatRupiah'

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
			<div>
				{ this.showForm() }
			</div>
		)
	}

	componentDidMount() {
		this.props.getKeys()
	}

	showForm() {
		return (
			<div>
				<div>
					<Form onSubmit={(e) => this.submitForm(e)}>
						<FormGroup>
							<Input className="dompet__content__key__topup__dropdown" type="select" name="aladinTopup" onChange={(e) => this.setState({ idKeySelected: e.target.value })}>
								<option selected="true" disabled="true" value=''>-- Select --</option>
								{this.props.keys.map((data, i) => {
									return (
										<option key={i} value={data.id}>{data.keyAmount} Kunci - {FormatRupiah(data.price)}</option>
									)
								})}
							</Input>
						</FormGroup>
						<FormGroup>
								<button className="dompet__content__key__button" color="primary" type="submit" size="lg" block>Beli</button>
						</FormGroup>
					</Form>
			</div>
				<div>
					<label className="alert__dompetAladin">{this.state.notif}</label>
				</div>
			</div>
		)
	}

  submitForm(e) {
    e.preventDefault()
    if (this.state.idKeySelected === '') {
      this.setState({
        notif: "Harus Pilih Salah Satu Voucher Aladin Key.",
      })
    } else {
        axios({
        method: 'POST',
        headers: {
					token: localStorage.getItem('token'),
					key: process.env.REACT_APP_KEY
					},
        url: `${process.env.REACT_APP_API_HOST}/topupKey`,
        data: {
					keyId: this.state.idKeySelected
        }
      })
      .then(({ data }) => {
				console.log('data', data)
				if (data.msg === 'not verified user') {
					return this.setState({
							notif: "Silahkan Verifikasi Email Untuk Membeli Kunci.",
					})
				} else {
					this.props.history.push(`/topupinvoice/${data.id}`)
				}
      })
      .catch(err => console.log('error'))
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
