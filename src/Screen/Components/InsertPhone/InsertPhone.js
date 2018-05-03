import React from 'react'
import { connect } from 'react-redux'
import {
	Form, FormGroup, Label, Input, Button
} from 'reactstrap'

import axios from 'axios'

import { getPhoneNumbers } from '../../../actions/'
import { validateProvider, detectProvider } from '../../../utils/phone'

class InsertPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      productUnlocked: {}
    }

    this.handleBack()
  }

  render() {


    return (
      <div className="InsertPhone">
        <h1 className="InsertPhone__text">Masukkan No Handphone Anda</h1>

        <Form onSubmit={(e) => this.submitTransaction(e)}>
          <FormGroup>
            <Label for="selectNumber"></Label>

						<Input type="tel" value={ this.state.phone } onChange={ (e) => this.setState({
              phone: e.target.value}) } />
          </FormGroup>

          <Button type="submit" color="primary" size="lg" block>Confirm</Button>

				</Form>
      </div>
    )
  }

  componentDidMount() {
    this.props.getPhoneNumbers()
    this.setState({productUnlocked: this.props.location.state.productUnlocked})
		this.setState({
			phone: this.props.location.state.phoneNumbers[0] ? this.props.location.state.phoneNumbers.filter(data => data.primary === true)[0].number : ''
    })
  }

  handleBack() {
    if (this.props.history.action === 'POP') {
      this.props.history.replace('/')
    }
  }

  axiosTransaction(){
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/payment`,
      headers: {
        key: process.env.REACT_APP_KEY,
        token: localStorage.getItem('token')
      },
      data: {
        amount: this.state.productUnlocked.aladinPrice,
        productId: this.state.productUnlocked.id,
        phoneNumber: this.state.phone
      },
    })
    .then(({data}) => {
      this.props.history.push(`/payment/${data.id}`)
    })
    .catch(err => console.log(err))
  }

  submitTransaction(e) {
    e.preventDefault()

    if (validateProvider(detectProvider(this.state.phone), this.state.productUnlocked.brand) === false) {
      return alert('Nomor HP tidak sesuai dengan Provider.')
    } else {
      var num = this.state.phone.split('')
      if (num[0] === '0') {
        num.splice(0, 1, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.axiosTransaction()})
      } else if (num[0] + num[1] + num[2] === '+62') {
        num.splice(0, 3, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.axiosTransaction()})
      } else if (num[0] + num[1] === '62') {
        num.splice(0, 2, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.axiosTransaction()})
      } else if (num[0] === '8') {
        num.splice(0, 0, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.axiosTransaction()})
      }
    }
  }

}

const mapStateToProps = (state) => {
  return {
		phoneNumbers: state.userReducer.phoneNumbers,
		selectedProductID: state.productReducer.selectedProductID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		getPhoneNumbers: () => dispatch(getPhoneNumbers())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(InsertPhone)

export default connectComponent
