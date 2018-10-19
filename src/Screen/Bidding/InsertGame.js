import React from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive';
import ModalPayment from '../Components/Modal/ModalPayment'
import FormatRupiah from '../../utils/formatRupiah'
import percentagePrice from '../../utils/percentagePrice'
import SplitPhone from '../../utils/splitPhone'
import CheckProvider from '../../utils/checkProvider'
class InsertPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      modalPayment: false,
      brandId: 0,
      brand: '',
      notif: ''
    }
    // this.handleBack()
  }

  togglePayment = () => {
    this.setState({
      modalPayment: !this.state.modalPayment,
    })
  }

  // displayPrice = () => {
  //   return this.props.location.state.displayPrice && (
  //     <label className="mobile-bidding__displayPrice">{this.props.location.state.displayPrice.toLocaleString(['ban', 'id'])}</label>
  //   )
  // }

	// formatRupiah() {
	// 	return this.props.location.state.aladinPrice && (
	// 		FormatRupiah(this.props.location.state.aladinPrice)
	// 	)
	// }

	cancel() {
		this.props.history.push('/home')
	}

  handleChangePhone(e) {

  }

  handleBack() {
    if (this.props.history.action === 'POP') {
      this.props.history.replace('/')
    }
  }

  // submitTransaction = async (e) => {
  //   e.preventDefault()
  //   const provider = CheckProvider(this.state.phone)
  //   if (provider !== 'Unknown Provider'){
  //     await this.setState({
  //       brand: provider.provider,
  //       brandId: provider.id
  //     })
  //     this.togglePayment()
  //   } else if ( provider === 'Unknown Provider'){
  //     this.setState({
  //       notif: "Nomor yang kamu masukkan tidak terdaftar. Mohon periksa kembali"
  //     });
  //   }
  // }

  renderModalPayment() {
    if (this.state.modalPayment) {
      if (this.props.location.state.typeBuy === 'buy pulsa'){
        return (
          <ModalPayment
            typeBuy='buy pulsa'
            fixedendpoint='v2/virtualaccount'
            retailendpoint='v2/payment'
            walletendpoint='v2/walletpulsa'
            bcaendpoint='bca/pulsa'
            isOpen={this.state.modalPayment}
            amount={this.props.location.state.aladinPrice}
            phone={SplitPhone(this.state.phone)}
            toggle={this.togglePayment}
            brand={this.state.brand}
            brandId={this.state.brandId}
            endpoint='transaction'
        />
        )
      } else if (this.props.location.state.typeBuy === 'buy paket data'){
        return (
          <ModalPayment
            typeBuy = 'buy paket data'
            fixedendpoint='virtualaccount'
            retailendpoint='payment'
            walletendpoint='walletpulsa'
            bcaendpoint='bca/paketdata'
            isOpen={this.state.modalPayment}
            amount={this.props.location.state.aladinPrice}
            phone={SplitPhone(this.state.phone)}
            toggle={this.togglePayment}
            brand={this.state.brand}
            endpoint='transaction'
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
          <h1 className="InsertPhone__textHead__font">LELANG GAME KAMU BERHASIL</h1>
        </div>
        <img className="InsertPhone__game__image" alt="Mobile Legend" src = 'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/MOBILE+LEGENDS+LOGO.png'/>
        <div className="InsertPhone__inputNumber">
          <div className="InsertPhone__game__inputHead">
            <h4 className="InsertPhone__inputHead__text">Masukkan Id Mobile Legend</h4>
            <h5>Untuk mengetahui User ID Anda, Silakan Klik menu profile dibagian kiri atas pada menu utama game. Dan user ID akan terlihat dibagian bawah Nama Karakter Game Anda. Silakan masukan User ID Anda untuk menyelesaikan transaksi. Contoh : 12345678(1234).</h5>
              {/* <input className="InsertPhone__inputHead__inputBox" value={ this.state.phone } type="number"
              onChange={ (e) => this.handleChangePhone(e) } /> */}

              <div className="InsertPhone__game__image__id">
                <img src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/MobileLegendId.jpeg" alt="Id Moblie Legend"/>
              </div>
              <div className="InsertPhone__game__inputHead__container">
                <input className="InsertPhone__game__inputHead__input1" type="number"/>
                <input className="InsertPhone__game__inputHead__input2" type="number"/>
              </div>
          </div>
        </div>
        <div className="InsertPhone__contentContainer">
          <div className="InsertPhone__contentContainer__priceDistance">
            <label className="InsertPhone__contentContainer__label">Terjual dengan harga:</label>
            {/* <label className="InsertPhone__contentContainer__price">{this.formatRupiah()}</label> */}
            <label className="InsertPhone__contentContainer__price">20.000</label>
            {/* <label className="InsertPhone__contentContainer__labelPercentage" >Kamu menghemat {percentagePrice(this.props.location.state.aladinPrice, this.props.location.state.displayPrice)}</label> */}
            <label className="InsertPhone__contentContainer__labelPercentage" >Kamu menghemat 20%</label>
          </div>
        </div>
        <label className="alert__game">{this.state.notif}</label>
        <div className="InsertPhone__buttonContainer">
          {/* <button type="submit" disabled={this.state.disabled} className = "InsertPhone__buttonContainer__button" onClick={(e) => this.submitTransaction(e)} >Lanjut</button> */}
          <button type="submit" disabled={this.state.disabled} className = "InsertPhone__buttonContainer__button">Lanjut</button>
          <button type="submit" className = "InsertPhone__buttonContainer__button" onClick={() => this.cancel()}>Batal</button>
        </div>
        {this.renderModalPayment()}
      </div>
    )
  }

  // renderMobileInsertPhone = () => {
  //   return (
  //     <div>
  //       <h1 className="mobile-InsertPhone__title">LELANG BERHASIL</h1>
  //       <div className="mobile-InsertPhone__container">
  //         <div className="mobile-InsertPhone__content__container">
  //           {this.displayPrice()}
  //           <div className="mobile-InsertPhone__content__priceDistance">
  //             <label className="mobile-InsertPhone__content__price">{this.formatRupiah()}</label>
  //             <label className="mobile-InsertPhone__content__labelPercentage" >Kamu menghemat {percentagePrice(this.props.location.state.aladinPrice, this.props.location.state.displayPrice)}</label>
  //           </div>
  //         </div>
  //         <label className="alert__otp">{this.state.notif}</label>
  //         <div className="mobile-InsertPhone__input">
  //           <input className="mobile-InsertPhone__input__inputBox" value={ this.state.phone } type="number"
  //           onChange={ (e) => this.handleChangePhone(e) } />
  //         </div>
  //         <label>Ex: 08x-xxx-xxx-xxx</label>
  //       </div>
  //       <div className="mobile-InsertPhone__button__container">
  //         <button type="submit" disabled={this.state.disabled} className = "mobile-InsertPhone__button" onClick={(e) => this.submitTransaction(e)} >Beli Sekarang</button>
  //         <button type="submit" style={{color:'red'}} className = "mobile-InsertPhone__button" onClick={() => this.cancel()}>Batal</button>
  //       </div>
  //       {this.renderModalPayment()}
  //     </div>
  //   )
  // }

  render() {
    console.log('props game', this.props)
    return (
      <div>
        {/* <MediaQuery query="(max-device-width: 720px)">
          {this.renderMobileInsertPhone()}
        </MediaQuery> */}
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
