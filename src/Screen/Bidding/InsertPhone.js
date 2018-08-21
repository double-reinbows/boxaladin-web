import React from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive';
import ModalPayment from '../Components/Modal/ModalPayment'
import ProviderModal from '../Home/Modal/ProviderModal';
import FormatRupiah from '../../utils/formatRupiah'
import percentagePrice from '../../utils/percentagePrice'
import SplitPhone from '../../utils/splitPhone'
import CheckProvider from '../../utils/checkProvider'
class InsertPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '08',
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

  displayPrice = () => {
    return this.props.location.state.displayPrice && (
      <label className="mobile-bidding__displayPrice">{this.props.location.state.displayPrice.toLocaleString(['ban', 'id'])}</label>
    )
  }

	formatRupiah() {
		return this.props.location.state.aladinPrice && (
			FormatRupiah(this.props.location.state.aladinPrice)
		)
	}

	cancel() {
		// this.stopWatchProductPrice(this.props.selectedPriceID)
		this.props.history.push('/home')
	}

  handleChangePhone(e) {

    let num = e.target.value.split('');
    if (num.length < 2) {
      this.setState({notif: 'Nomor Anda harus mulai dengan 08.', disabled: true});
    } else if(num[0] !== '0' || num[1] !== '8') {
      this.setState({phone: '08', disabled: true});
    } else if (num.length > 13) {
      this.setState({notif: 'Nomor Anda telah mencapai panjang maksimal.', disabled: true});
    } else {
      if (num.length >= 11) { //number long enough so enable submit button
        this.setState({phone: num.join(''), notif: '', disabled: false});
      } else { //number NOT long enough so disable submit button
        this.setState({phone: num.join(''), notif: '', disabled: true});
      }
    }

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

  renderModalPayment() {
    if (this.state.modalPayment) {
      if (this.props.location.state.typeBuy === 'buy pulsa'){
        return (
          <ModalPayment
            typeBuy='buy pulsa'
            id={this.props.location.state.id}
            fixedendpoint='v2/virtualaccount'
            retailendpoint='v2/payment'
            walletendpoint='v2/walletpulsa'
            isOpen={this.state.modalPayment}
            amount={this.props.location.state.aladinPrice}
            phone={SplitPhone(this.state.phone)}
            toggle={this.togglePayment}
            push={'payment'}
            brand={this.state.brand}
            brandId={this.state.brandId}
        />
        )
      } else if (this.props.location.state.typeBuy === 'buy paket data'){
        return (
          <ModalPayment
            typeBuy = 'buy paket data'
            id={this.props.location.state.id}
            fixedendpoint='virtualaccount'
            retailendpoint='payment'
            walletendpoint='walletpulsa'
            isOpen={this.state.modalPayment}
            amount={this.props.location.state.aladinPrice}
            phone={SplitPhone(this.state.phone)}
            toggle={this.togglePayment}
            push={'payment'}
            brand={this.state.brand}
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
          <div className="InsertPhone__contentContainer__priceDistance">
            <label className="InsertPhone__contentContainer__label">Terjual dengan harga:</label>
            <label className="InsertPhone__contentContainer__price">{this.formatRupiah()}</label>
            <label className="InsertPhone__contentContainer__labelPercentage" >Kamu menghemat {percentagePrice(this.props.location.state.aladinPrice, this.props.location.state.displayPrice)}</label>
          </div>
        </div>
        <label className="alert__game">{this.state.notif}</label>
        <div className="InsertPhone__buttonContainer">
          <button type="submit" disabled={this.state.disabled} className = "InsertPhone__buttonContainer__button" onClick={(e) => this.submitTransaction(e)} >Lanjut</button>
          <button type="submit" className = "InsertPhone__buttonContainer__button" onClick={() => this.cancel()}>Batal</button>
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
            {this.displayPrice()}
            <div className="mobile-InsertPhone__content__priceDistance">
              <label className="mobile-InsertPhone__content__price">{this.formatRupiah()}</label>
              <label className="mobile-InsertPhone__content__labelPercentage" >Kamu menghemat {percentagePrice(this.props.location.state.aladinPrice, this.props.location.state.displayPrice)}</label>
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
