import React,{Component} from 'react';
import Modal from 'react-modal';
import { ModalHeader} from 'reactstrap';

class SuccessModalOtp extends Component {
  render() {
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} toggle={this.props.toggle} className='modal__otp' >
          <div className="modal__otp__container">
          <ModalHeader toggle={this.props.toggle} className="modal__otp__header"></ModalHeader>
            <div className="modal__otp__content">
              <h1 className="resetPassword__textSuccess">Nomor kamu berhasil di verifikasi.</h1>
              <h1 className="resetPassword__textSuccess">SELAMAT BERBELANJA!</h1>
              <div className="resetPassword__img">
                <img src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Home/checked.svg" alt="Check Icon"/>
              </div>
              <br/>
              <div>
                <h1>INGAT PULSA ? INGAT</h1>
                <img src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Logo/logoTextOnly.png" alt="Boxaladin"/>
              </div>
              <br/>
            </div>
          </div>
      </Modal>
    )
  }
}

export default SuccessModalOtp
