import React,{Component} from 'react';
// import PropTypes from 'prop-types';
import { Modal } from 'reactstrap'

class ModalCheck extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render() { 
    return ( 
      <Modal ariaHideApp={false} isOpen={this.props.openModalEmail} className="modal__check">
        <div className="modal__check__container">
        <div className="modal__check__container__header">
          <button className="modal__check__button" onClick={this.props.buttonToggle}>X</button>
        </div>
        <div className="modal__check__container__content">
          <label className="modal__check__label"><b>Cek Hape Anda</b></label>
        </div>
      </div>
      </Modal>
    )
  }
}

export default ModalCheck
