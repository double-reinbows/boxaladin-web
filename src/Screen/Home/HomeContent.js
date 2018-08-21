import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import envChecker from '../../utils/envChecker'
import ProviderModal from './Modal/ProviderModal';
import ModalConfirm from './Modal/ModalConfirm'
import ModalBid from '../Components/Modal/ModalBid'
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
      tabActive1: 'tabactive',
      tabActive2: '',
      brand: '',
      brandName: '',
      brandId: 0,
      type: ''
    }
  }

  componentDidMount() {
    this.getPrice()
    this.getBrand()
  }

  toggle = () =>  {
    this.setState({
      providerModal: !this.state.providerModal
    })
  }

  toggleConfirm = (id, displayPrice) => {
    this.setState({
      openModal: !this.state.openModal,
      priceId: id,
      displayPrice,
      type: 'price'
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
        price.map((data, index) => {
          return(
            <button key={index} onClick={() => this.toggleConfirm(data.id, data.displayPrice)} className="homecontent__bottom__pulsa__button baBackground">{data.displayPrice.toLocaleString(['ban', 'id'])}</button>
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
          <div >
            <h2 className="homecontent__bottom__pulsa__label">Pilih Nominal Pulsamu</h2>
            <div className="homecontent__bottom__pulsa">
              {this.price()}
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h2 className="homecontent__bottom__pulsa__label">Pilih Paket Datamu</h2>
            <div className="homecontent__bottom__pulsa">
              {this.paketData()}
            </div>
          </div>
          )
      default:
        return tab
    }
  }

  changeTab = (value) => {
    this.setState({
      tab: value,
      tabActive1: this.state.tabActive2,
      tabActive2: this.state.tabActive1
    });
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
          <iframe title="boxaladin intro" width="100%" height="100%" src="https://www.youtube.com/embed/DR0bccmd3b0" ></iframe>
          </div>
        </div>
        <div className="homecontent__bottom">
        <div className='home-tab-container'>
          <button className={`${this.state.tabActive1} home-tab`} onClick={() => this.changeTab(1)}>PULSA</button>
          <button className={`${this.state.tabActive2} home-tab`} onClick={() => this.changeTab(2)}>PAKET DATA</button>
        </div>
          {this.renderTab()}
          <div className="homecontent__bottom__check">
            <button onClick={this.toggle} className="homecontent__bottom__check__button">CEK PROVIDER-MU</button>
          </div>
        </div>
        <ProviderModal open={this.state.providerModal} buttonToggle={this.toggle}/>
        <ModalConfirm
          typeBuy='buy pulsa'
          firebase= {envChecker('price')}
          displayPrice={this.state.displayPrice}
          open={this.state.openModal}
          toggle={this.toggleConfirm}
          priceId={this.state.priceId}
          type={this.state.type}
        />
        {this.renderModalBid()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(HomeContent)

export default connectComponent
