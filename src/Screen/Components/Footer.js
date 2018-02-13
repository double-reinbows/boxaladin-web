import React from 'react';
export default  class Footer extends React.Component {

  render() {
    return (
      <div className="footerz" >
        <div className="row text-center" style={{marginRight:0,marginLeft:0}}>
          <div className="col-sm-4 footerz__body">
            ABOUT US
          </div>

          <div className="col-sm-4 footerz__body">
            QUICKLINKS
          </div>

          <div className="col-sm-4 footerz__body" style={{paddingRight:0}}>
            <div >
              GET IN TOUCH
            </div>
            <div >
              Home
            </div>
            <div >
              Phone
            </div>
            <div >
              Our Social Media
            </div>


          </div>
        </div>
      </div>
    );
  }
}
