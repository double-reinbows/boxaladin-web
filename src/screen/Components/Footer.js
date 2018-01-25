import React from 'react';

export default  class Footer extends React.Component {

  render() {
    return (
      <div className="footerz fixed-bottom" >
        <div className="row text-center">
          <div className="col-sm-4">
            ABOUT US
          </div>

          <div className="col-sm-4">
            QUICKLINKS
          </div>

          <div className="col-sm-4">
            <div className="row">
              GET IN TOUCH
            </div>
            <div className="row">
              Home
            </div>
            <div className="row">
              Phone
            </div>
            <div className="row">
              Our Social Media
            </div>


          </div>
        </div>
      </div>
    );
  }
}
