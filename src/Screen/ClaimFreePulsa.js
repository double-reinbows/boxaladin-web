import React from 'react'
import { connect } from 'react-redux'
import {
	Button,
	Form,
	FormGroup,
	Input 
} from 'reactstrap'
import axios from 'axios'

import { getProducts } from '../actions/productAction'
import { validateProvider, detectProvider } from '../utils/phone'

class ClaimFreePulsa extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      win: this.props.history.location.state || null,
      phone: null,
      productId: null
    }

    this.checkWinToken()
	}

	render() {
		console.log('State:', this.state)
		console.log('Props:', this.props)
    const pulsa = this.props.products.filter(product => {
      return product.category === 'Pulsa' && product.price === this.state.win.gamerule.pulsaAmount
    })
    console.log(pulsa)

		return (
			<div className="container">
				<h1>Silahkan Masukan Nomor HP dan Jenis Pulsa</h1>

        <Form onSubmit={ (e) => this.submit(e) }>
          <FormGroup>
            <Input onChange={(e) => this.setState({ phone: e.target.value })} type="text" placeholder="Nomor HP" />
          </FormGroup>

          <FormGroup>
            <Input type="select" onChange={(e) => this.setState({ productId: e.target.value })}>
              {pulsa.map((data, i) => {
                return (
                  <option key={i} value={data.id}>{data.productName}</option>
                )
              })}
            </Input>
          </FormGroup>

          <FormGroup>
            <Button type="submit"> submit </Button>
          </FormGroup>
        </Form>
			</div>
		)
	}

  componentDidMount() {
    this.props.getProducts()
  }

  componentWillUnmount() {
    this.resetWinToken()
  }

  resetWinToken() {
    if (this.state.win) {
      axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API_HOST}/win/resettoken/${this.state.win.id}`
      })
      .then(({data}) => {
        console.log('DATA RESPONSE RESET TOKEN:',data)
      })
      .catch(err => console.log(err))
    }
  }

  checkWinToken() {
    if (this.state.win === null) {

      this.props.history.push('/')

    } else {

      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_HOST}/win/${this.state.win.id}`
      })
      .then(({data}) => {
        console.log('DATA RESPONSE GET WIN BY ID:', data)
        if (this.state.win.winToken !== data.winToken) {
          alert('EXPIRED!')
          this.props.history.replace('/')
        }
      })
      .catch(err => console.log(err))
    }
  }

  submit(e) {
    e.preventDefault()

    let productSelected = this.props.products.filter(data => data.id === parseInt(this.state.productId, 10))[0]

    if (validateProvider(detectProvider(this.state.phone), productSelected.brand) === false) {
      return alert('Nomor HP tidak sesuai dengan Provider.')
    } else {

      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/win/claimfreepulsa`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          productId: this.state.productId,
          phone: this.state.phone
        }
      })
      .then(({data}) => {
        console.log('DATA RESPONSE CLAIM FREE PULSA:', data)
        this.props.history.push('/game')
      })
      .catch(err => {
        console.log('ERROR CLAIM FREE PULSA:', err)
      })
    }
  }

}

const mapStateToProps = (state) => {
	return {
    products: state.productReducer.products,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    getProducts: () => dispatch(getProducts()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ClaimFreePulsa)

export default connectComponent
