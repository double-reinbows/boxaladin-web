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

import MANDIRI from '../../asset/Logo/MANDIRI.svg'
import BNI from '../../asset/Logo/BNI.svg'
import BRI from '../../asset/Logo/BRI.svg'

import Guide from './PaymentGuide'

class TopupPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: null,
      activeTab: '1',
      // amount: 0,
      ccNumber: '',
      ccExpiredMonth: '',
      ccExpiredYear: '',
      cvn: '',
      isOpen3dsModal: false,
      payer_auth_url: ''
    }

    this.toggle = this.toggle.bind(this);
    this.toggle3dsModal = this.toggle3dsModal.bind(this)
  }

  render() {


    if (this.state.invoice === null){
      console.log('kosong')
    } else if ( this.state.invoice === undefined){
      console.log('undefined')
    } else {
      const time = this.state.invoice.createdAt
      var finalTime = moment(time, moment.ISO_8601).add(6, 'hours').format('D MMMM YYYY, h:mm:ss a')
    }

    return (
      <div className="pembayaran">
        <div className="pembayaran__container">
					<h1 className="pembayaran__title">Menunggu pembayaran Topup Aladin Keys</h1>
          {this.state.invoice ? (
              <div>
                <h1 className="pembayaran__title">Jumlah yang harus di bayarkan Rp {this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}</h1>
                <h2 className="pembayaran__title">Selesaikan Pembayaran Sebelum {finalTime}</h2>

                <h5 className="pembayaran__title">Silahkan melakukan pembayaran ke salah satu virtual bank account di bawah ini:</h5>

                <div className="bankz">
                  <img src={MANDIRI} className="bankz__icon" alt="Logo" />
                  {/* {this.state.invoice.payment.availableBanks.map((bank, idx) => {
                    return (
                      bank.bank_code === 'MANDIRI' ? (
                        <div className="bankz__name" key={idx}>{bank.bank_code}: {bank.bank_account_number}</div>
                      ) : null
                    )
                  })} */}
                </div>

                <div className="bankz">
                  <img src={BNI} className="bankz__icon" alt="Logo" />
                  {/* {this.state.invoice.payment.availableBanks.map((bank, idx) => {
                      return (
                        bank.bank_code === 'BNI' ? (
                          <div className="bankz__name" key={idx}>{bank.bank_code}: {bank.bank_account_number}</div>
                        ) : null
                      )
                    })} */}
                </div>

                <div className="bankz">
                  <img src={BRI} className="bankz__icon" alt="Logo" />
                  {/* {this.state.invoice.payment.availableBanks.map((bank, idx) => {
                      return (
                        bank.bank_code === 'BRI' ? (
                          <div className="bankz__name" key={idx}>{bank.bank_code}: {bank.bank_account_number}</div>
                        ) : null
                      )
                  })} */}
                </div>
                <div>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      <h4><button style = {{  backgroundColor: "Transparent",
                        backgroundRepeat: "no-repeat",
                        border: "none",
                        cursor: "pointer",
                        overflow: "hidden",
                        outline: "none" }}>Mandiri</button></h4>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    >
                      <h4><button style = {{  backgroundColor: "Transparent",
                        backgroundRepeat: "no-repeat",
                        border: "none",
                        cursor: "pointer",
                        overflow: "hidden",
                        outline: "none" }}>BNI</button></h4>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' })}
                      onClick={() => { this.toggle('3'); }}
                    >
                      <h4><button style = {{  backgroundColor: "Transparent",
                        backgroundRepeat: "no-repeat",
                        border: "none",
                        cursor: "pointer",
                        overflow: "hidden",
                        outline: "none" }}>BRI</button></h4>
                    </NavLink>
                  </NavItem>
                </Nav>
                <Guide activeTab= {this.state.activeTab} invoice={this.state.invoice} />
                </div>
              </div>
            ) : null
          }
        </div>
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
      console.log('data')
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
