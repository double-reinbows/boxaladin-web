import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import envChecker from '../../utils/envChecker'
import ProviderModal from './Modal/ProviderModal';
import ModalConfirm from './Modal/ModalConfirm'
import ModalBid from '../Components/Modal/ModalBid'
import { setIsLoading } from '../../actions';
import Loading from '../Components/Loading';
// import ModalPln from './Modal/ModalPln'
import GameContainer from './TabContent/Game/GameContainer'

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerModal: false,
      openModal: false,
      openModalBid: false,
      priceId: 0,
      displayPrice: 0,
      price: '',
      tab: 1,
      brand: '',
      brandName: '',
      brandId: 0,
      type: '',
      typeBuy: '',
      inputPln: "",
      success: false,
      notif: '',
      kwh: [],
      diamondMl: 0
    }
  }

  componentDidMount() {
    this.props.setIsLoading(false)
    this.getPrice()
    this.getBrand()
  }

  toggle = () =>  {
    this.setState({
      providerModal: !this.state.providerModal
    })
  }

  toggleConfirm = (id, displayPrice, typeBuy, diamondMl) => {
    const diamond = diamondMl ? (diamondMl) : 0
    this.setState({
      openModal: !this.state.openModal,
      priceId: id,
      displayPrice,
      type: 'price',
      typeBuy,
      diamondMl: diamond
    })
  }

  toggleBid = async (brandName, id, logo) => {
    await this.setState({
    brandName: brandName,
    brandId: id,
    logo: logo,
    type: 'product'
  })
  await this.setState({
    openModalBid: !this.state.openModalBid,
  })
}

