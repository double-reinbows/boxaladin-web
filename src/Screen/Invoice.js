import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button
} from 'reactstrap'
import moment from 'moment'

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
    let transactions = this.props.userTransactions.filter(data => data.description !== 'FREE')
    return (
      <Table >
        <thead className="invoice__table">
          <tr>
            <th>No.</th>
            <th>Barang</th>
            <th>Nominal Transfer</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="invoice__table">
          {transactions.map((data, idx) => {
            if (data.createdAt === ''){
              console.log('kosong')
            } else if ( data.createdAt === undefined){
              console.log('undefined')
            } else {
              const time = moment()
              const now = time.valueOf()

              const limitTime = moment(data.createdAt, moment.ISO_8601).add(6, 'hours')
              const limitTimeFinal = limitTime.valueOf()
              if (now <= limitTimeFinal) {
              return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{ data.product.productName }</td>
                <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                <td>{moment(data.createdAt, moment.ISO_8601).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>{ data.payment? data.payment.status : null }</td>
                <td>{ data.status === 'PENDING'  ? (
                  <Button className="pembayaran__button__invoice" color="success" onClick={() => this.showMetodePembayaran(data.id)}>Bayar</Button>
                ) : null}</td>
              </tr>
            )
              } else {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx+1}</th>
                    <td>{ data.product.productName }</td>
                    <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                    <td>{moment(data.createdAt, moment.ISO_8601).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>{ data.payment? data.payment.status : null }</td>
                    <td>{ data.status === 'PENDING'  ? (
                  <label>Expired</label>
                ) : null}</td>
                    
                  </tr>
                )
              }
            }
            return null
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
