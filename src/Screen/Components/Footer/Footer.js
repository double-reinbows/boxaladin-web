// @flow
import React, {Component} from 'react';

import facebook from "../../../asset/SocialMedia/facebook-logo.png";
import instagram from "../../../asset/SocialMedia/instagram.png";
import line from "../../../asset/SocialMedia/line.png";
import { Link } from 'react-router-dom';
import ModalLineInfo from '../Modal/ModalLineInfo'

type State = {
  modalLineOpen: boolean,
}
export default  class Footer extends Component <Props, State> {

  state: State = {
    modalLineOpen: false,
  }

  toggleLineModal = (e: Event) => {
    e.preventDefault();
    this.setState({
      modalLineOpen: !this.state.modalLineOpen
    })
  }

  render() {
    return (
      <div className="footer__info">
        <ModalLineInfo isOpen={this.state.modalLineOpen} onToggle={this.toggleLineModal} />
        <div className="footer__info__button">
        <Link className="footer__info__button__content" to="/layanan"><b>Layanan Bantuan</b></Link>

        </div>
        <div className="footer__info__logo">
          <a href="#" onClick={(e: HTMLInputElement)=>this.toggleLineModal(e)}>
            <img className="footer__info__logo__content" src={line} alt="logo"/>
          </a>
          <a href="https://www.facebook.com/boxaladin/">
            <img className="footer__info__logo__content" src={facebook} alt="logo"/>
          </a>
          <a href="https://www.instagram.com/boxaladin/">
            <img className="footer__info__logo__content" src={instagram} alt="logo"/>
          </a>
        </div>
      </div>
    )
  }
}
