import React, { Component } from 'react';

import ProviderModal from './Modal/ProviderModal';
import ModalXL from './Modal/ModalXL';
import ModalTelkomsel from './Modal/ModalTelkomsel';
import ModalSmart from './Modal/ModalSmartfren';
import ModalIndosat from './Modal/ModalIndosat';
import ModalTri from './Modal/ModalTri';

import LogoIndosat from '../../asset/LandingPage/pulsa/Indosat.svg';
import LogoSmart from '../../asset/LandingPage/pulsa/Smart.svg';
import LogoTelkomsel from '../../asset/LandingPage/pulsa/Telkomsel.svg';
import LogoTri from '../../asset/LandingPage/pulsa/Tri.svg';
import LogoXL from '../../asset/LandingPage/pulsa/Xl.svg';


class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      providerModal: false,
      modalXL : false,
      modalTelkomsel: false,
      modalIndosat: false,
      modalSmart: false,
      modalTri: false
    }

    // this.toggle = this.toggle.bind(this)

  }
  

  toggle = () =>  {
    this.setState({
      providerModal: !this.state.providerModal
    })
  }

  toggleXL = () => {
    this.setState({
      modalXL: !this.state.modalXL
    })
  }
  
  toggleTelkomsel = () => {
    this.setState({
      modalTelkomsel: !this.state.modalTelkomsel
    })
  }
  
  toggleSmart = () => {
    this.setState({
      modalSmart: !this.state.modalSmart
    })
  }

  toggleIndosat = () => {
    this.setState({
      modalIndosat: !this.state.modalIndosat
    })
  }

  toggleTri = () => {
    this.setState({
      modalTri: !this.state.modalTri
    })
  }

  render() { 
    console.log(this.props)
    return (  
      <div className="homecontent__container">
        <div className="homecontent__top">
          <div className="homecontent__top__text">
            <div className="homecontent__top__text">
              <label className="homecontent__top__text__top"><b>Semakin Dilihat, Semakin Murah</b></label>
              <label className="homecontent__top__text__bot">sistem lelang terbalik pertama yang menyajikan harga pulsa termurah sedunia!</label>
            </div>
            <div className="homecontent__top__text__remember">
              <label className="homecontent__top__text__remember__top">Ingat  <b>PULSA ?</b></label>
              <div>
              <label className="homecontent__top__text__remember__bot">Ingat  <b>Boxaladin</b></label>

              </div>
            </div>
          </div>
          <div className="homecontent__top__youtube">
            <label>youtube</label>
          </div>
        </div>
        <div className="homecontent__bottom">
          <div className="homecontent__bottom__pulsa">
            <button onClick={this.toggleXL} className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoXL} alt="Logo XL"/></button>
            <button onClick={this.toggleTelkomsel} className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoTelkomsel} alt="Logo Telkomsel"/></button>
            <button onClick={this.toggleSmart} className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoSmart} alt="Logo Smart"/></button>
            <button onClick={this.toggleIndosat} className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoIndosat} alt="Logo Indosat"/></button>
            <button onClick={ this.toggleTri} className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoTri} alt="Logo Tri"/></button>
          </div>
          <div className="homecontent__bottom__check">
            <button onClick={this.toggle} className="homecontent__bottom__check__button">CEK PROVIDER-MU</button>
          </div>
          <ProviderModal open={this.state.providerModal} buttonToggle={this.toggle}/>
          <ModalXL open={this.state.modalXL} buttonToggle={this.toggleXL} />
          <ModalTelkomsel open={this.state.modalTelkomsel} buttonToggle={this.toggleTelkomsel} />
          <ModalSmart open={this.state.modalSmart} buttonToggle={this.toggleSmart} />
          <ModalIndosat open={this.state.modalIndosat} buttonToggle={this.toggleIndosat} />
          <ModalTri open={this.state.modalTri} buttonToggle={this.toggleTri} />

        </div>
      </div>
    )
  }
}

export default HomeContent;