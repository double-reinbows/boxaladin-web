import React,{Component} from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
// import Modal from 'react-modal'

import { Modal } from 'reactstrap'
import axios from 'axios'
import { getPhoneNumbers } from '../../actions/'
import envChecker from '../../utils/envChecker'


class ModalDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  removePhone = (phone) => {
		// alert('Remove phone here!')
		axios({
			method: 'DELETE',
			url: `${envChecker('api')}/phone/${this.props.phone}`,
			headers: {
				key: process.env.REACT_APP_KEY
			}
		})
		.then(({data}) => {
      this.props.getPhoneNumbers()
      this.props.buttonToggle()
      // window.location.reload();
		})
		.catch(err => console.log(err))
	}

  render() {
    return (
      <Modal ariaHideApp={false} isOpen={this.props.openModalDelete} className="modal__check">
      <div className="modal__check__container">
        <div className="modal__check__container__header">
          <button className="modal__check__button" onClick={this.props.buttonToggle}>X</button>
        </div>
        <div className="modal__check__delete__content">
          <label className="modal__check__delete__label"><b>Hapus Nomor Hape Anda ?</b></label>
        </div>
        <div className="modal__check__delete">
          <button className="modal__check__delete__button" onClick ={this.removePhone}>Ya</button>
          <button className="modal__check__delete__button" onClick={this.props.buttonToggle}>Tidak</button>
        </div>
      </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		phoneNumbers: state.userReducer.phoneNumbers
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPhoneNumbers: () => dispatch(getPhoneNumbers()),
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalDelete)

export default connectComponent
