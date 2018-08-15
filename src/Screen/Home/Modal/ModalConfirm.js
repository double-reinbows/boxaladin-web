import React, { Component } from 'react';
import axios from 'axios'
import Modal from 'react-modal'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

import { selectProductID } from '../../../actions/productAction';
import { getUser } from '../../../actions/userAction';
import envChecker from '../../../utils/envChecker'

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
    const {selectedProductID} = this.props
    if (selectedProductID === 36 || selectedProductID === 37 || selectedProductID === 38 || selectedProductID === 39 || selectedProductID === 40) {
      if (this.props.userInfo.wallet < 10500){
        return alert('Saldo Wallet Anda Kurang Dari Rp.10.500,00')
      } else {
        axios({
          method: 'GET',
          headers: {
            token: localStorage.getItem('token'),
          },
          url: `${envChecker('api')}/users/checkuser`,
        })
        .then(data => {
          if (data.data.aladinKeys > 0 && data.data.wallet >= 10500) {
            this.props.history.push('/bidding')
            axios({
              method: 'PUT',
              headers: {
                token: localStorage.getItem('token'),
              },
              url: `${envChecker('api')}/logopen`,
              data: {
                productId: selectedProductID
              },
            })
          } else {
            alert("Anda Tidak Memiliki Aladin Key")
          }
        })
      }
    } else {
      axios({
        method: 'GET',
        headers: {
          token: localStorage.getItem('token'),
				},
				url: `${envChecker('api')}/users/checkuser`,
			})
			.then(data => {
        if (data.data.aladinKeys > 0) {
          this.props.history.push('/bidding')
          axios({
            method: 'PUT',
            headers: {
              token: localStorage.getItem('token'),
            },
            url: `${envChecker('api')}/logopen`,
            data: {
              productId: selectedProductID
            },
          })
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
    selectedProductID: state.productReducer.selectedProductID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProductID: (id) => dispatch(selectProductID(id)),
    getUser: () => dispatch(getUser())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalConfirm)

export default withRouter(connectComponent)
