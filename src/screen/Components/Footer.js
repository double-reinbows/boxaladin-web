import React from 'react';

import logo from '../../asset/Logo/LogoBig.svg'

export default  class Footer extends React.Component {

  render() {
    return (
      <div className="footerz" >
        <div className="row text-center">
          <div className="col-sm-4">
            ABOUT US
          </div>

          <div className="col-sm-4">
            QUICKLINKS
          </div>

          <div className="col-sm-4">
            GET IN TOUCH
          </div>
        </div>
      </div>
    );
  }
}
