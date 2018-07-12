import React from 'react'
import axios from 'axios'
import Guide from './PaymentGuide'
import ModalInvoice from '../Components/Modal/ModalInvoice'
import envChecker from '../../utils/envChecker'

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: '',
      modalDetail: false
    }
  }

  handleRetail(){
    if (!this.state.invoice){
      return null
    } else if (this.state.invoice.payment.availableretail !== 'null'){
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
    } else if (this.state.invoice.virtualAccount.bankCode === 'BCA') {
      return (
        <div>
        <Guide activeTab= {'4'} invoice={this.state.invoice} />
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
    if ( data.virtualAccount.bankCode === 'MANDIRI'){
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

  render() {
  return (
    <div className="pembayaran">
      <div className="pembayaran__container">
        <h1 className="pembayaran__title__header">Pembayaran {this.state.invoice.virtualAccount ? (this.state.invoice.virtualAccount.bankCode) : null}</h1>
        {this.state.invoice ? (
            <div>
              <div className="pembayaran__content__textDistance">
                <h1 className="pembayaran__title"> Rp {this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}</h1>
                <button className="pembayaran__buttonDetail" onClick={this.toggleDetail}> Detail Tagihan </button>
              </div>
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
