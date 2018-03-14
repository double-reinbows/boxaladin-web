import React from 'react';
import { Button } from 'reactstrap';

import logo from "../../asset/Logo/LogoBig.svg"
import facebook from "../../asset/SocialMedia/facebook.svg"
import twitter from "../../asset/SocialMedia/twitter.svg"
import instagram from "../../asset/SocialMedia/instagram.svg"
import youtube from "../../asset/SocialMedia/youtube.svg"


export default  class Footer extends React.Component {

  render() {
    return (
      <div className="footerz" >
        <div className="footerz__Top">
          <div className="footerz__Top__Left">
              <a href="/home">
                <img src={logo} alt="logo" className="LogoFooter"/>
              </a>
              <label className="footerz__Top__Left__label">LINE @boxaladin</label>
              <Button className="footerz__Top__Left__button">Layanan Bantuan</Button>
            
          </div>

          <div className="footerz__Top__Right">
            <div className="FooterzKosong"></div>

            <div className="footerz__Top__Right__devide">
              <div className="footerz__Top__Right__Row1">
                <ul>
                  Tentang Box Aladin
                  <li className="footerz__Top__Right__Row1__list">About</li>
                  <li className="footerz__Top__Right__Row1__list">FAQ</li>
                  <li className="footerz__Top__Right__Row1__list">Cara Membeli</li>
                </ul>
              </div>

              <div className="footerz__Top__Right__Row2">
                <ul>
                  Produk
                  <li className="footerz__Top__Right__Row1__list">Pulsa</li>
                  <li className="footerz__Top__Right__Row1__list">Paket data</li>
                </ul>
              </div>

              <div className="footerz__Top__Right__Row3">

                Our Social Media
                <div className="footerz__Top__Right__Row3__logo">
                  <a href="/facebook.com">
                    <img src={facebook} alt="logo" className="LogoSosmed__facebook" href="/home"/>
                  </a>
                  <a href="/twitter.com">
                    <img src={twitter} alt="logo" className="LogoSosmed__twitter" href="/home"/>
                  </a>
                  <a href="/instagram.com">
                    <img src={instagram} alt="logo" className="LogoSosmed__instagram" href="/home"/>
                  </a>
                  <a href="/youtube.com">
                    <img src={youtube} alt="logo" className="LogoSosmed__youtube" href="/home"/>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="footerz__Bot">
          <div className="footerz__Bot__labelTop">
            <label className="footerz__Bot__label">Dilindungi oleh Hak Cipta dan berbadan hukum resmi.</label>
          </div>
          <div className="footerz__Bot__labelBot">
            <label className="footerz__Bot__label">Est.2016 PT BOX ALADIN ASIAPASIFIC</label>
          </div>
        </div>


      </div>
    )
  }
}
