//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getKeys } from '../../../actions/keyAction'

import ModalPayment from '../../Components/Modal/ModalPayment'

type State ={
  modalPayment: boolean,
  idKey: String
}

type Props = {
  keys: Array,
}
class aladinKeys extends Component <State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalPayment: false,
      idKey: ''
    }
  }

  componentDidMount() {
    this.props.getKeys()
  }

  showButton = () => {
    return this.props.keys.filter (dataFilter => {
      return dataFilter.keyAmount !== 0
    })
    .map((data, i) => (
        <button key={i} onClick={() => this.keyButton(data.id.toString())} className="mobile__topup__button">{data.keyAmount}</button>
    ))
  }

  keyButton = (data) => {
    this.setState({
      idKey: data,
      modalPayment: !this.state.modalPayment
    })
  }

  render() {
    return (
      <div>
        <h2 className="mobile__pulsa__label">Pilih Nominal Top-up</h2>
        <div style={{textAlign:'center'}}>
          {this.showButton()}
        </div>
        <h2 className="mobile__pulsa__label">1 = Rp 1.000,-</h2>
        <ModalPayment
          typeBuy='buy key'
          fixedendpoint='topupva'
          retailendpoint='topupKey'
          walletendpoint='walletkey'
          bcaendpoint='bca/key'
          isOpen={this.state.modalPayment}
          data={this.state.idKey}
          toggle={this.keyButton}
          endpoint='topup'
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      keys: state.keyReducer.keys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getKeys: () => dispatch(getKeys())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(aladinKeys)

export default connectComponent
