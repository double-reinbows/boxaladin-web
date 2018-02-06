import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import DropdownSmartfren from './Dropdown/DropdownSmartfren';
import DropdownTelkomsel from './Dropdown/DropdownTelkomsel';
import DropdownTri from './Dropdown/DropdownTri';
import DropdownXL from './Dropdown/DropdownXL';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

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
        <Nav className="HomeContainer" tabs>
          <NavItem className="TabsHome">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Pulsa
            </NavLink>
          </NavItem>
          <NavItem className="TabsHome">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Paket Data
            </NavLink>
          </NavItem>
          <NavItem className="TabsHome">
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              E-Voucher
            </NavLink>
          </NavItem>
          <NavItem className="TabsHome">
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Voucher Game
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="1">
            <div>
              <Row className="rowz">
                <Col sm="12" className="TabsHome__pane1">
                  <h4 className="TabsHome__pane1__font">PULSA SELULER</h4>

                  <div className="TabsHome__pane1__dropdown">
                    <div className="TabsHome__pane1__dropdown__content"><DropdownTelkomsel/></div>
                    <div className="TabsHome__pane1__dropdown__content"><DropdownXL/></div>
                    <div className="TabsHome__pane1__dropdown__content"><DropdownTri/></div>
                    <div className="TabsHome__pane1__dropdown__content"><DropdownSmartfren/></div>
                  </div>

                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane tabId="2">
          <Row>
            <Col sm="12" className="TabsHome__pane1">
              <h4 className="TabsHome__pane1__font">Tab 2 Contents</h4>
            </Col>
          </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
