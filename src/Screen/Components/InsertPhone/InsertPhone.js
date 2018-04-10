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
    console.log('InsertPhone Props:', this.props);
    console.log('InsertPhone State:', this.state);

    return (
      <div className="InsertPhone">
        <h1 className="InsertPhone__text">Masukkan No Handphone Anda</h1>

        <Form onSubmit={(e) => this.submitTransaction(e)}>
          <FormGroup>
            <Label for="selectNumber"></Label>

						<Input type="tel" value={ this.state.phone } onChange={ (e) => this.setState({phone: e.target.value}) } />
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

  submitTransaction(e) {
    e.preventDefault()
    console.log('submit now!')

    if (validateProvider(detectProvider(this.state.phone), this.state.productUnlocked.brand) === false) {
      return alert('Nomor HP tidak sesuai dengan Provider.')
    } else {
      
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/payment`,
        data: {
          amount: this.state.productUnlocked.aladinPrice,
          productId: this.state.productUnlocked.id,
          phoneNumber: this.state.phone
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log('Data dari create transaction:', data)
        this.props.history.push(`/payment/${data.id}`)
      })
      .catch(err => console.log(err))
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
