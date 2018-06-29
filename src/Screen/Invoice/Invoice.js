import React from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'reactstrap';
import {withRouter} from 'react-router-dom'


import moment from 'moment'

import { getUserPendingTransactions, getUserTransactions } from '../../actions/transactionAction'
class Invoice extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    console.log(this.props)
    return (
    <div className="invoice">
      <div className="invoice__container">
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
            <th>Tanggal</th>
            <th>Barang</th>
            <th>Nominal Transfer</th>
            <th>No Tujuan</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="invoice__table">
          {transactions.map((data, idx) => {
            if (!data.createdAt || !data.product || !data.payment){
              return null
            } else {
              const time = moment()
              const now = time.valueOf()

              const limitTime = moment(data.createdAt, moment.ISO_8601).add(6, 'hours')
              const limitTimeFinal = limitTime.valueOf()
              if (data.payment.status === 'CANCELLED') {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx+1}</th>
                    <td>{moment(data.createdAt, moment.ISO_8601).format('L, h:mm:ss a')}</td>
                    <td>{ data.product ? data.product.productName : data.description }</td>
                    <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                    <td>{ data.number ? data.number : (<h3>Anda Tidak Memasukkan no Hp</h3>) }</td>
                    <td>{ data.payment ? data.payment.status : 'GRATIS' }</td>
                    <td></td>
                  </tr>
                )
              } else if (now <= limitTimeFinal) {
                return (
                <tr key={idx}>
                  <th scope="row">{idx+1}</th>
                  <td>{moment(data.createdAt, moment.ISO_8601).format('L, h:mm:ss a')}</td>
                  <td>{ data.product ? data.product.productName : data.description }</td>
                  <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                  <td>{ data.number ? data.number : (<h3>Anda Tidak Memasukkan no Hp</h3>) }</td>
                  <td>{ data.payment ? data.payment.status : 'GRATIS' }</td>
                  <td>{ data.status === 'PENDING'  ? (
                    <Button className="pembayaran__button__invoice" color="success" onClick={() => this.showMetodePembayaran(data.id)}>Bayar</Button>
                  ) : null}</td>
                </tr>
              )
                } else {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx+1}</th>
                    <td>{moment(data.createdAt, moment.ISO_8601).format('L, h:mm:ss a')}</td>
                    <td>{ data.product ? data.product.productName : data.description }</td>
                    <td>{ data.payment ? `Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}` : null }</td>
                    <td>{ data.number ? data.number : (<h3>Anda Tidak Memasukkan no Hp</h3>) }</td>
                    <td>{ data.payment ? data.payment.status : 'GRATIS' }</td>
                    <td>{ data.status === 'PENDING'  ? (<label>Expired</label>) : null}</td>

                  </tr>
                )
              }
            }
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
const enhance = connect(mapStateToProps, mapDispatchToProps);
const connectComponent = enhance(withRouter(Invoice))

export default connectComponent
