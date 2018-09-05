import React,{Component} from 'react';
import { Modal } from 'reactstrap'

class ModalCheck extends Component {

  render() { 
    return ( 
      <Modal isOpen={this.props.isOpen} className="modal__check">
        <div className="modal__check__container">
          <div className="modal__check__container__header">
            <button className="modal__check__button" onClick={this.props.toggle}>X</button>
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
