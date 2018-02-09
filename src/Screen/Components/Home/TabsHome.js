import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

//import iconTabs
// import IconTabs1 from '../../../asset/TabsHome/IconTabs1.svg';
// <img src={IconTabs1} className="TabsHome__icon1" alt="IconTabs1" />
// import IconTabs2 from '../../../asset/TabsHome/IconTabs2.svg';
// <img src={IconTabs1} className="TabsHome__icon1" alt="IconTabs1" />
// import IconTabs3 from '../../../asset/TabsHome/IconTabs3.svg';
// <img src={IconTabs1} className="TabsHome__icon1" alt="IconTabs1" />
// import IconTabs4 from '../../../asset/TabsHome/IconTabs4.svg';
// <img src={IconTabs1} className="TabsHome__icon1" alt="IconTabs1" />

//import Dropdown
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
        <Nav className="NavTabsHome" tabs>
          <NavItem className="TabsHome">
            <NavLink
              className="TabsHome__link {classnames({ active: this.state.activeTab === '1' })}"
              onClick={() => { this.toggle('1'); }}
            >
              Pulsa
            </NavLink>
          </NavItem>
          <NavItem className="TabsHome">
            <NavLink
              className="TabsHome__link {classnames({ active: this.state.activeTab === '2' })}"
              onClick={() => { this.toggle('2'); }}
            >
              Paket Data
            </NavLink>
          </NavItem>
          <NavItem className="TabsHome">
            <NavLink
              className="TabsHome__link {classnames({ active: this.state.activeTab === '3' })}"
              onClick={() => { this.toggle('3'); }}
            >
              E-Voucher
            </NavLink>
          </NavItem>
          <NavItem className="TabsHome">
            <NavLink
              className="TabsHome__link {classnames({ active: this.state.activeTab === '4' })}"
              onClick={() => { this.toggle('4'); }}
            >
              Voucher Game
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="1">
            <div>
              <div className="TabsPane1">

                <div className="TabsPane1__text">
                  <label className="TabsPane1__label">PULSA SELULER</label>
                </div>

                <div className="TabsPane1__dropdown">
                  <DropdownTelkomsel className="TabsPane1__dropdown__content"/>
                  <DropdownXL className="TabsPane1__dropdown__content"/>
                  <DropdownTri className="TabsPane1__dropdown__content"/>
                  <DropdownSmartfren className="TabsPane1__dropdown__content"/>
                </div>

              </div>

              <div>
                <button type="button" className="btn btn-lg btn-block TabsPane1__button">LIHAT HARGA</button>
              </div>
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
