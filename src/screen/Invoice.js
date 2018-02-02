import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
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
      <div>
        <Container>
          <h1>Invoice</h1>
          {this.showInvoice()}
        </Container>
      </div>
    )
  }

  componentDidMount() {
    this.props.getUserPendingTransactions()
    this.props.getUserTransactions()
  }

  showInvoice() {
    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Barang</th>
            <th>Nominal Transfer</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.userTransactions.map((data, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{data.product.productName}</td>
                <td>{data.payment.amount}</td>
                <td>{data.status}</td>
                <td>{data.status === 'PENDING' ? (
                  <Button color="success" onClick={() => this.showMetodePembayaran(data.id)}>Bayar</Button>
                ) : null}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  showMetodePembayaran(id) {
    this.props.history.push(`/invoice/${id}`)
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