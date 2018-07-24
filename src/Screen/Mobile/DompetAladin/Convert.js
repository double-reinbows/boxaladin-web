import React, { Component } from 'react';


class convert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  showButton = () => {
    const buttonPrice = [
      {convert1: 1, convert2: 2},
      {convert1: 3, convert2: 5},
      {convert1: 10, convert2: 'MAX'},
    ]

    return buttonPrice.map((data, idx) => (
      <div className="mobile__topup__button__container">
        <button className="mobile__topup__button">{data.convert1}</button>
        <button className="mobile__topup__button">{data.convert2}</button>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <h2 className="mobile__pulsa__label">Pilih Nominal untuk Tukar</h2>
        <div>
          {this.showButton()}
        </div>
        <h2 className="mobile__pulsa__label">1 = 1</h2>
      </div>
    );
  }
}

export default convert;
