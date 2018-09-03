import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import Invoice from './Invoice'
import TopUpInvoice from './TopupInvoice'
import WalletInvoice from'./TopupWalletInvoice'
import { getUserTransactions } from '../../actions/transactionAction'
import { getUserTopupTransactions } from '../../actions/topupAction'
import { getUserWalletTransactions } from '../../actions/walletTransactionAction'

class TabsInvoice extends React.Component {
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


  componentDidMount() {
    const {getUserTopupTransactions, getUserTransactions, getUserWalletTransactions } = this.props
    getUserTransactions()
    getUserTopupTransactions()
    getUserWalletTransactions()
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem className="invoice__tab">
            <NavLink
            activeStyle={{
              fontWeight: 'bold',
              backgroundColor: 'yellow',
              border:"10px"
            }}
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              <a className="invoice__active">Invoice Pulsa/Data</a>
            </NavLink>
          </NavItem>
          <NavItem className="invoice__tab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Invoice Key
            </NavLink>
          </NavItem>
          <NavItem className="invoice__tab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Invoice Uang
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Invoice/>
          </TabPane>
          <TabPane tabId="2">
            <TopUpInvoice/>
          </TabPane>
          <TabPane tabId="3">
            <WalletInvoice/>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userTransactions: state.transactionReducer.userTransactions,
    userTopupTransactions: state.topupReducer.userTopupTransactions,
    userWalletTransactions: state.walletReducer.userWalletTransactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserTransactions: () => dispatch(getUserTransactions()),
    getUserTopupTransactions: () => dispatch(getUserTopupTransactions()),
    getUserWalletTransactions: () => dispatch(getUserWalletTransactions())
  }
}
const enhance = connect(mapStateToProps, mapDispatchToProps);
const connectComponent = enhance(withRouter(TabsInvoice))

export default connectComponent