import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Container, TabContent, TabPane, Nav, NavItem, NavLink,
  Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

import classnames from 'classnames';
import Xendit from 'xendit-js-node'

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: null,
      activeTab: '1',
      amount: 0,
      ccNumber: '',
      ccExpiredMonth: '',
      ccExpiredYear: '',
      cvn: ''
    }

    this.toggle = this.toggle.bind(this);
  }

  render() {
    console.log('Props:', this.props);
    console.log('State:', this.state);

    return (
      <div>
        <Container>
          { this.showTabs() }
        </Container>
      </div>
    )
  }

  componentDidMount() {
    this.getInvoiceById()
  }

  createCCToken() {
    Xendit.setPublishableKey('xnd_public_development_OImFfL0l07evlc5rd+AaEmTDb9L38NJ8lXbg+Rxi/Gbe8LGkBQ93hg==')
    Xendit.card.createToken({
      amount: this.state.amount,
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
        console.log(creditCardCharge.status);
        var token = creditCardCharge.id;
    		console.log(token);
    	} else if (creditCardCharge.status === 'IN_REVIEW') {
        console.log(creditCardCharge.status);
        console.log(creditCardCharge);
        console.log(creditCardCharge.payer_authentication_url);
    		// window.open(creditCardCharge.payer_authentication_url, 'sample-inline-frame');
    		// $('#three-ds-container').show();
    	} else if (creditCardCharge.status === 'FAILED') {
        console.log(creditCardCharge.status);
    		// $('#error pre').text(creditCardCharge.failure_reason);
    		// $('#error').show();
    		// $form.find('.submit').prop('disabled', false); // Re-enable submission
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
              <Input type="text" placeholder="amount" onChange={(e) => this.setState({amount: e.target.value})} />
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
      url: `http://localhost:3000/transaction/${this.props.match.params.id}`
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail)

export default connectComponent
