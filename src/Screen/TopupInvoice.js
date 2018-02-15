import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Table,
  Button
} from 'reactstrap'

import { getUserPendingTopupTransactions, getUserTopupTransactions } from '../actions/topupAction'

class TopupInvoice extends React.Component {
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
          <h1>Topup Invoice</h1>
					{ this.showInvoice() }
        </Container>
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
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{data.key.keyAmount}</td>
                <td>{data.payment.amount}</td>
                <td>{data.payment.status}</td>
                <td>{data.payment.status === 'PENDING' ? (
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
    this.props.history.push(`/topupinvoice/${id}`)
		// console.log('Redirect ke detail invoice!')
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(TopupInvoice)

export default connectComponent
