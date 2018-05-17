// @flow
import React, {Component} from 'react';

import facebook from "../../../asset/SocialMedia/facebook-logo.png"
import instagram from "../../../asset/SocialMedia/instagram.png"
import line from "../../../asset/SocialMedia/line.png"
import { Link } from 'react-router-dom'



export default  class Footer extends Component <{}> {

  changePage = () => {
    this.props.history.push('/layanan')
  }

  render() {
    return (
      <div className="footer__info">
        <div className="footer__info__button">
        <Link className="footer__info__button__content" to="/layanan"><b>Layanan Bantuan</b></Link>

        </div>
        <div className="footer__info__logo">
          <a href="/line.com">
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
