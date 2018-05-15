import React from 'react'

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import Invoice from './Invoice'
import TopUpInvoice from './TopupInvoice'

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
              <a className="invoice__active">Invoice Pulsa</a>
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
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Invoice/>
          </TabPane>
          <TabPane tabId="2">
            <TopUpInvoice/>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default TabsInvoice
