import React, { Component } from 'react';
import Modal from 'react-modal';
// import PropTypes from 'prop-types';

class ModalOtpImage extends Component {
  // static propTypes = {
  //   toggle: PropTypes.func,
  //   isOpen: PropTypes.bool,
  //   text: PropTypes.string,
  // }
  render() { 
    return (  
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__otp__image">
        <div className="modal__otp__image__container">
          <img className="modal__otp__image__content" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/Cara+Kerja/otp-example.png' alt='otp'/>
        </div>
      </Modal>
    )
  }
}

export default ModalOtpImage

