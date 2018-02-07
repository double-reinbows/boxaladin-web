import React from 'react';
import logo from '../../asset/Logo/LogoBig.svg'

export default  class Footer extends React.Component {

  render() {
    return (
      <div>
        <div className="footerz">
          <ul className="navfooter">
            <div>
              <img src={logo} alt="logo" className="logo Navbarz__Link__img" href="/home"/>
            </div>
            <div>
              <col>
                <li className="navf__item"><a href="/aboutus" className="linkfooter">Get in touch</a></li>
                <li className="navf__item"><a href="/aboutus" className="linkfooter">How it works</a></li>
                <li className="navf__item"><a href="/aboutus" className="linkfooter">Contact us</a></li>
              </col>
              <col>
                <li className="navf__item"><a href="/aboutus" className="linkfooter">Sosial media</a></li>
              </col>
            </div>
          </ul>
        </div>

        <div className="footerz2">
          <p className="copyright">
              &copy; Copyright 2017 by BoxAladin.
          </p>
        </div>
      </div>
    );
  }
}
