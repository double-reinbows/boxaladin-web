import React, { Component } from 'react';

class Topup extends Component {
  constructor(props) {
    super(props);
    this.state = {  

    }
  }

  showButton = () => {
    const buttonPrice = [
      {price1: 200000, price2: 300000},
      {price1: 500000, price2: 750000},
      {price1: 1000000, price2: 2000000},
    ]

    return buttonPrice.map((data, idx) => (
      <div className="mobile__topup__button__container">
        <button className="mobile__topup__button">{data.price1.toLocaleString(['ban', 'id'])}</button>
        <button className="mobile__topup__button">{data.price2.toLocaleString(['ban', 'id'])}</button>
      </div>

    ))
  }

  render() { 
    return (  
      <div>
        <h2 className="mobile__pulsa__label">Pilih Nominal Top-up</h2>
        <div>
          {this.showButton()}
        </div>
      </div>
    );
  }
}

export default Topup;