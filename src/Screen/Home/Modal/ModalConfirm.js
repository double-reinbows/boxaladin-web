import React, { Component } from 'react';

import { Modal } from 'reactstrap'
import { Link } from 'react-router-dom'

class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    }
  }

  render() { 
    return (  
      <Modal isOpen={this.props.open} className="modal__confirm">
        <div className="modal__confirm__container">
          <div className="modal__confirm__label">
            <label><b>1x intip = 1 kunci aladin. Lanjutkan ?</b></label>
          </div>
          <div className="modal__confirm__button">
            <Link to="/bidding">
              <button className="modal__confirm__button__yes">YA</button>
            </Link>
            <button className="modal__confirm__button__no" onClick={this.props.toggle}>TIDAK</button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ModalConfirm;