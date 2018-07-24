import React, { Component } from 'react';


class aladinKeys extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  showButton = () => {
    const buttonPrice = [
      {keys1: 10, keys2: 20},
      {keys1: 30, keys2: 40},
      {keys1: 50, keys2: 100},
    ]

    return buttonPrice.map((data, idx) => (
      <div key={idx} className="mobile__topup__button__container">
        <button className="mobile__topup__button">{data.keys1}</button>
        <button className="mobile__topup__button">{data.keys2}</button>
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
        <h2 className="mobile__pulsa__label">1 = Rp 1.000,-</h2>
      </div>
    );
  }
}

export default aladinKeys;
