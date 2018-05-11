import React from 'react'
import { connect } from 'react-redux'
import {
	Form, FormGroup, Label, Input, Button
} from 'reactstrap'

import axios from 'axios'

import { getPhoneNumbers } from '../../../actions/'
import { validateProvider, detectProvider } from '../../../utils/phone'
import ProviderModal from '../../Home/Modal/ProviderModal';
import  priceProduct  from '../../../utils/splitPrice'
import  productName from '../../../utils/splitProduct'
import FormatRupiah from '../../../utils/formatRupiah'
import percentagePrice from '../../../utils/percentagePrice'

class InsertPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      productUnlocked: {},
			providerModal: false
    }

    this.handleBack()
  }

	toggle = () =>  {
		this.setState({
			providerModal: !this.state.providerModal
		})
	}

  render() {

		console.log(this.props)
		console.log(this.state.productUnlocked)

    return (
		<div>
		<div className="InsertPhone__textHead">
			<h1 className="InsertPhone__textHead__font">LELANG KAMU BERHASIL, BOEDJANGAN!</h1>
		</div>
		<div className="InsertPhone__inputNumber">
			<div className="InsertPhone__inputHead">
				<h4 className="InsertPhone__inputHead__text">Masukkan nomor hape kamu</h4>
				<div className="InsertPhone__inputHead__checkBox">
					<Input className="InsertPhone__inputHead__inputBox" value={ this.state.phone }
					onChange={ (e) => this.setState({	phone: e.target.value}) } />
					<div className="homecontent__bottom__check" style= {{ alignSelf: "center", paddingLeft: "20px"}}>
						<button onClick={this.toggle} className="homecontent__bottom__check__button" style = {{ fontSize: "15px"}}>CEK PROVIDER-MU</button>
					</div>
				</div>
				<label className="InsertPhone__inputHead__label">Ex: 08x-xxx-xxx-xxx</label>
			</div>
		</div>

		<div className="InsertPhone__contentContainer">
		  {this.logoPhone()}
			<div className="InsertPhone__contentContainer__textDistance">
				<h2 className="InsertPhone__contentContainer__text">{this.productName()}</h2>
				<h2 className="InsertPhone__contentContainer__text">{this.priceProduct()}</h2>
				<label className="InsertPhone__contentContainer__label">Terjual dengan harga:</label>
			</div>
			<div className="InsertPhone__contentContainer__priceDistance">
				<label className="InsertPhone__contentContainer__price">{this.formatRupiah()}</label>
				<label className="InsertPhone__contentContainer__labelPercentage" >Kamu menghemat {this.percentagePrice()}</label>
			</div>
		</div>

		<div className="InsertPhone__buttonContainer">

				<Button type="submit" className = "InsertPhone__buttonContainer__buttonBatal" onClick={() => this.cancel()}>Batal</Button>
				<Button type="submit" className = "InsertPhone__buttonContainer__buttonLanjut" onClick={(e) => this.submitTransaction(e)} >Lanjut</Button>

		</div>


      { /*<div className="InsertPhone">
        <h1 className="InsertPhone__text">Masukkan No Handphone Anda</h1>

        <Form onSubmit={(e) => this.submitTransaction(e)}>
          <FormGroup>
            <Label for="selectNumber"></Label>

						<Input type="tel" value={ this.state.phone } onChange={ (e) => this.setState({
              phone: e.target.value}) } />
          </FormGroup>

          <Button type="submit" color="primary" size="lg" block>Confirm</Button>

				</Form>
		  </div> */}
			<ProviderModal open={this.state.providerModal} buttonToggle={this.toggle}/>
		</div>
    )
  }

	logoPhone() {
		return this.state.productUnlocked.productName && (
			<img src={this.state.productUnlocked.brandLogo} className="InsertPhone__contentContainer__logo" alt="Logo pulsa"/>
		)
	}

	priceProduct() {
		return this.state.productUnlocked.productName && (
			priceProduct(this.state.productUnlocked.productName)
		)
	}

	productName() {
		return this.state.productUnlocked.productName && (
			productName(this.state.productUnlocked.productName)
		)
	}

	formatRupiah() {
		return this.state.productUnlocked.aladinPrice && (
			FormatRupiah(this.state.productUnlocked.aladinPrice)
		)
	}

	percentagePrice() {
		if (this.state.productUnlocked.aladinPrice === 'undefined' && this.state.productUnlocked.price === 'undefined') {
			return null
		} else {
			return (percentagePrice(this.state.productUnlocked.aladinPrice, this.state.productUnlocked.price))
		}
	}

	cancel() {
		// this.stopWatchProductPrice(this.props.selectedProductID)
		this.props.history.push('/home')
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
