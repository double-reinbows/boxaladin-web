import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Table
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
            <th>Virtual Bank Account</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.userTransactions.map((data, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{data.product.productName}</td>
                <td>{data.payment.amount}</td>
                <td>
                  {/* {data.payment.availableBanks} */}
                  <ul>
                    {data.payment.availableBanks ? (
                      data.payment.availableBanks.map((bank, idx) => {
                        return (
                          <li key={idx}>{bank.bank_code}: {bank.bank_account_number}</li>
                        )
                      })
                    ) : null}
                  </ul>
                </td>
                <td>{data.status}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
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