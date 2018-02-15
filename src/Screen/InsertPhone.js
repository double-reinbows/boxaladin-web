import React from 'react'
import { connect } from 'react-redux'
import {
	Form, FormGroup, Label, Input, Button
} from 'reactstrap'
import axios from 'axios'

import { getPhoneNumbers } from '../actions/'

class InsertPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      productUnlocked: {}
    }
  }

  render() {
    console.log('InsertPhone Props:', this.props);
    console.log('InsertPhone State:', this.state);
    
    return (
      <div>
        <h1>insert phone</h1>

        <Form onSubmit={(e) => this.submitTransaction(e)}>
          <FormGroup>
            <Label for="selectNumber"></Label>
            <Input onChange={(e) => this.setState({phone: e.target.value})} type="select" name="selectNumber" id="selectNumber">
              {this.props.phoneNumbers.map((phone, idx) => {
                return (
                  <option key={idx} value={phone.number}>{phone.number}</option>
                )
              })}
            </Input>
          </FormGroup>

          <Button type="submit" color="primary">Confirm</Button>
				</Form>
      </div>
    )
  }

  componentDidMount() {
    this.props.getPhoneNumbers()
    this.setState({productUnlocked: this.props.location.state.productUnlocked})
    this.setState({phone: this.props.location.state.phoneNumbers[0] ? this.props.location.state.phoneNumbers[0].number : ''})
  }

  submitTransaction(e) {
    e.preventDefault()
    console.log('submit now!')

    axios({
			method: 'POST',
			url: `http://localhost:3000/payment`,
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