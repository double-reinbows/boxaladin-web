import React, { Component } from 'react';
import Price from './Price'
import PaketData from './PaketData'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      tabActive1: 'active',
      tabActive2: '',
    }
  }

  renderTab = () => {
    const {tab} = this.state
    switch (tab) {
      case 1:
        return <Price/>;
      case 2:
        return <PaketData/>;
      default:
        return tab
    }
  }

  changeTab = (value) => {
    this.setState({ 
      tab: value,
      tabActive1: this.state.tabActive2,
      tabActive2: this.state.tabActive1
    });
  }

  render() {
    return (
      <div>
        <div className='mobile-home-tab-container'>
          <button className={`${this.state.tabActive1} mobile-home-tab`} onClick={() => this.changeTab(1)}>PULSA</button>
          <button className={`${this.state.tabActive2} mobile-home-tab`} onClick={() => this.changeTab(2)}>PAKET DATA</button>
        </div>
        {this.renderTab()}
        <h2 className="mobile__pulsa__label">Cara Kerja</h2>
        <img alt="how it works" className='mobile__pulsa__image'src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Home/Carakerja.svg"/>
      </div>
    );
  }
}

export default Home;
