import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Guide from './PaymentGuide'
import ModalInvoiceTopup from '../Components/Modal/ModalInvoiceTopup'
import envChecker from '../../utils/envChecker'

class TopupPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: '',
      activeTab: '1',
      modalDetail: false
    }
    this.toggleDetail = this.toggleDetail.bind(this)
  }

  toggleDetail(){
    this.setState({
      modalDetail:!this.state.modalDetail
    })
  }

  handleRetail(){
    if (!this.state.invoice){
      return null
    }  else if (this.state.invoice.payment.availableretail !== 'null'){
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
    }else if (this.state.invoice.virtualAccount.bankCode === 'MANDIRI') {
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

  getExpired = () => {
    return this.state.invoice.payment.expiredAt && (
      <h2 className="pembayaran__title__infoTime">Selesaikan Pembayaran Sebelum {moment(this.state.invoice.payment.expiredAt, moment.ISO_8601).add(12, 'hours').format('D MMMM YYYY, h:mm:ss a')}</h2>
    )
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
              {this.getExpired()}
              {this.handleRetail()}
              </div>
            ) : null
          }
        </div>
        <ModalInvoiceTopup isOpen={this.state.modalDetail} toggle={this.toggleDetail} invoice={this.state.invoice} />
      </div>
    )
  }

  componentDidMount() {
    this.getInvoiceById()
  }

  getInvoiceById() {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/topup/${this.props.match.params.id}`,
      headers: {
        key: process.env.REACT_APP_KEY
      },
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

}

export default TopupPayment
