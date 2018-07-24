import React, { Component } from 'react';
import { getProducts } from '../../../actions/productAction';
import { connect } from 'react-redux';
import priceProduct from '../../../utils/splitPrice'
import nameProduct from '../../../utils/splitProduct'
import ModalBid from '../../Components/Modal/ModalBid'

class Pulsa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      pulsaValue: '',
      logo: '',
      defaultName: '',
      defaultId: 0,
    }
    this.toggleBid = this.toggleBid.bind(this);

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

  pulsaItem1() {
    if (this.props.products.length === 0) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.props.products.filter(data => {
          return data.displayPrice === 25000 && data.categoryId === 1 && data.brand.brandName !== 'Axis' && data.brand.brandName !== 'Smartfren' && data.brand.brandName !== 'Tri'
        }).map((data, i) => {
          const pulsaItems = [
            {onClick: () => this.toggleBid(`${data.brand.brandName}`, `${data.productName}`, `${data.id}`, data.brand.brandLogo), img: data.brand.brandLogo, alt:`Logo ${data.brand.brandName}`, name: data.brand.brandName},
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
    if (this.props.products.length === 0) {
      return null
    } else {
      return(
        this.props.products.filter(data => {
          return data.displayPrice === 25000 && data.categoryId === 1 && data.brand.brandName !== 'Axis' && data.brand.brandName !== 'Telkomsel' && data.brand.brandName !== 'XL' && data.brand.brandName !== 'Indosat'
        }).map((data, i) => {
          const pulsaItems = [
            {onClick: () => this.toggleBid(`${data.brand.brandName}`, `${data.productName}`, `${data.id}`, data.brand.brandLogo), img: data.brand.brandLogo, alt:`Logo ${data.brand.brandName}`, name: data.brand.brandName},
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Pulsa);

export default connectComponent;
