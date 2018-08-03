import React, { Component } from 'react';
import axios from 'axios';
import envChecker from '../../../utils/envChecker'
import ModalBid from '../../Components/Modal/ModalBid'

class Pulsa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      brandName: '',
      logo: '',
      defaultName: '',
      defaultId: 0,
      brand: '',
    }
    this.toggleBid = this.toggleBid.bind(this);

  }
  async toggleBid(brandName, id, logo) {
    await this.setState({
      brandName: brandName,
      defaultId: id,
      logo: logo
  })
  await this.setState({
    openModal: !this.state.openModal,
  })
}

componentDidMount() {
  this.getBrand()
}

  renderModalBid() {
    if (this.state.openModal) {
      return (
        <ModalBid
          isOpen={this.state.openModal}
          toggle={this.toggleBid}
          brandName={this.state.brandName}
          defaultId={this.state.defaultId}
          logo={this.state.logo}
        />
      )
    }
    return null;
  }

  getBrand = () => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/api/brand`,
    })
    .then(response => {
      this.setState({
        brand: response.data
      })
    })
    .catch(err => console.log('error'))
  }

  pulsaItem1() {
    if (!this.state.brand) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.state.brand.filter(data => {
          return data.brandName === 'Telkomsel' || data.brandName === 'XL' || data.brandName === 'Indosat'
        })
        .map((data, i) => {
          const pulsaItems = [
            {onClick: () => this.toggleBid(`${data.brandName}`, data.id, data.brandLogo), img: data.brandLogo, alt:`Logo ${data.brandName}`, name: data.brandName},
          ]
          return pulsaItems.map(data => (
            <div key={i} className='mobile__pulsa__button__container'>
              <button onClick={data.onClick} className="mobile__pulsa__button">
                <img className="mobile__pulsa__button__image" src={data.img} alt={data.alt}/>
              </button>
              <label>{data.name}</label>
            </div>
          ))
        })
      )
    }
  }
  pulsaItem2() {
    if (!this.state.brand) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.state.brand.filter(data => {
          return data.brandName === 'Tri' || data.brandName === 'Smartfren'
        })
        .map((data, i) => {
          const pulsaItems = [
            {onClick: () => this.toggleBid(`${data.brandName}`, data.id, data.brandLogo), img: data.brandLogo, alt:`Logo ${data.brandName}`, name: data.brandName},
          ]
          return pulsaItems.map(data => (
            <div key={i} className='mobile__pulsa__button__container'>
              <button onClick={data.onClick} className="mobile__pulsa__button">
                <img className="mobile__pulsa__button__image" src={data.img} alt={data.alt}/>
              </button>
              <label>{data.name}</label>
            </div>
          ))
        })
      )
    }
  }

  render() {
    return (
      <div>
        <h2 className="mobile__pulsa__label">PILIH PROVIDER KALIAN</h2>
        <div className="mobile__pulsa__content1">
          {this.pulsaItem1()}
        </div>
        <div className="mobile__pulsa__content2">
          {this.pulsaItem2()}
        </div>
        {this.renderModalBid()}
        <h2 className="mobile__pulsa__label">Cara Kerja</h2>
        <img alt="how it works" className='mobile__pulsa__image'src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Home/Carakerja.svg"/>
      </div>
    );
  }
}

export default Pulsa;
