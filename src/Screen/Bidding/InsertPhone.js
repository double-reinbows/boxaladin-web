import React from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'reactstrap'
import ModalPayment from '../Components/Modal/ModalPayment'
// import { validateProvider, detectProvider } from '../../utils/phone'
import ProviderModal from '../Home/Modal/ProviderModal';
import  priceProduct  from '../../utils/splitPrice'
import  productName from '../../utils/splitProduct'
import FormatRupiah from '../../utils/formatRupiah'
import percentagePrice from '../../utils/percentagePrice'
import SplitPhone from '../../utils/splitPhone'
import CheckProvider from '../../utils/checkProvider'
let aladinPrice = 0
class InsertPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      productUnlocked: {},
      providerModal: false,
      disabled: true,
      modalPayment: false,
      brandId: 0,
      brand: ''
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
      modalPayment: !this.state.modalPayment,

    })
  }

  renderModalPayment() {
    if (this.state.modalPayment) {
      if (this.props.location.state.id === 1){
        return (
          <ModalPayment
            text='buy pulsa 10k'
            fixedendpoint='v2/virtualaccount'
            retailendpoint='v2/payment'
            walletendpoint='v2/walletpulsa'
            isOpen={this.state.modalPayment}
            amount={aladinPrice}
            phone={SplitPhone(this.state.phone)}
            toggle={this.togglePayment}
            push={'payment'}
            brand={this.state.brand}
            brandId={this.state.brandId}
        />
        )
      } else {
        return (
          <ModalPayment
            text='buy pulsa'
            fixedendpoint='v2/virtualaccount'
            retailendpoint='v2/payment'
            walletendpoint='v2/walletpulsa'
            isOpen={this.state.modalPayment}
            amount={aladinPrice}
            phone={SplitPhone(this.state.phone)}
            toggle={this.togglePayment}
            push={'payment'}
            brand={this.state.brand}
            brandId={this.state.brandId}
        />
        )
      }
    }
    return null;
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
      {this.renderModalPayment()}
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
		// this.stopWatchProductPrice(this.props.selectedPriceID)
		this.props.history.push('/home')
	}

  componentDidMount() {
    aladinPrice = this.props.location.state.aladinPrice
    this.setState({
      productUnlocked: this.props.location.state.productUnlocked,
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

  submitTransaction = async (e) => {
    e.preventDefault()
    const provider = CheckProvider(this.state.phone)
    if (provider !== 'Unknown Provider'){
      await this.setState({
        brand: provider.provider,
        brandId: provider.id
      })
      this.togglePayment()
    } else if ( provider === 'Unknown Provider'){
      alert('Provider Tidak  Terdaftar')
    }
  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
    selectedPriceID: state.productReducer.selectedPriceID,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(InsertPhone)

export default connectComponent
