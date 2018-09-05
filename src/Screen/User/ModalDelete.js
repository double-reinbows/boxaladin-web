import React,{Component} from 'react';

import { Modal } from 'reactstrap'
import axios from 'axios'
import envChecker from '../../utils/envChecker'

class ModalDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  removePhone = () => {
		axios({
			method: 'DELETE',
			url: `${envChecker('api')}/phone/${this.props.phoneId}`,
			headers: {
				token: localStorage.getItem('token')
      }
		})
      this.props.toggle()
      window.location.reload();
	}

  render() {
    return (
      <Modal isOpen={this.props.isOpen} className="modal__check">
      <div className="modal__check__container">
        <div className="modal__check__delete__content">
          <label className="modal__check__delete__label"><b>Hapus Nomor Hape Anda ?</b></label>
        </div>
        <div className="modal__check__delete">
          <button className="modal__check__delete__button" onClick ={this.removePhone}>Ya</button>
          <button className="modal__check__delete__button" onClick={this.props.toggle}>Tidak</button>
        </div>
      </div>
      </Modal>
    )
  }
}

export default ModalDelete
