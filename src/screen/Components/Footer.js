import React from 'react';
export default  class Footer extends React.Component {

  render() {
    return (
      <div className="footerz">
          <ul className="navfooter">
            <li className="navf__item"><a href="/aboutus" className="linkfooter">About Us</a></li>
            <li className="navf__item"><a href="/aboutus" className="linkfooter">Get in touch</a></li>
            <li className="navf__item"><a href="/aboutus" className="linkfooter">How it works</a></li>
            <li className="navf__item"><a href="/aboutus" className="linkfooter">Contact us</a></li>
          </ul>
          <p className="copyright">
              &copy; Copyright 2017 by BoxAladin.
          </p>
      </div>
    );
  }
}
