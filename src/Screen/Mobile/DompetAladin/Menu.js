import React, { Component } from 'react';

class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  showButton = () => {
    const buttonPrice = [
      {keys1: 'Kunci Aladin'},
      {keys1: 'Koin Aladin'},
      {keys1: 'Uang Aladin'},
    ]

    return buttonPrice.map((data, idx) => (
      <div className="mobile__topup__button__container">
        <button className="mobile__topup__button" style={button}>{data.keys1}</button>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <h2 className="mobile__pulsa__label">Pilih Jenis Top-up</h2>
        <div>
          {this.showButton()}
        </div>
        <h2 className="mobile__pulsa__label">1 = Rp 1.000,-</h2>
      </div>
    );
  }
}

const button = {
  width: '75%',
  backgroundColor: '#FFCD05',
  margin: '2%'
};

export default menu;
