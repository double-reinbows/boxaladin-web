import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import moment from 'moment'
import classnames from 'classnames';
import Xendit from 'xendit-js-node'

import Guide from './PaymentGuide'
import ModalInvoiceTopup from '../Components/Modal/ModalInvoiceTopup'

class TopupPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: '',
      activeTab: '1',
      // amount: 0,
      ccNumber: '',
      ccExpiredMonth: '',
      ccExpiredYear: '',
      cvn: '',
      isOpen3dsModal: false,
      payer_auth_url: '',
      modalDetail: false

    }

    this.toggle = this.toggle.bind(this);
    this.toggle3dsModal = this.toggle3dsModal.bind(this)
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

  render() {
    if (this.state.invoice === null || this.state.invoice === undefined){
      return null
    } else {
      const time = this.state.invoice.createdAt
      var finalTime = moment(time, moment.ISO_8601).add(6, 'hours').format('D MMMM YYYY, h:mm:ss a')
    }

    return (
      <div className="pembayaran">
        <div className="pembayaran__container">
        <h1 className="pembayaran__title__header">Pembayaran {this.state.invoice ? (this.state.invoice.virtualAccount.bankCode) : null}</h1>
          {this.state.invoice ? (
              <div>
              <div className="pembayaran__content__textDistance">
                <h1 className="pembayaran__title"> Rp {this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}</h1>
                <button className="pembayaran__buttonDetail" onClick={this.toggleDetail}> Detail Tagihan </button>
              </div>
              <h2 className="pembayaran__title__infoTime">Selesaikan Pembayaran Sebelum {finalTime}</h2>
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
    this.gettime()
  }

  gettime(){

  }

  submitPaymentWithCC(token) {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/creditCardTopup`,
      headers: {
        key: process.env.REACT_APP_KEY
      },
      data: {
        tokenId: token,
        externalId: this.state.invoice.paymentId.toString(),
        amount: this.state.invoice.payment.amount,
        cardCvn: this.state.cvn
      }
    })
    .then(({data}) => {
    })
    .catch(err => console.log(err))
  }

  toggle3dsModal() {
    this.setState({isOpen3dsModal: !this.state.isOpen3dsModal})
  }

  show3dsModal() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen3dsModal} toggle={this.toggle3dsModal} className={this.props.className}>
          <ModalHeader toggle={this.toggle3dsModal}>Modal title</ModalHeader>
          <ModalBody>
            <iframe title="CreditCard"  src={this.state.payer_auth_url} />
          </ModalBody>
        </Modal>
      </div>
    )
  }

  createCCToken() {
    Xendit.setPublishableKey('xnd_public_development_OImFfL0l07evlc5rd+AaEmTDb9L38NJ8lXbg+Rxi/Gbe8LGkBQ93hg==')
    Xendit.card.createToken({
      amount: this.state.invoice.payment.amount,
			card_number: this.state.ccNumber,
			card_exp_month: this.state.ccExpiredMonth,
			card_exp_year: this.state.ccExpiredYear,
			card_cvn: this.state.cvn,
			is_multiple_use: false
    }, (err, creditCardCharge) => {
    	if (err) {
    		console.log(err);

    		return;
    	}

    	if (creditCardCharge.status === 'VERIFIED') {

        var token = creditCardCharge.id;
        this.submitPaymentWithCC(token)

    	} else if (creditCardCharge.status === 'IN_REVIEW') {
        this.setState({payer_auth_url: creditCardCharge.payer_authentication_url})
        this.toggle3dsModal()


      } else if (creditCardCharge.status === 'FAILED') {
        console.log('status');
      }
    }

  )}

  showTabs() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              <h3>Virtual Account</h3>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <h3>Credit Card</h3>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.state.invoice ? (
                <div>
                  <h5>Silahkan melakukan pembayaran sejumlah {this.state.invoice.payment.amount} ke salah satu virtual bank account di bawah ini:</h5>
                  <ul>
                    {this.state.invoice.payment.availableBanks.map((bank, idx) => {
                      return (
                        <li key={idx}>{bank.bank_code}: {bank.bank_account_number}</li>
                      )
                    })}
                  </ul>
                </div>
              ) : null
            }
          </TabPane>
          <TabPane tabId="2">
          <h5>Credit Card</h5>

          <Form>

            <FormGroup>
              <Input type="text" value={this.state.invoice !== null ? this.state.invoice.payment.amount : ''} disabled />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="ccNumber" onChange={(e) => this.setState({ccNumber: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="ccExpiredMonth" onChange={(e) => this.setState({ccExpiredMonth: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="ccExpiredYear" onChange={(e) => this.setState({ccExpiredYear: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="cvn" onChange={(e) => this.setState({cvn: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Button onClick={() => this.createCCToken()}>Submit</Button>
            </FormGroup>

          </Form>

          </TabPane>
        </TabContent>
      </div>
    )
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab})
    }
  }

  getInvoiceById() {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_HOST}/topup/${this.props.match.params.id}`,
      headers: {
        key: process.env.REACT_APP_KEY
      },
    })
    .then(({data}) => this.setState({invoice: data}))
    .catch(err => console.log(err))
  }

}

const mapStateToProps = (state) => {
  return {
    //
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(TopupPayment)

export default connectComponent
