import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';

import { getProducts } from '../../actions/productAction';


import ProviderModal from './Modal/ProviderModal';
import ModalBid from '../Components/Modal/ModalBid'

import LogoIndosat from '../../asset/LandingPage/pulsa/Indosat.svg';
import LogoSmart from '../../asset/LandingPage/pulsa/Smartfren.svg';
import LogoTelkomsel from '../../asset/LandingPage/pulsa/Telkomsel.svg';
import LogoTri from '../../asset/LandingPage/pulsa/Tri.svg';
import LogoXL from '../../asset/LandingPage/pulsa/XL.svg';

import priceProduct from '../../utils/splitPrice'
import nameProduct from '../../utils/splitProduct'

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerModal: false,
      openModal: false,
      pulsaValue: '',
      logo: '',
      defaultName: '',
      defaultId: 0,
      logo: ''
    }
    this.toggleBid = this.toggleBid.bind(this);
  }


  toggle = () =>  {
    this.setState({
      providerModal: !this.state.providerModal
    })
  }

  async toggleBid(pulsa, name, id, logo) {
      await this.setState({
      pulsaValue: pulsa,
      defaultName: name,
      defaultId: id,
      logo: logo
    })
    await this.setState({
      openModal: !this.state.openModal,
    })
  }




  pulsaItem() {
    if (this.props.products.length === 0) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.props.products.filter(data => {
          return data.displayPrice === 25000 && data.category === 'Pulsa' && data.category && data.brand !== 'Axis'
        })

        .map((data, i) => {
          const pulsaItems = [
            {onClick: () => this.toggleBid(`${data.brand}`, `${data.productName}`, `${data.id}`, data.brandLogo), img: data.brandLogo, alt:`Logo ${data.brand}`},
          ]
          return pulsaItems.map(data => (
            <button onClick={data.onClick} className="homecontent__bottom__pulsa__button">
              <img className="homecontent__bottom__pulsa__button__image" src={data.img} alt={data.alt}/>
            </button>
          )
        )
        })
      )
    }
    // const pulsaItems = [
    //   {onClick: () => this.toggleBid('XL', 'Pulsa XL 25.000', 142), img: LogoXL, alt:"Logo XL"},
    //   {onClick: () => this.toggleBid('Telkomsel', 'Pulsa Telkomsel 25.000', 139), img: LogoTelkomsel, alt:"Logo Telkomsel"},
    //   {onClick: () => this.toggleBid('Smartfren', 'Pulsa Smartfren 25.000', 16), img: LogoSmart, alt:"Logo Smart"},
    //   {onClick: () => this.toggleBid('Indosat', 'Pulsa Indosat 25.000', 145), img: LogoIndosat, alt:"Logo Indosat"},
    //   {onClick: () => this.toggleBid('Tri', 'Pulsa Tri 25.000',   ), img: LogoTri, alt:"Logo Tri"}
    // ]

    // return pulsaItems.map(data => (
    //     <button onClick={data.onClick} className="homecontent__bottom__pulsa__button">
    //       <img className="homecontent__bottom__pulsa__button__image" src={data.img} alt={data.alt}/>
    //     </button>
    //   )
    // )
  }

  priceProduct() {
    return this.state.defaultName &&
    priceProduct(this.state.defaultName)
  }

  nameProduct() {
    return this.state.defaultName &&
    nameProduct(this.state.defaultName)
  }

  renderModalBid() {
    if (this.state.openModal) {
      return (
        <ModalBid
          isOpen={this.state.openModal}
          toggle={this.toggleBid}
          pulsaValue={this.state.pulsaValue}
          defaultId={this.state.defaultId}
          logo={this.state.logo}
          defaultProduct={this.priceProduct()}
          defaultName={this.nameProduct()}
        />
      )
    }
    return null;
  }

  render() {
    return (
      <div className="homecontent__container">
        <div className="homecontent__top">
          <div className="homecontent__top__text">
            <label className="homecontent__top__text__top"><b>Semakin Dilihat, Semakin Murah</b></label>
            <label className="homecontent__top__text__bot">sistem lelang terbalik pertama yang menyajikan harga pulsa termurah Setanah air!</label>
            <label>Ingat  <b>PULSA ?</b></label>
            <div>
            <label>Ingat  <img style = {{ width: '55%' }}src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/logoTextOnly.png" alt="boxaladin" /></label>
            </div>
          </div>
          <div className="homecontent__top__youtube">
          <iframe title="boxaladin intro" width="100%" height="100%" src="https://www.youtube.com/embed/DR0bccmd3b0" ></iframe>
          </div>
        </div>
        <div className="homecontent__bottom">
          <div className="homecontent__bottom__pulsa">
          {this.pulsaItem()}
          </div>
          <div className="homecontent__bottom__check">
            <button onClick={this.toggle} className="homecontent__bottom__check__button">CEK PROVIDER-MU</button>
          </div>
        </div>
        <ProviderModal open={this.state.providerModal} buttonToggle={this.toggle}/>
        {
          this.renderModalBid()
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
    products: state.productReducer.products,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    getProducts: () => dispatch(getProducts()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(HomeContent);

export default connectComponent;
