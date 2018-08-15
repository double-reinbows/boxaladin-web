import React, { Component } from 'react';
import Modal from 'react-modal'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

import { selectPriceID } from '../../../actions/productAction';
import helperAxios from '../../../utils/axios'

class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    if (!this.props.userInfo.id && localStorage.getItem('token')) {
      this.props.getUser()
    }
  }

  checkAladinkey = () => {
    const {defaultId, userInfo} = this.props
    if ( !userInfo.id && !localStorage.getItem('token')){
      alert ('Anda Belum Masuk')
    } else if (userInfo.aladinKeys <= 0 ){
      alert("Anda Tidak Memiliki Aladin Key")
    } else {
      helperAxios('GET', 'users/checkuser')
			.then(async data => {
        if (data.data.message === 'not verified user') {
          alert("Silahkan Verifikasi Email Anda")
        } else if (data.data.aladinKeys > 0) {
          await this.props.selectPriceID(defaultId)
          this.props.history.push('/bidding')
          helperAxios('PUT', 'logopen', {priceId: defaultId})
        } else {
          alert("Anda Tidak Memiliki Aladin Key")
        }
      })
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
            <button className="modal__confirm__button__yes" onClick={this.checkAladinkey}>YA</button>
            <button className="modal__confirm__button__no" onClick={this.props.toggle}>TIDAK</button>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
    selectedPriceID: state.productReducer.selectedPriceID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectPriceID: (id) => dispatch(selectPriceID(id)),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalConfirm)

export default withRouter(connectComponent)