renderModalBid() {
  if (this.state.openModalBid) {
    return (
      <ModalBid
        typeBuy ='buy paket data'
        firebase={envChecker('firebase')}
        isOpen={this.state.openModalBid}
        toggle={this.toggleBid}
        brandName={this.state.brandName}
        priceId={this.state.brandId}
        logo={this.state.logo}
        type={this.state.type}
      />
    )
  }
  return null;
}

  price() {
    const { price } = this.state
    if (!price) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        price.filter(dataFilter => {
          return dataFilter.id !== 6
        }).map((data, index) => {
          return(
            <button key={index} onClick={() => this.toggleConfirm(data.id, data.displayPrice, 'buy pulsa')} className="homecontent__bottom__pulsa__button baBackground">{data.displayPrice.toLocaleString(['ban', 'id'])}</button>
          )
        })
      )
    }
  }

  paketData() {
    if (!this.state.brand) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.state.brand.filter(data => {
          return data.brandName === 'Telkomsel' || data.brandName === 'XL' || data.brandName === 'Indosat' || data.brandName === 'Tri'
        })
        .map((data, i) => {
          const pulsaItems = [
            {onClick: () => this.toggleBid(`${data.brandName}`, data.id, data.brandLogo), img: data.brandLogo, alt:`Logo ${data.brandName}`, name: data.brandName},
          ]
          return pulsaItems.map(data => (
            <button key={i} onClick={data.onClick} className="homecontent__bottom__pulsa__button">
              <img className="homecontent__bottom__pulsa__button__image" src={data.img} alt={data.alt}/>
            </button>
          )
        )
        })
      )
    }
  }

  renderPln = () => {
    return (
      <Fragment>
        <h2 className="homecontent__bottom__pulsa__label">Masukkan No PLN Anda</h2>
        <div className="homecontent__bottom__pulsa">
          <div className="homecontent__bottom__pln">
            <input className={`homecontent__bottom__pln__input ${this.checkSuccess()}`} value={this.state.inputPln} onChange={this.checkPlnNumber}/>
            <button disabled={this.state.disabledCheck} className="homecontent__bottom__pln__button baButton" onClick={this.submitPlnNumber}>Lanjut</button>
            <br/>
            <label>{this.state.notif}</label>
          </div>
        </div>
      </Fragment>
    )
  }

  checkSuccess = ()  => {
    const { success } = this.state
    if (success) {
      return ("isValid")
    } else {
      return ("isInvalid")
    }
  }

  checkPlnNumber = (e) => {
    this.setState({
      inputPln: e.target.value,
      disabledCheck: false
    })
  }

  submitPlnNumber = () =>{
    this.props.setIsLoading(true)
    axios({
      method: 'POST',
      url: `${envChecker('api')}/checkuserpln`,
      data: {
        tokenNumber : this.state.inputPln
      }
    })
    .then(response=> {
      this.props.setIsLoading(false)
      if (response.data.data.message._text === "SUCCESS"){
        this.setState({
          success:true,
          button:false,
          kwh: response.data.kwh
        })
      } else {
        this.setState({
          notif: 'No Yang Anda Masukkan Salah',
          success: false
        })
      }
    })
  }

  getPrice = () => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/api/price`,
    })
    .then(response => {
      this.setState({
        price: response.data
      })
    })
    .catch(err => console.log('error'))
  }

  getBrand = () => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/api/brand`,
    })
    .then(response => {
      this.setState({
        brand: response.data
      })
    })
    .catch(err => console.log('error'))
  }

  renderTab = () => {
    const {tab} = this.state
    switch (tab) {
      case 1:
        return (
          <Fragment>
            <div >
              <h2 className="homecontent__bottom__pulsa__label">Pilih Nominal Pulsamu</h2>
              <div className="homecontent__bottom__pulsa">
                {this.price()}
              </div>
            </div>
            <div className="homecontent__bottom__check">
              <button onClick={this.toggle} className="homecontent__bottom__check__button">CEK PROVIDER-MU</button>
            </div>
          </Fragment>
        )
      case 2:
        return (
          <Fragment>
            <div>
              <h2 className="homecontent__bottom__pulsa__label">Pilih Provider Datamu</h2>
              <div className="homecontent__bottom__pulsa">
                {this.paketData()}
              </div>
            </div>
            <div className="homecontent__bottom__check">
              <button onClick={this.toggle} className="homecontent__bottom__check__button">CEK PROVIDER-MU</button>
            </div>
          </Fragment>
          )
      case 3:
      return (
        <div>
          {this.plnSuccess()}
        </div>
        )
      case 4:
      return (
        <div>
          <GameContainer
            onClick={this.toggleConfirm}
          />
        </div>
        )
      default:
        return tab
    }
  }

  plnSuccess = () => {
    const { price, success} = this.state
    if (success) {
      return(
      <Fragment>
        <h2 className="homecontent__bottom__pulsa__label">Pilih Token Listrikmu</h2>
        <div className="homecontent__bottom__pulsa">
          {price.filter(dataFilter => {
            return dataFilter.id !== 1 && dataFilter.id !== 2 && dataFilter.id !== 5
          }).map((data, index) => {
          return(
            <button key={index} onClick={() => this.toggleConfirm(data.id, data.displayPrice, 'buy pln')} className="homecontent__bottom__pulsa__button baBackground">{data.displayPrice.toLocaleString(['ban', 'id'])}</button>
          )
          })}
        </div>
      </Fragment>
      )
    } else {
      return (
        this.renderPln()
      )
    }
  }

  changeTab = (value) => {
    this.setState({
      tab: value,
    });
  }

  checkActive = (value) => {
    const { tab } = this.state
    if (value === tab) {
      return 'tabactive'
    } else {
      return ''
    }
  }

  renderModalConfirm() {
    if (this.state.openModal) {
      return (
        <ModalConfirm
          typeBuy ={this.state.typeBuy}
          firebase= {envChecker('price')}
          displayPrice={this.state.displayPrice}
          open={this.state.openModal}
          toggle={this.toggleConfirm}
          priceId={this.state.priceId}
          type={this.state.type}
          pln={this.state.inputPln}
          kwh={this.state.kwh}
          diamondMl={this.state.diamondMl}
        />
      )
    }
    return null;
  }

  render() {
    return (
      <div className="homecontent__container">
        <div className="homecontent__top">
          <div className="homecontent__top__text">
            <label className="homecontent__top__text__top"><b>Semakin Dilihat, Semakin Murah</b></label>
            <label className="homecontent__top__text__bot">sistem lelang terbalik pertama yang menyajikan harga pulsa termurah Setanah air!</label>
            <label>Ingat  <b>PULSA ?</b></label>
            <div>
            <label>Ingat  <img style = {{ width: '55%' }}src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Logo/logoTextOnly.png" alt="boxaladin" /></label>
            </div>
          </div>
          <div className="homecontent__top__youtube">
          <iframe title="boxaladin intro" width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLBVbVVQLrYxQHfTYfWf0xlrbAYQjajJ8e" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </div>
        </div>
        <div className="homecontent__bottom">
        <div className='home-tab-container'>
          <button className={`${this.checkActive(1)} home-tab`} onClick={() => this.changeTab(1)}>PULSA</button>
          <button className={`${this.checkActive(2)} home-tab`} onClick={() => this.changeTab(2)}>PAKET DATA</button>
          <button className={`${this.checkActive(3)} home-tab`} onClick={() => this.changeTab(3)}>TOKEN LISTRIK</button>
          <button className={`${this.checkActive(4)} home-tab`} onClick={() => this.changeTab(4)}>VOUCHER GAME</button>
        </div>
          {this.renderTab()}
        </div>
        <ProviderModal open={this.state.providerModal} buttonToggle={this.toggle}/>
        {this.renderModalConfirm()}
        {this.renderModalBid()}
        <Loading isLoading={ this.props.isLoading } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
    isLoading: state.loadingReducer.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoading: (bool) => dispatch(setIsLoading(bool))
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(HomeContent)

export default connectComponent
