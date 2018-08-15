import React, { Component } from 'react';
import axios from 'axios';
import envChecker from '../../../utils/envChecker'
import ModalConfirm from '../../Home/Modal/ModalConfirm'

class Pulsa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      defaultId: 0,
      price: '',
    }
  }
  componentDidMount() {
    this.getPrice()
  }

  toggleConfirm = (id) => {
    this.setState({
      openModal: !this.state.openModal,
      defaultId: id
    })
  }

  price() {
    const { price } = this.state
    if (!price) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        price.map((data, index) => {
          return(
            <button key={index} onClick={() => this.toggleConfirm(data.id)} className="mobile__pulsa__button">{data.displayPrice}</button>
          )
        })
      )
    }
  }

  getPrice = () => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/api/price`,
    })
    .then(response => {
      this.setState({
        price: response.data
      })
    })
    .catch(err => console.log('error'))
  }


  render() {
    return (
      <div>
        <h2 className="mobile__pulsa__label">PILIH HARGA BID KALIAN</h2>
        <div className="mobile__pulsa__content1">
          {this.price()}
        </div>
        <h2 className="mobile__pulsa__label">Cara Kerja</h2>
        <img alt="how it works" className='mobile__pulsa__image'src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Home/Carakerja.svg"/>
        <ModalConfirm open={this.state.openModal} toggle={this.toggleConfirm} defaultId={this.state.defaultId}/>
      </div>
    );
  }
}

export default Pulsa;
