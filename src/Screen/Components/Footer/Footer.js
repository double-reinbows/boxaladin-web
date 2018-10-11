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
    value: ''
  }

  toggleLineModal = (e: Event) => {
    this.setState({
      modalLineOpen: !this.state.modalLineOpen,
      value: e
    })
  }
  
  checkModal = () => {
    const { modalLineOpen, value } = this.state
    if (modalLineOpen) {
      return (
        <ModalLineInfo isOpen={modalLineOpen} value={value} onToggle={this.toggleLineModal} />
      )
    }
    return null
  }

  render() {
    return (
      <div className="footer__info">
        <div className="footer__info__button">
        <Link className="footer__info__button__content" to="/layanan"><b>Layanan Bantuan</b></Link>
        </div>
        <div className="footer__info__logo">
          <div >
            <img onClick={(e: HTMLInputElement)=>this.toggleLineModal('wa')} className="footer__info__logo__content__wa" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/SocialMedia/whatsapp-logo.png' alt="logo"/>
          </div>
          <div>
            <img  onClick={(e: HTMLInputElement)=>this.toggleLineModal('line')} className="footer__info__logo__content" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/SocialMedia/line.png' alt="logo"/>
          </div>
          <div>
          <a href="https://www.facebook.com/boxaladin/">
            <img className="footer__info__logo__content" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/SocialMedia/facebook-logo.png' alt="logo"/>
          </a>
          </div>
          <div>
          <a href="https://www.instagram.com/boxaladin/">
            <img className="footer__info__logo__content" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/SocialMedia/instagram.png' alt="logo"/>
          </a>
          </div>
        </div>
        {this.checkModal()}
      </div>
    )
  }
}
