import React, { Component } from 'react';
// import { getProducts } from '../../../actions/productAction';
import { connect } from 'react-redux';
import axios from 'axios';
// import priceProduct from '../../../utils/splitPrice'
// import nameProduct from '../../../utils/splitProduct'
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
      product: ''
    }
    this.toggleBid = this.toggleBid.bind(this);

  }
  async toggleBid(brandName, id, logo) {
    await this.setState({
      brandName: brandName,
    // defaultName: name,
    defaultId: id,
    logo: logo
  })
  await this.setState({
    openModal: !this.state.openModal,
  })
}

componentDidMount() {
  this.getBrand()
  this.getProduct()
}

  // priceProduct() {
  //   return this.state.defaultName &&
  //   priceProduct(this.state.defaultName)
  // }

  // nameProduct() {
  //   return this.state.defaultName &&
  //   nameProduct(this.state.defaultName)
  // }

  renderModalBid() {
    if (this.state.openModal) {
      return (
        <ModalBid
          isOpen={this.state.openModal}
          toggle={this.toggleBid}
          brandName={this.state.brandName}
          defaultId={this.state.defaultId}
          logo={this.state.logo}
          // defaultProduct={this.priceProduct()}
          // defaultName={this.nameProduct()}
          product={this.state.product}
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

  getProduct = () => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/api/product`,
    })
    .then(response => {
      const arrayProduct = response.data
      let brands = {}
      for (let i = 0; i < arrayProduct.length; i++){
          if (!(arrayProduct[i].brandId in brands)){
          brands[arrayProduct[i].brandId] = {
            pulsa: [],
            paketData: []
          }
          if (arrayProduct[i].categoryId === 1){
            brands[arrayProduct[i].brandId].pulsa.push(arrayProduct[i])
          } else {
            brands[arrayProduct[i].brandId].paketData.push(arrayProduct[i])
          }
        } else {
          if (arrayProduct[i].categoryId === 1){
            brands[arrayProduct[i].brandId].pulsa.push(arrayProduct[i])
          } else {
            brands[arrayProduct[i].brandId].paketData.push(arrayProduct[i])
          }
        }
      }
      this.setState({
        product: brands
      });
    })
    .catch(err => console.log(err))
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
    console.log(this.state.product)
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
    // products: state.productReducer.products,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    // getProducts: () => dispatch(getProducts()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Pulsa);

export default connectComponent;
