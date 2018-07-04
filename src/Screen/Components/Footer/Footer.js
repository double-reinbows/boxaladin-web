// @flow
import React, {Component} from 'react';
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
          {/* <a href="#" onClick={(e: HTMLInputElement)=>this.toggleLineModal(e)}> */}
            <img  onClick={(e: HTMLInputElement)=>this.toggleLineModal(e)} className="footer__info__logo__content" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/SocialMedia/line.png' alt="logo"/>
          {/* </a> */}
          <a href="https://www.facebook.com/boxaladin/">
            <img className="footer__info__logo__content" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/SocialMedia/facebook-logo.png' alt="logo"/>
          </a>
          <a href="https://www.instagram.com/boxaladin/">
            <img className="footer__info__logo__content" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/SocialMedia/instagram.png' alt="logo"/>
          </a>
        </div>
      </div>
    )
  }
}
