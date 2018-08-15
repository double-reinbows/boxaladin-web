//@flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class menu extends Component {

  showButton = () => {
    const buttonPrice = [
      {menu: 'Kunci Aladin', link:'mdompetkey'},
      {menu: 'Koin Aladin', link:'mdompetconvert'},
      {menu: 'Uang Aladin', link:'mdompetwallet'},
    ]

    return buttonPrice.map((data, idx) => (
      <div key={idx} className="mobile__menu__button__container">
        <Link to={data.link} className="mobile__menu__button" style={button}>{data.menu}</Link>
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
