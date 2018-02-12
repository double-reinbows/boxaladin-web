import React from 'react';
import logo from '../../asset/Logo/LogoBig.svg'

export default  class Footer extends React.Component {

  render() {
    return (
      <div>
        <div className="footerz">
          <div>
            <ul className="navfooter">
              <img src={logo} alt="logo" className="logo Navbarz__Link__img" href="/home"/>
              <li className="navf__item">
                <a href="/aboutus" className="linkfooter">Get in touch</a>
              </li>
              <li className="navf__item">
                <a href="/aboutus" className="linkfooter">How it works</a>
              </li>
              <li className="navf__item">
                <a href="/aboutus" className="linkfooter">Contact us</a>
              </li>
              <li className="navf__item">
                <a href="/aboutus" className="linkfooter">Our Social Media</a>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="footerz2">
          <p>
              &copy; Copyright 2017 by BoxAladin.
          </p>
        </div>
      </div>
    );
  }
}
