import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: null,
      activeTab: '1'
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