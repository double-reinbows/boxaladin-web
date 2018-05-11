import React, { Component } from 'react';

import ProviderModal from './Modal/ProviderModal';
import ModalBid from '../Components/Modal/ModalBid'

import LogoIndosat from '../../asset/LandingPage/pulsa/Indosat.svg';
import LogoSmart from '../../asset/LandingPage/pulsa/Smartfren.svg';
import LogoTelkomsel from '../../asset/LandingPage/pulsa/Telkomsel.svg';
import LogoTri from '../../asset/LandingPage/pulsa/Tri.svg';
import LogoXL from '../../asset/LandingPage/pulsa/XL.svg';


class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      providerModal: false,
      openModal: false,
      pulsaValue: '',
      logo: ''
    }
  }
  

  toggle = () =>  {
    this.setState({
      providerModal: !this.state.providerModal
    })
  }

  toggleBid = (pulsa) => {
    this.setState({
      openModal: !this.state.openModal,
      pulsaValue: pulsa,
    })
  }
  


  pulsaItem = () => {
    const pulsaItems = [
      {onClick: () => this.toggleBid('XL'), img: LogoXL, alt:"Logo XL"},
      {onClick: () => this.toggleBid('Telkomsel'), img: LogoTelkomsel, alt:"Logo Telkomsel"},
      {onClick: () => this.toggleBid('Smartfren'), img: LogoSmart, alt:"Logo Smart"},
      {onClick: () => this.toggleBid('Indosat'), img: LogoIndosat, alt:"Logo Indosat"},
      {onClick: () => this.toggleBid('Tri'), img: LogoTri, alt:"Logo Tri"}
    ]

    return pulsaItems.map(data => (
        <button onClick={data.onClick} className="homecontent__bottom__pulsa__button">
          <img className="homecontent__bottom__pulsa__button__image" src={data.img} alt={data.alt}/>
        </button>
      ) 
    )         
  }
  render() { 
    return (  
      <div className="homecontent__container">
        <div className="homecontent__top">
          <div className="homecontent__top__text">
            <label className="homecontent__top__text__top"><b>Semakin Dilihat, Semakin Murah</b></label>
            <label className="homecontent__top__text__bot">sistem lelang terbalik pertama yang menyajikan harga pulsa termurah sedunia!</label>
            <label>Ingat  <b>PULSA ?</b></label>
            <div>
            <label>Ingat  <b>Boxaladin</b></label>
            </div>
          </div>
          <div className="homecontent__top__youtube">
            <label>youtube</label>
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
        <ModalBid isOpen={this.state.openModal} toggle={this.toggleBid} pulsaValue={this.state.pulsaValue} logo={this.state.logo}/>
      </div>
    )
  }
}

export default HomeContent;