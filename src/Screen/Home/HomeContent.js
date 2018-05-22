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
      logo: '',
      defaultName: '',
      defaultId: 0
    }
  }


  toggle = () =>  {
    this.setState({
      providerModal: !this.state.providerModal
    })
  }

  toggleBid = (pulsa, name, id) => {
    console.log('pulsa', name, id)
    this.setState({
      openModal: !this.state.openModal,
      pulsaValue: pulsa,
      defaultName: name,
      defaultId: id
    })
  }



  pulsaItem = () => {
    const pulsaItems = [
      {onClick: () => this.toggleBid('XL', 'Pulsa XL 25.000', 4), img: LogoXL, alt:"Logo XL"},
      {onClick: () => this.toggleBid('Telkomsel', 'Pulsa Telkomsel 25.000', 1), img: LogoTelkomsel, alt:"Logo Telkomsel"},
      {onClick: () => this.toggleBid('Smartfren', 'Pulsa Smartfren 25.000', 16), img: LogoSmart, alt:"Logo Smart"},
      {onClick: () => this.toggleBid('Indosat', 'Pulsa Indosat 25.000', 7), img: LogoIndosat, alt:"Logo Indosat"},
      {onClick: () => this.toggleBid('Tri', 'Pulsa Tri 25.000', 10), img: LogoTri, alt:"Logo Tri"}
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
            <label className="homecontent__top__text__bot">sistem lelang terbalik pertama yang menyajikan harga pulsa termurah Setanah air!</label>
            <label>Ingat  <b>PULSA ?</b></label>
            <div>
            <label>Ingat  <b>Boxaladin</b></label>
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
        <ModalBid isOpen={this.state.openModal} toggle={this.toggleBid} pulsaValue={this.state.pulsaValue} defaultId={this.state.defaultId} defaultName={this.state.defaultName}/>
      </div>
    )
  }
}

export default HomeContent;
