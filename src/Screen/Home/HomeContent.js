import React, { Component } from 'react';

import LogoIndosat from '../../asset/LandingPage/pulsa/Indosat.svg'
import LogoSmart from '../../asset/LandingPage/pulsa/Smart.svg'
import LogoTelkomsel from '../../asset/LandingPage/pulsa/Telkomsel.svg'
import LogoTri from '../../asset/LandingPage/pulsa/Tri.svg'
import LogoXL from '../../asset/LandingPage/pulsa/Xl.svg'

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }
  render() { 
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
            <button className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoXL} alt="Logo XL"/></button>
            <button className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoTelkomsel} alt="Logo Telkomsel"/></button>
            <button className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoSmart} alt="Logo Smart"/></button>
            <button className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoIndosat} alt="Logo Indosat"/></button>
            <button className="homecontent__bottom__pulsa__button"><img className="homecontent__bottom__pulsa__button__image" src={LogoTri} alt="Logo Tri"/></button>
          </div>
          <div className="homecontent__bottom__check">
            <button className="homecontent__bottom__check__button">CEK PROVIDER-MU</button>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeContent;