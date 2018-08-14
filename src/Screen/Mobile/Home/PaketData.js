import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import envChecker from '../../../utils/envChecker';
import ModalBid from '../../Components/Modal/ModalBid'

class PaketData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      brandName: '',
      logo: '',
      defaultId: 0,
      brand: '',
    }
  }
  
  componentDidMount() {
    this.getBrand()
  }

  toggleBid = async(brandName, id, logo) => {
    await this.setState({
    brandName: brandName,
    defaultId: id,
    logo: logo
  })
  await this.setState({
    openModal: !this.state.openModal,
  })
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

  pulsaItem() {
    if (!this.state.brand) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.state.brand.filter(data => {
          return data.brandName === 'Telkomsel' || data.brandName === 'XL' || data.brandName === 'Indosat' || data.brandName === 'Tri'
        })
        .map((data, i) => {
          const pulsaItems = [
            {onClick: () => this.toggleBid(`${data.brandName}`, data.id, data.brandLogo), img: data.brandLogo, alt:`Logo ${data.brandName}`, name: data.brandName},
          ]
          return pulsaItems.map(data => (
            <button key={i} onClick={data.onClick} className="mobile__pulsa__button">
              <img className="mobile__pulsa__button__image" src={data.img} alt={data.alt}/>
            </button>
          )
        )
        })
      )
    }
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

  render() {
    return (
      <div>
        <h2 className="mobile__pulsa__label">Pilih Paket Data mu</h2>
        <div className="mobile__pulsa__content1">
          {this.pulsaItem()}
        </div>
        {this.renderModalBid()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    priceData: state.priceReducer.priceData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(PaketData)

export default connectComponent