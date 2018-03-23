import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button
} from 'reactstrap'

import { getUserPendingTransactions, getUserTransactions } from '../actions/transactionAction'

class Invoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log('Props:', this.props)
    console.log('State:', this.state)
    return (
      <div className="invoice">
        <div className="invoice__container">
          <h1 className="invoice__text">Invoice</h1>
          {this.showInvoice()}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.getUserPendingTransactions()
    this.props.getUserTransactions()
  }

  showInvoice() {
    return (
      <Table >
        <thead className="invoice__table">
          <tr>
            <th>No.</th>
            <th>Barang</th>
            <th>Nominal Transfer</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="invoice__table">
          {this.props.userTransactions.map((data, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{data.product.productName}</td>
                <td>{data.payment.amount}</td>
                <td>{data.payment.status}</td>
                <td>{data.status === 'PENDING' ? (
                  <Button className="pembayaran__button__invoice" color="success" onClick={() => this.showMetodePembayaran(data.id)}>Bayar</Button>
                ) : null}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  showMetodePembayaran(id) {
    this.props.history.push(`/payment/${id}`)
  }

}

const mapStateToProps = (state) => {
  return {
    userPendingTransactions: state.transactionReducer.userPendingTransactions,
    userTransactions: state.transactionReducer.userTransactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPendingTransactions: () => dispatch(getUserPendingTransactions()),
    getUserTransactions: () => dispatch(getUserTransactions())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Invoice)

export default connectComponent
