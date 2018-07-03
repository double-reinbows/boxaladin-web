//@flow
import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Button, ButtonGroup } from 'reactstrap'

import Loading from '../Components/Loading/'
import { setIsLoading } from '../../actions/'

class ModalPayment extends Component{
  constructor(props) {
    super(props)
    this.state = {
      bank: '',
      notif: '',
      disabled: true,
      disabledCancel: false,
      time: 25
    }
  }
  static propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsLoading: PropTypes.func,
    data: PropTypes.string
  }
  setBank = (e) => {
    this.setState({
      bank: e.target.value,
      disabled: false,
      notif: ''
    })
  }

  axiosTransaction = () => {
    this.props.setIsLoading(true)
    if (this.state.bank !== 'Alfamart') {
      axios({
        method: 'POST',
        headers: {
            token: localStorage.getItem('token'),
            },
        url: `${process.env.REACT_APP_API_HOST}/topupva`,
        data: {
            keyId: parseInt(this.props.data, 10),
            bankCode: this.state.bank
        }
      })
      .then(result => {
        if (result.data.error_code === "DUPLICATE_CALLBACK_VIRTUAL_ACCOUNT_ERROR") {
          this.props.setIsLoading(false)
          this.setState({
            notif: true
          })
        } else {
          this.props.setIsLoading(false)
          this.props.history.push(`/topupinvoice/${result.data.dataFinal.id}`)
        }
      })
    .catch(err => console.log('error'))
    } else if (this.state.bank === 'Alfamart') {
      this.props.setIsLoading(true)
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/topupKey`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          keyId: parseInt(this.props.data, 10),
          bankCode: this.state.bank
        },
      })
      .then(result => {
        this.props.setIsLoading(false)
        this.props.history.push(`/topupinvoice/${result.data.dataTopUp.id}`)
      })
      .catch(err => console.log(err))
    }
  }

  handleToggle = () => {
    this.setState({
      notif: '',
      bank: '',
      disabled: true
    },
  () => this.props.toggle()
    )
  }

  notifDuplicate() {
    if (this.state.notif === true) {
      return (
        <div>
          <b>Pembayaran Anda Dengan No VA ini Belum diselesaikan</b>
          <br />
          <button className="modal__method__content__button" onClick={() => this.cancelInvoice()} disabled = {this.state.disabledCancel}>Hapus</button>
          <button className="modal__method__content__button" ><a href="http://localhost:5000/tabsinvoice" target="_blank" rel="noopener noreferrer" className="bidding__notif">Invoice</a></button>
        </div>
      )
    } else {
      return null
    }
  }

  cancelInvoice() {
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_HOST}/virtualaccount`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        bank: this.state.bank
      }
    })
    .then((data) => {
      this.timer = setInterval(() => {
        this.props.setIsLoading(true)
        this.setState({
          time: this.state.time - 1,
          disabledCancel: true,
        })

        if (this.state.time <= 0) {
          clearInterval(this.timer);
          this.props.setIsLoading(false)
          this.setState({
            time: 0
          })
        }
      }, 1000);
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__method">
        <div className="modal__method__container">
          <div className="modal__method__header">
            <button className="modal__method__header__button" onClick={this.handleToggle}>X</button>
          </div>
          <div>
            <label>Silahkan Pilih Salah Satu Bank Untuk Metode Pembayaran Virtual Account</label>
            <div className="modal__method__content__container" onChange={this.setBank}>
            <ButtonGroup className="modal__method__ButtonGroup" vertical>
              <Button className="modal__method__Button" onClick={() => this.setState({
                bank: 'BNI',
                disabled: false
              })}>BNI</Button>
              <Button className="modal__method__Button" onClick={() => this.setState({
                bank: 'BRI',
                disabled: false
              })} >BRI</Button>
              <Button className="modal__method__Button" onClick={() => this.setState({
                bank: 'MANDIRI',
                disabled: false
              })} >Mandiri</Button>
              <Button className="modal__method__Button" onClick={() => this.setState({
                bank: 'Alfamart',
                disabled: false
              })} >Alfamart</Button>
            </ButtonGroup>
            </div>
            </div>
            <div>
              <label className="alert__invoice"><b>{this.notifDuplicate()}</b></label>
            </div>
            <button disabled={this.state.disabled} className="modal__method__content__button" onClick={this.axiosTransaction}>Submit</button>
            <Loading isLoading={ this.props.isLoading } />
          </div>
      </Modal>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    isLoading: state.loadingReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoading: (bool) => dispatch(setIsLoading(bool)),
  }
}

const enhance = connect(mapStateToProps, mapDispatchToProps);
const connectComponent = enhance(withRouter(ModalPayment))

export default connectComponent
