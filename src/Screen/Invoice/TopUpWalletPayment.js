//@flow
import React from 'react'
import axios from 'axios'
import Guide from './PaymentGuide'
import ModalInvoice from '../Components/Modal/ModalInvoice'
import envChecker from '../../utils/envChecker'
import moment from 'moment'

type state = {
  invoice: object,
  modalDetail: boolean,
}
class InvoiceDetail extends React.Component<state> {
  constructor(props) {
    super(props)
    this.state = {
      invoice: '',
      activeTab: '1',
      modalDetail: false
    }
  }

  handleRetail(){
    if (!this.state.invoice){
      return null
    } else if (this.state.invoice.payment.availableretail === 'BCA') {
      return (
        <div>
        <Guide activeTab= {'4'} invoice={this.state.invoice} amount={this.state.invoice.payment.amount}/>
      </div>
      )
    } else if (this.state.invoice.payment.availableretail !== 'null') {
      return (
        <div>
        <Guide activeTab= {'5'} invoice={this.state.invoice} />
      </div>
      )
    } else if (this.state.invoice.payment.availableretail === 'wallet'){
      return (
        <div>
          <Guide activeTab= {'5'} invoice={this.state.invoice} />
        </div>
      )
    } else if (this.state.invoice.virtualAccount.bankCode === 'MANDIRI') {
      return (
        <div>
        <Guide activeTab= {'1'} invoice={this.state.invoice} />
      </div>
      )
    } else if (this.state.invoice.virtualAccount.bankCode === 'BNI') {
      return (
        <div>
        <Guide activeTab= {'2'} invoice={this.state.invoice} />
      </div>
      )
    } else if (this.state.invoice.virtualAccount.bankCode === 'BRI') {
      return (
        <div>
        <Guide activeTab= {'3'} invoice={this.state.invoice} />
      </div>
      )
    } else {
      return null
    }
  }

  componentDidMount() {
    this.getInvoiceById()
  }

  toggleDetail = () => {
    this.setState({
      modalDetail:!this.state.modalDetail
    })
  }

  getInvoiceById() {
    axios({
      method: 'GET',
      headers: {
        key: process.env.REACT_APP_KEY
      },
      url: `${envChecker('api')}/walletstatus/${this.props.match.params.id}`
    })
    .then(({data}) => {
    this.setState({
      invoice: data
    })
    if (data.virtualAccount === null){
      this.setState({
        activeTab: '5'
      })
    } else if ( data.virtualAccount.bankCode === 'MANDIRI'){
      this.setState({
        activeTab: '1'
      })
    } else if (data.virtualAccount.bankCode === 'BNI'){
      this.setState({
        activeTab: '2'
      })
    } else if (data.virtualAccount.bankCode === 'BRI'){
      this.setState({
        activeTab: '3'
      })
    } else if (data.virtualAccount.bankCode === 'BCA'){
      this.setState({
        activeTab: '4'
      })
    }
  })
    .catch(err => console.log(err))
  }

  getExpired = () => {
    return this.state.invoice.payment.expiredAt && (
      <h2 className="pembayaran__title__infoTime">Selesaikan Pembayaran Sebelum {moment(this.state.invoice.payment.expiredAt, moment.ISO_8601).add(12, 'hours').format('D MMMM YYYY, h:mm:ss a')}</h2>
    )
  }

  checkBank = () => {
  const { invoice } = this.state
    if (invoice.virtualAccount) {
      return (
        invoice.virtualAccount.bankCode
      )
    } else if (invoice.payment) {
      return (
        invoice.payment.xenditId
      )
    } else {
      return null
    }
  }


  render() {
    console.log(this.state.invoice)
  return (
    <div className="pembayaran">
      <div className="pembayaran__container">
        <h1 className="pembayaran__title__header">Pembayaran {this.checkBank()}</h1>
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
