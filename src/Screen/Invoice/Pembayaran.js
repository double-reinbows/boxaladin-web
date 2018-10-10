import React from 'react'
import axios from 'axios'
import moment from 'moment'

import Guide from './PaymentGuide'
import ModalInvoice from '../Components/Modal/ModalInvoice'
import envChecker from '../../utils/envChecker'

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: '',
      activeTab: '1',
      modalDetail: false
    }
  }

  toggleDetail = () => {
    this.setState({
      modalDetail:!this.state.modalDetail
    })
  }

  handleRetail(){
    const {invoice} = this.state
    if (!invoice){
      return null
    } else if (invoice.payment.availableretail === 'BCA') {
      return (
        <div>
        <Guide activeTab= {'4'} invoice={invoice} amount={invoice.payment.amount}/>
      </div>
      )
    } else if (invoice.tokenPln !== null) {
      return (
        <div>
        <Guide activeTab= {'6'} invoice={invoice} />
      </div>
      )
    } else if (invoice.payment.availableretail !== 'null') {
      return (
        <div>
        <Guide activeTab= {'5'} invoice={invoice} />
      </div>
      )
    } else if (invoice.payment.availableretail === 'wallet'){
      return (
        <div>
          <Guide activeTab= {'5'} invoice={invoice} />
        </div>
      )
    } else if (invoice.virtualAccount.bankCode === 'MANDIRI') {
      return (
        <div>
        <Guide activeTab= {'1'} invoice={invoice} />
      </div>
      )
    } else if (invoice.virtualAccount.bankCode === 'BNI') {
      return (
        <div>
        <Guide activeTab= {'2'} invoice={invoice} />
      </div>
      )
    } else if (invoice.virtualAccount.bankCode === 'BRI') {
      return (
        <div>
        <Guide activeTab= {'3'} invoice={invoice} />
      </div>
      )
    } else {
      return null
    }
  }

  getExpired = () => {
    return this.state.invoice.payment.expiredAt && (
      <h2 className="pembayaran__title__infoTime">Selesaikan Pembayaran Sebelum {moment(this.state.invoice.payment.expiredAt, moment.ISO_8601).add(12, 'hours').format('D MMMM YYYY, h:mm:ss a')}</h2>
    )
  }

  componentDidMount() {
    this.getInvoiceById()
  }

  getInvoiceById() {
    axios({
      method: 'GET',
      headers: {
        key: process.env.REACT_APP_KEY
      },
      url: `${envChecker('api')}/${this.props.location.state.endpoint}/${this.props.location.state.id}`
    })
    .then(({data}) => {
      this.setState({
        invoice: data
      })
    })
    .catch(err => console.log(err))
  }

  renderPembayaran = () => {
    if (!this.state.invoice){
      return (
        <h1 className="pembayaran__title__header">Pembayaran</h1>
      )
    } else {
      return (
        <h1 className="pembayaran__title__header">Pembayaran {this.state.invoice.virtualAccount ? (this.state.invoice.virtualAccount.bankCode) : (this.state.invoice.payment.xenditId)}</h1>
      )
    }
  }

  render() {
    return (
      <div className="pembayaran">
        <div className="pembayaran__container">
          {this.renderPembayaran()}
          {this.state.invoice ? (
              <div>
                <div className="pembayaran__content__textDistance">
                  <h1 className="pembayaran__title"> Rp {this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}</h1>
                  <button className="pembayaran__buttonDetail" onClick={this.toggleDetail}> Detail Tagihan </button>
                </div>
                  {this.getExpired()}
                  {this.handleRetail()}
              </div>
            ) : null
          }
        </div>
        <ModalInvoice isOpen={this.state.modalDetail} toggle={this.toggleDetail} invoice={this.state.invoice} />
      </div>
    )
  }
}

export default InvoiceDetail
