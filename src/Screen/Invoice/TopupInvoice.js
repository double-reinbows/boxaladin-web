import React from 'react'
import { connect } from 'react-redux'
import {
  Table,
  Button
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import moment from 'moment'

import { getUserPendingTopupTransactions, getUserTopupTransactions } from '../../actions/topupAction'

class TopupInvoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
            if (data.createdAt === ''){
              return null
            } else if ( data.createdAt === undefined){
              return null
            } else {
              const time = moment()
              const now = time.valueOf()

              const limitTime = moment(data.createdAt, moment.ISO_8601).add(12, 'hours')
              const limitTimeFinal = limitTime.valueOf()

              if (now <= limitTimeFinal) {
              return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{data.key.keyAmount}</td>
                <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                <td>{ data.payment? data.payment.status : null }</td>
                <td>{ data.payment.status === 'PENDING'  ? (
                  <Button className="pembayaran__button__invoice" color="success" onClick={() => this.showMetodePembayaran(data.id)}>Bayar</Button>
                ) : null}</td>
              </tr>
            )
              } else {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx+1}</th>
                    <td>{data.key.keyAmount}</td>
                    <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                    <td>{ data.payment? data.payment.status : null }</td>
                    <td>{ data.payment.status === 'PENDING'  ? (
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
