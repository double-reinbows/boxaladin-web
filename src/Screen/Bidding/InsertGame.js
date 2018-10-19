import React from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive';
import ModalPayment from '../Components/Modal/ModalPayment'
import FormatRupiah from '../../utils/formatRupiah'
import percentagePrice from '../../utils/percentagePrice'
class InsertPhone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      modalPayment: false,
      brandId: 0,
      brand: '',
      notif: '',
      id1: '',
      id2: ''
    }
    // this.handleBack()
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
		this.props.history.push('/home')
	}

  handleChangeId = (e) => {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
    this.setState({
      disabled: false
    })
  }

  handleBack() {
    if (this.props.history.action === 'POP') {
      this.props.history.replace('/')
    }
  }

  submitTransaction = () => {
    const {id1, id2} = this.state
    if (!id1 || id1.length <= 4){
      return this.setState({
        notif: 'Format Id 1 Salah'
      })
    } else if (!id2 || id2.length < 4){
      return this.setState({
        notif: 'Format Id 2 Salah'
      })
    } else {
      return this.togglePayment()
    }
  }

  renderModalPayment() {
    if (this.state.modalPayment) {
      if (this.props.location.state.typeBuy === 'buy game'){
        return (
          <ModalPayment
            typeBuy='buy game'
            fixedendpoint='v2/virtualaccount'
            retailendpoint='v2/payment'
            walletendpoint='v2/walletpulsa'
            bcaendpoint='bca/pulsa'
            isOpen={this.state.modalPayment}
            amount={this.props.location.state.aladinPrice}
            toggle={this.togglePayment}
            brand='game'
            brandId={13}
            endpoint='transaction'
            idGame={this.state.id1 + this.state.id2}
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
            <div className="InsertPhone__game__image__id">
              <img src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/MobileLegendId.jpeg" alt="Id Moblie Legend"/>
            </div>
            <div className="InsertPhone__game__inputHead__container">
              <input placeholder=" user id" className="InsertPhone__game__inputHead__input1" name="id1" value={this.state.id1} onChange={this.handleChangeId} type="number"/>
              <input placeholder="user id 2" className="InsertPhone__game__inputHead__input2" maxLength={6} name="id2" value={this.state.id2} onChange={this.handleChangeId} type="number"/>
            </div>
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
        {this.renderModalPayment()}
      </div>
    )
  }

  renderMobileInsertPhone = () => {
    return (
      <div>
        <h1 >LELANG BERHASIL</h1>
        <div >
          <div >
            {this.displayPrice()}
            <div >
              <label >{this.formatRupiah()}</label>
              <label >Kamu menghemat {percentagePrice(this.props.location.state.aladinPrice, this.props.location.state.displayPrice)}</label>
            </div>
          </div>
          <label className="alert__otp">{this.state.notif}</label>
          <div >
            <input placeholder=" user id"  name="id1" value={this.state.id1} onChange={this.handleChangeId} type="number"/>
            <input placeholder="user id 2" maxLength={6} name="id2" value={this.state.id2} onChange={this.handleChangeId} type="number"/>
          </div>
        </div>
          <button type="submit" disabled={this.state.disabled}  onClick={(e) => this.submitTransaction(e)} >Beli Sekarang</button>
          <button type="submit" style={{color:'red'}} onClick={() => this.cancel()}>Batal</button>
        {this.renderModalPayment()}
      </div>
    )
  }

  render() {
    console.log('props game', this.props)
    console.log('id1', this.state.id1)
    console.log('id2', this.state.id2)
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
