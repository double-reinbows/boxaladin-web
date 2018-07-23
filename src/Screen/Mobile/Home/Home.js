import React, { Component } from 'react';
import { getProducts } from '../../../actions/productAction';
import { connect } from 'react-redux';
import priceProduct from '../../../utils/splitPrice'
import nameProduct from '../../../utils/splitProduct'
import ModalBid from '../../Components/Modal/ModalBid'
import Dompet from './DompetAladin'

class Home extends Component {
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
          return data.displayPrice === 25000 && data.category === 'Pulsa' && data.category && data.brand !== 'Axis' && data.brand !=='Smartfren' && data.brand !== 'Tri'
        })
        .map((data, i) => {
          const pulsaItems = [
            {onClick: () => this.toggleBid(`${data.brand}`, `${data.productName}`, `${data.id}`, data.brandLogo), img: data.brandLogo, alt:`Logo ${data.brand}`},
          ]
          return pulsaItems.map(data => (
            <button key={i} onClick={data.onClick} className="mobile__home__button">
              <img className="mobile__home__button__image" src={data.img} alt={data.alt}/>
            </button>
          )
        )
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
          return data.displayPrice === 25000 && data.category === 'Pulsa' && data.category && data.brand !== 'Axis' && data.brand !=='Telkomsel' && data.brand !== 'XL' && data.brand !== 'Indosat'
        })
        .map((data, i) => {
          const pulsaItems = [
            {onClick: () => this.toggleBid(`${data.brand}`, `${data.productName}`, `${data.id}`, data.brandLogo), img: data.brandLogo, alt:`Logo ${data.brand}`},
          ]
          return pulsaItems.map(data => (
            <button key={i} onClick={data.onClick} className="mobile__home__button">
              <img className="mobile__home__button__image" src={data.img} alt={data.alt}/>
            </button>
          )
        )
        })
      )
    }
  }

  render() {
    return (
      <div>
        <Dompet />
        <label className="mobile__home__label">PILIH PROVIDER KALIAN</label>
        <div className="mobile__home__content1">
          {this.pulsaItem1()}
        </div>
        <div className="mobile__home__content2">
          {this.pulsaItem2()}
        </div>
        {this.renderModalBid()}
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Home);

export default connectComponent;
