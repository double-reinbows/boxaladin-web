import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import MediaQuery from 'react-responsive';
import ModalPayment from '../Components/Modal/ModalPayment'
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
      brand: '',
      notif: ''
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
            fixedendpoint='virtualaccountv2'
            retailendpoint='paymentv2'
            walletendpoint='walletpulsav2'
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
            fixedendpoint='virtualaccountv2'
            retailendpoint='paymentv2'
            walletendpoint='walletpulsav2'
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

  renderInsertPhone = () => {
    return (
      <div>
        <div className="InsertPhone__textHead">
          <h1 className="InsertPhone__textHead__font">LELANG KAMU BERHASIL</h1>
        </div>
        <div className="InsertPhone__inputNumber">
          <div className="InsertPhone__inputHead">
            <h4 className="InsertPhone__inputHead__text">Masukkan nomor hape kamu</h4>
            <div className="InsertPhone__inputHead__checkBox">
              <input className="InsertPhone__inputHead__inputBox" value={ this.state.phone } type="number"
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
        <label className="alert__game">{this.state.notif}</label>
        <div className="InsertPhone__buttonContainer">
          <Button type="submit" className = "InsertPhone__buttonContainer__buttonBatal" onClick={() => this.cancel()}>Batal</Button>
          <Button type="submit" disabled={this.state.disabled} className = "InsertPhone__buttonContainer__buttonLanjut" onClick={(e) => this.submitTransaction(e)} >Lanjut</Button>
        </div>
        <ProviderModal open={this.state.providerModal} buttonToggle={this.toggle}/>
        {this.renderModalPayment()}
      </div>
    )
  }

  renderMobileInsertPhone = () => {
    return (
      <div>
        <h1 className="mobile-InsertPhone__title">LELANG BERHASIL</h1>
        <div className="mobile-InsertPhone__container">
          <div className="mobile-InsertPhone__content__container">
            {/* <h2 className="mobile-InsertPhone__content__text">{this.priceProduct()}</h2> */}
            <div className="mobile-InsertPhone__content__priceDistance">
              <label className="mobile-InsertPhone__content__price">{this.formatRupiah()}</label>
              <label className="mobile-InsertPhone__content__labelPercentage" >Kamu menghemat {this.percentagePrice()}</label>
            </div>
          </div>
          <label className="alert__otp">{this.state.notif}</label>
          <div className="mobile-InsertPhone__input">
            <input className="mobile-InsertPhone__input__inputBox" value={ this.state.phone } type="number"
            onChange={ (e) => this.handleChangePhone(e) } />
          </div>
          <label>Ex: 08x-xxx-xxx-xxx</label>
        </div>
        <div className="mobile-InsertPhone__button__container">
          <button type="submit" disabled={this.state.disabled} className = "mobile-InsertPhone__button" onClick={(e) => this.submitTransaction(e)} >Beli Sekarang</button>
          <button type="submit" style={{color:'red'}} className = "mobile-InsertPhone__button" onClick={() => this.cancel()}>Batal</button>
        </div>
        {this.renderModalPayment()}
      </div>
    )
  }

  render() {
    return (
      <div>
        <MediaQuery query="(max-device-width: 720px)">
          {this.renderMobileInsertPhone()}
        </MediaQuery>
        <MediaQuery query="(min-device-width: 721px)">
          {this.renderInsertPhone()}
        </MediaQuery>
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
      this.setState({ 
        notif: "Nomor yang kamu masukkan tidak terdaftar. Mohon periksa kembali"
      });
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
