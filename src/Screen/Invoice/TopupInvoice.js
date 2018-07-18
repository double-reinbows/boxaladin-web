//@flow
import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button
} from 'reactstrap'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import { getUserPendingTopupTransactions, getUserTopupTransactions } from '../../actions/topupAction'

type Props = {
  userTopupTransactions: Array,
  userPendingTopupTransactions: Array
}

class TopupInvoice extends React.Component <Props> {
  render() {
    return (
      <div className="invoice">
        <div className="invoice__container">
					{ this.showInvoice() }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.getUserPendingTopupTransactions()
    this.props.getUserTopupTransactions()
  }

	showInvoice() {
    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Key</th>
            <th>Nominal Transfer</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.userTopupTransactions.map((data, idx) => {
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
              } else {
                statusComponent = <td>Expired</td>
              }

              return(
                <tr key={idx}>
                  <th scope="row">{idx+1}</th>
                  <td>{data.key.keyAmount}</td>
                  <td>{`Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}`}</td>
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
    this.props.history.push(`/topupinvoice/${id}`)
  }
}

const mapStateToProps = (state) => {
  return {
    userPendingTopupTransactions: state.topupReducer.userPendingTopupTransactions,
    userTopupTransactions: state.topupReducer.userTopupTransactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPendingTopupTransactions: () => dispatch(getUserPendingTopupTransactions()),
    getUserTopupTransactions: () => dispatch(getUserTopupTransactions())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(withRouter(TopupInvoice))

export default connectComponent
