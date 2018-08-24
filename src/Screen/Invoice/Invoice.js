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
      <Table>
        <thead>
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
        <tbody>
        {transactions.map((data, idx) => {
            if (!data.createdAt || !data.payment || data.payment.invoiceId === 'null'){
              return null
            } else {
              const time = moment().toISOString()
              let statusComponent = ''
              if (data.payment.status === 'CANCELLED'){
                statusComponent = <td>{'CANCELLED'}</td>
              } else if (data.payment.status === 'PAID') {
                statusComponent = <td>{'SUKSES'}</td>
              } else if (data.payment.status !== 'PAID' && data.payment.status !== 'CANCELLED' && data.payment.status !== 'PENDING'){
                statusComponent = <td>{'PROSES'}</td>
              } else if (time <= data.payment.expiredAt){
                statusComponent = <td><Button className="pembayaran__button__invoice" color="success" onClick={() => this.showMetodePembayaran(data.id)}>Bayar</Button></td>
              } else if (time >= data.payment.expiredAt){
                statusComponent = <td>Expired</td>
              }

              return(
                <tr key={idx}>
                  <th scope="row">{idx+1}</th>
                  <td>{moment(data.createdAt, moment.ISO_8601).format('L, h:mm:ss a')}</td>
                  <td>{data.product.productName}</td>
                  <td>{`Rp.${data.payment.amount.toLocaleString(['ban', 'id'])}`}</td>
                  <td>{ data.number ? data.number : (<h3>Anda Tidak Memasukkan no Hp</h3>) }</td>
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
