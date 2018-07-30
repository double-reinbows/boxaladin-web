import React, { Component } from 'react';
import axios from 'axios';
import envChecker from '../../utils/envChecker'
import ProviderModal from './Modal/ProviderModal';
import ModalBid from '../Components/Modal/ModalBid'

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerModal: false,
      openModal: false,
      brandName: '',
      logo: '',
      defaultId: 0,
      brand: '',
    }
    this.toggleBid = this.toggleBid.bind(this);
  }

  componentDidMount() {
    this.getBrand()
  }


  toggle = () =>  {
    this.setState({
      providerModal: !this.state.providerModal
    })
  }

  async toggleBid(brandName, id, logo) {
      await this.setState({
        brandName: brandName,
      defaultId: id,
      logo: logo
    })
    await this.setState({
      openModal: !this.state.openModal,
    })
  }

  pulsaItem() {
    if (!this.state.brand) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.state.brand.filter(data => {
          return data.brandName === 'Telkomsel' || data.brandName === 'XL' || data.brandName === 'Indosat' || data.brandName === 'Tri' || data.brandName === 'Smartfren'
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

  renderModalBid() {
    if (this.state.openModal) {
      return (
        <ModalBid
          isOpen={this.state.openModal}
          toggle={this.toggleBid}
          brandName={this.state.brandName}
          defaultId={this.state.defaultId}
          logo={this.state.logo}
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
          <iframe title="boxaladin intro" width="100%" height="100%" src="https://www.youtube.com/embed/DR0bccmd3b0" ></iframe>
          </div>
        </div>
        <div className="homecontent__bottom">
          <div className="homecontent__bottom__pulsa">
          {this.pulsaItem()}
          </div>
          <div className="homecontent__bottom__check">
            <button onClick={this.toggle} className="homecontent__bottom__check__button">CEK PROVIDER-MU</button>
          </div>
        </div>
        <ProviderModal open={this.state.providerModal} buttonToggle={this.toggle}/>
        {
          this.renderModalBid()
        }
      </div>
    )
  }
}

export default HomeContent;
