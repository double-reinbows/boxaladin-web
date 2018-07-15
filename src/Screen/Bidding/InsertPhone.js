import React from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'reactstrap'
import { getPhoneNumbers } from '../../actions/'
import ModalBankPayment from '../Components/Modal/ModalBankPayment'
import { validateProvider, detectProvider } from '../../utils/phone'
import ProviderModal from '../Home/Modal/ProviderModal';
import  priceProduct  from '../../utils/splitPrice'
import  productName from '../../utils/splitProduct'
import FormatRupiah from '../../utils/formatRupiah'
import percentagePrice from '../../utils/percentagePrice'

let aladinPrice = 0
class InsertPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      productUnlocked: {},
      providerModal: false,
      disabled: true,
      modalBankPayment: false,
    }
    this.handleBack()
  }
  

	toggle = () =>  {
		this.setState({
			providerModal: !this.state.providerModal
		})
  }

  togglePayment = () => {
    this.setState({
      modalBankPayment: !this.state.modalBankPayment
    })
  }

  render() {
    return (
		<div>
		<div className="InsertPhone__textHead">
			<h1 className="InsertPhone__textHead__font">LELANG KAMU BERHASIL</h1>
		</div>
		<div className="InsertPhone__inputNumber">
			<div className="InsertPhone__inputHead">
				<h4 className="InsertPhone__inputHead__text">Masukkan nomor hape kamu</h4>
				<div className="InsertPhone__inputHead__checkBox">
					<Input className="InsertPhone__inputHead__inputBox" value={ this.state.phone } type="number"
					onChange={ (e) => this.handleChangePhone(e) } />
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
				<Button type="submit" disabled={this.state.disabled} className = "InsertPhone__buttonContainer__buttonLanjut" onClick={(e) => this.submitTransaction(e)} >Lanjut</Button>

		</div>

			<ProviderModal open={this.state.providerModal} buttonToggle={this.toggle}/>
      <ModalBankPayment 
      text='buy pulsa'
      fixedendpoint='virtualaccount'
      retailendpoint='payment'
      walletendpoint='walletpulsa'
      isOpen={this.state.modalBankPayment} 
      amount={aladinPrice} 
      phone={this.state.phone}
      productId={this.state.productUnlocked}
      toggle={this.togglePayment} 
      push={'payment'}
      />
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
		return aladinPrice && (
			FormatRupiah(aladinPrice)
		)
	}

	percentagePrice() {
		if (aladinPrice === 'undefined' && this.state.productUnlocked.price === 'undefined') {
			return null
		} else {
			return (percentagePrice(aladinPrice, this.state.productUnlocked.price))
		}
	}

	cancel() {
		// this.stopWatchProductPrice(this.props.selectedProductID)
		this.props.history.push('/home')
	}

  componentDidMount() {
    this.props.getPhoneNumbers()
    aladinPrice = this.props.location.state.aladinPrice
    this.setState({
      productUnlocked: this.props.location.state.productUnlocked,
      phone: this.props.location.state.phoneNumbers[0] ? '' : ''
    })
  }

  handleChangePhone(e) {
    this.setState({
      phone: e.target.value,
      disabled: false
    })
  }

  handleBack() {
    if (this.props.history.action === 'POP') {
      this.props.history.replace('/')
    }
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
        () => {this.togglePayment()})
      } else if (num[0] + num[1] + num[2] === '+62') {
        num.splice(0, 3, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.togglePayment()})
      } else if (num[0] + num[1] === '62') {
        num.splice(0, 2, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.togglePayment()})
      } else if (num[0] === '8') {
        num.splice(0, 0, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.togglePayment()})
      }
    }
  }

}

const mapStateToProps = (state) => {
  return {
		phoneNumbers: state.userReducer.phoneNumbers,
    selectedProductID: state.productReducer.selectedProductID,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhoneNumbers: () => dispatch(getPhoneNumbers()),

  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(InsertPhone)

export default connectComponent
