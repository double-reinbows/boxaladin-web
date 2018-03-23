import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//import iconTabs
import IconTabs1 from '../../../asset/TabsHome/IconTabs1.svg';
import IconTabs2 from '../../../asset/TabsHome/IconTabs2.svg';
// import IconTabs3 from '../../../asset/TabsHome/IconTabs3.svg';
// import IconTabs4 from '../../../asset/TabsHome/IconTabs4.svg';

//import Dropdown
import DropdownBolt from './Dropdown/DropdownBolt';
import DropdownIndosat from './Dropdown/DropdownIndosat';
import DropdownSmartfren from './Dropdown/DropdownSmartfren';
import DropdownTelkomsel from './Dropdown/DropdownTelkomsel';
import DropdownTri from './Dropdown/DropdownTri';
import DropdownXL from './Dropdown/DropdownXL';

class Example extends React.Component {
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
    console.log('Tabs Home Props:', this.props);
    console.log('Tabs Home State:', this.state);

    return (
      <div className="tes">
        <Nav className="NavTabsHome" tabs>
          <NavItem className="TabsHome">
            <NavLink
              className="TabsHome__link {classnames({ active: this.state.activeTab === '1' })}"
              onClick={() => { this.toggle('1'); }}
            >
              Pulsa <img src={IconTabs1} className="TabsHome__icon1" alt="IconTabs1" />
            </NavLink>
          </NavItem>
          <NavItem className="TabsHome">
            <NavLink
              className="TabsHome__link {classnames({ active: this.state.activeTab === '2' })}"
              onClick={() => { this.toggle('2'); }}
            >
              Paket Data <img src={IconTabs2} className="TabsHome__icon1" alt="IconTabs1" />
            </NavLink>
          </NavItem>
        {/* ini bagian evouher dan pulsa, kalo perlu baru di uncommenct */}
          {/* <NavItem className="TabsHome">
            <NavLink
              className="TabsHome__link {classnames({ active: this.state.activeTab === '3' })}"
              onClick={() => { this.toggle('3'); }}
            >
              E-Voucher <img src={IconTabs3} className="TabsHome__icon1" alt="IconTabs1" />
            </NavLink>
          </NavItem>
          <NavItem className="TabsHome">
            <NavLink
              className="TabsHome__link {classnames({ active: this.state.activeTab === '4' })}"
              onClick={() => { this.toggle('4'); }}
            >
              Voucher Game <img src={IconTabs4} className="TabsHome__icon1" alt="IconTabs1" />
            </NavLink>
          </NavItem> */}
        </Nav>

        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="1">
            <div>
              <div className="TabsPane1">

                <div className="TabsPane1__text">
                  <label className="TabsPane1__label">PULSA SELULER</label>
                </div>

                <div className="TabsPane1__dropdown">
                  <DropdownIndosat />
                  <DropdownTelkomsel className="TabsPane1__dropdown__content"/>
                  <DropdownXL className="TabsPane1__dropdown__content"/>
                  <DropdownTri className="TabsPane1__dropdown__content"/>
                  <DropdownSmartfren className="TabsPane1__dropdown__content"/>
                </div>

              </div>

              <div>
                <h1 className="TabsPane1__selectedProduct">
                   {this.showSelectedProductName()}
                </h1>
              </div>

              <div>
                <Link to="/bidding">
                  <button onClick={() => this.handleNotLogin()} disabled={ this.props.selectedProductID !== '' ? false : true} type="button" className="btn btn-lg btn-block TabsPane1__button">LIHAT HARGA</button>
                </Link>
              </div>
            </div>
          </TabPane>

          <TabPane tabId="2">
            <div>
              <div className="TabsPane1">

                <div className="TabsPane1__text">
                  <label className="TabsPane1__label">PAKET DATA</label>
                </div>

                <div className="TabsPane1__dropdown">
                  <DropdownBolt />
                </div>

              </div>

              <div>
                <h1 className="TabsPane1__selectedProduct">
                  {this.showSelectedProductName()}
                </h1>
              </div>

              <div>
                <Link to="/bidding">
                  <button onClick={() => this.handleNotLogin()} disabled={this.props.selectedProductID !== '' ? false : true} type="button" className="btn btn-lg btn-block TabsPane1__button">LIHAT HARGA</button>
                </Link>
              </div>
            </div>
          </TabPane>

        </TabContent>

      </div>
    );
  }

  handleNotLogin() {
    if (localStorage.getItem('token') === null) {
      alert('Anda belum login')
    }
  }

  showSelectedProductName() {
    let result = this.props.products.filter(data => {
      return data.id.toString() === this.props.selectedProductID
    })

    return result[0] ? result[0].productName : null
  }

}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    selectedProductID: state.productReducer.selectedProductID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Example)

export default connectComponent
