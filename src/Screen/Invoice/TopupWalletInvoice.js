//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Table,
  Button
} from 'reactstrap'
import {withRouter} from 'react-router-dom'
import moment from 'moment'

class TopupInvoice extends Component<State, Props> {
	showInvoice() {
    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Tanggal</th>
            <th>Saldo</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.userWalletTransactions.map((data, idx) => {
            if (!data.createdAt || !data.createdAt || !data.payment || data.payment.invoiceId === 'null'){
              return null
            } else {
              const time = moment().toISOString()
              let statusComponent = ''
              if (data.payment.status === 'CANCELLED'){
                statusComponent = <td>{'CANCELLED'}</td>
              } else if (data.payment.status === 'PAID') {
                statusComponent = <td>{'PAID'}</td>
              } else if (time <= data.payment.expiredAt){
                statusComponent = <td><Button className="pembayaran__button__invoice" color="success" onClick={() => this.showMetodePembayaran(data.id)}>Bayar</Button></td>
              } else if (time >= data.payment.expiredAt){
                statusComponent = <td>Expired</td>
              }

              return(
                <tr key={idx}>
                  <th scope="row">{idx+1}</th>
                  <td>{moment(data.createdAt, moment.ISO_8601).format('L, h:mm:ss a')}</td>
                  <td>{`Rp.${data.amount.toLocaleString(['ban', 'id'])}`}</td>
                  {statusComponent}
                </tr>
              )
            }
          })}
        </tbody>
      </Table>
    )
  }

  showMetodePembayaran(id) {
    this.props.history.push('/invoice', {
      id,
      endpoint: 'walletstatus'
    })
  }

  render() {
    return (
      <div className="invoice">
        <div className="invoice__container">
          { this.showInvoice() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userWalletTransactions: state.walletReducer.userWalletTransactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(withRouter(TopupInvoice))

export default connectComponent
