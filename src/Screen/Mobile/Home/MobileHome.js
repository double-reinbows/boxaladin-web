import React, { Component } from 'react';
import Price from './Price'
import PaketData from './PaketData'
import TokenListrik from './TokenPln'
import GameContainer from '../../Home/TabContent/Game/GameContainer'
import ModalConfirm from '../../Home/Modal/ModalConfirm'
import envChecker from '../../../utils/envChecker'

export default class MobileHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      openModal : false,
      priceId: 0,
      displayPrice: 0,
      type: '',
      typeBuy: '',
      diamondMl: 0
    }
  }
  renderTab = () => {
    const {tab} = this.state
    switch (tab) {
      case 1:
        return <Price/>;
      case 2:
        return <PaketData/>;
      case 3:
        return <TokenListrik/>;
      case 4:
        return <GameContainer onClick={this.toggleConfirm}/>
      default:
        return tab
    }
  }

  toggleConfirm = (id, displayPrice, typeBuy, diamondMl) => {
    const diamond = diamondMl ? (diamondMl) : (0)
    this.setState({
      openModal: !this.state.openModal,
        priceId: id,
        displayPrice,
        type: 'price',
        typeBuy,
        diamondMl: diamond
    })
  }

  changeTab = (value) => {
    this.setState({
      tab: value
    });
  }

  checkActive = (value) => {
    const { tab } = this.state
    if (value === tab) {
      return 'tabactive'
    }
  }

  renderModalConfirm() {
    if (this.state.openModal) {
      return (
        <ModalConfirm
          typeBuy ={this.state.typeBuy}
          firebase= {envChecker('price')}
          displayPrice={this.state.displayPrice}
          open={this.state.openModal}
          toggle={this.toggleConfirm}
          priceId={this.state.priceId}
          type={this.state.type}
          diamond={this.state.diamondMl}
        />
      )
    }
    return null;
  }

  render() {
    return (
      <div>
        <div className='mobile-home-tab-container'>
          <button className={`${this.checkActive(1)} mobile-home-tab`} onClick={() => this.changeTab(1)}>PULSA</button>
          <button className={`${this.checkActive(2)} mobile-home-tab`} onClick={() => this.changeTab(2)}>PAKET DATA</button>
          <button className={`${this.checkActive(3)} mobile-home-tab`} onClick={() => this.changeTab(3)}>TOKEN PLN</button>
          <button className={`${this.checkActive(4)} mobile-home-tab`} onClick={() => this.changeTab(4)}>VC GAMES</button>
        </div>
        {this.renderTab()}
        <h2 className="mobile__pulsa__label" hidden>Cara Kerja</h2>
        <img hidden alt="how it works" className='mobile__pulsa__image'src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/Cara+Kerja/carKerjaMobile.svg"/>
        {this.renderModalConfirm()}
      </div>
    );
  }
}
