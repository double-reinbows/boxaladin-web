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
// import { validateProvider, detectProvider } from '../utils/phone'

class ClaimFreePulsa extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      win: this.props.history.location.state || null,
      phone: null,
      // productId: null,
      pulsaCode: null
    }

    this.checkWinToken()
	}

	render() {
    // const pulsa = this.props.products.filter(product => {
    //   return product.category === 'Pulsa' && product.price === this.state.win.gamerule.pulsaAmount
    // })

		return (
			<div className="TopupKey">
        <h1 className="TopupKey__text">Silahkan Masukan Nomor HP dan Jenis Pulsa</h1>

        <Form onSubmit={ (e) => this.submit(e) }>
          <FormGroup>
            <Input onChange={(e) => this.setState({ phone: e.target.value })} type="text" placeholder="Nomor HP" />
          </FormGroup>

          <FormGroup>
            <Input type="select" onChange={(e) => this.setState({ pulsaCode: e.target.value })}>
              <option selected disabled value={ null }>-- Pilih Pulsa --</option>
              <option value= 'htelkomsel10000'>Pulsa Telkomsel 10.000</option>
              <option value= 'xld10000' >Pulsa XL 10.000</option>
              <option value= 'hindosat10000' >Pulsa Indosat 10.000</option>
              <option value= 'hthree10000' >Pulsa Three 10.000</option>
              <option value= 'hsmart10000' >Pulsa Smart 10.000</option>

              {/* {pulsa.map((data, i) => {
                return (
                  <option key={i} value={data.id}>{data.productName}</option>
                )
              })} */}
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
    // this.resetWinToken()
  }

  resetWinToken() {
    if (this.state.win) {
      axios({
        method: 'PUT',
        headers: {
          key: process.env.REACT_APP_KEY
        },
        url: `${process.env.REACT_APP_API_HOST}/win/resettoken/${this.state.win.id}`
      })
      .then(({data}) => {

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
        headers: {
          key: process.env.REACT_APP_KEY
        },
        url: `${process.env.REACT_APP_API_HOST}/win/${this.state.win.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      
      .then(({data}) => {
        if (!data.winToken) {
          alert('EXPIRED!')
          this.props.history.replace('/')
        }
      })
      .catch(err => console.log(err))
    }
  }

  submit(e) {
    e.preventDefault()

    // let productSelected = this.props.products.filter(data => data.id === parseInt(this.state.pulsaCode, 10))[0]

    if (this.state.phone === null) {
      return alert('Harus masukan nomor HP.')
    } else if (this.state.pulsaCode === null) {
      return alert('Harus pilih pulsa.')
    // } else if (validateProvider(detectProvider(this.state.phone), productSelected.pulsaCode) === false) {
    //   return alert('Nomor HP tidak sesuai dengan Provider.')
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

  axiosTransaction(){
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/win/claimfreepulsa`,
      headers: {
        token: localStorage.getItem('token'),
        key: process.env.REACT_APP_KEY
      },
      data: {
        // productId: this.state.productId,
        phone: this.state.phone,
        pulsaCode: this.state.pulsaCode,
        winToken: this.state.win.winToken,
        authentication: process.env.REACT_APP_GAME_PASSWORD
      }
    })
    .then(({data}) => {
      this.props.history.push('/game')
    })
    .catch(err => {

    })
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
