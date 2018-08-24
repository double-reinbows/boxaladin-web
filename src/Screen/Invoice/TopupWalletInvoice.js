//@flow
import React, { Component } from 'react';
import {
  Table,
  Button
} from 'reactstrap'
import {withRouter} from 'react-router-dom'
import envChecker from '../../utils/envChecker'
import moment from 'moment'
import Axios from 'axios'

type State = {
  invoice: Array,
}

class TopupInvoice extends Component<State, Props> {
  constructor(props) {
    super(props)
    this.state = {
      invoice: []
    }
  }

  componentDidMount() {
    this.getWallet()
  }

  getWallet = () => {
    Axios({
      method: 'GET',
      url: `${envChecker('api')}/walletstatus`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(response => {
      this.setState({
        invoice : response.data
      })
    })
    .catch(err => console.log(err))
  }

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
          {this.state.invoice.map((data, idx) => {
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



export default withRouter(TopupInvoice)
