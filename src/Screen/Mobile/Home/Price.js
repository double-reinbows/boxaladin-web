import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalConfirm from '../../Home/Modal/ModalConfirm'
import { getPrices } from '../../../actions/priceAction'
import envChecker from '../../../utils/envChecker'

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      priceOrProductId: 0,
      price: '',
      displayPrice: 0
    }
  }
  
  componentDidMount() {
    const { priceData, getPrices } = this.props
    if (priceData.length === 0){
      getPrices()
    } 
  }

  toggleConfirm = (id, displayPrice) => {
    this.setState({
      openModal: !this.state.openModal,
      priceOrProductId: id,
      displayPrice
    })
  }

  price() {
    const { priceData } = this.props
    if (!priceData) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        priceData.map((data, index) => {
          return(
            <button key={index} onClick={() => this.toggleConfirm(data.id, data.displayPrice)} className="mobile__pulsa__button background">{data.displayPrice.toLocaleString(['ban', 'id'])}</button>
          )
        })
      )
    }
  }

  render() {
    return (
      <div>
        <div className='mobile-home-image-container'>
          <img alt='Telkomsel Icon' className='mobile-home-image' src="https://s3-ap-southeast-1.amazonaws.com/iconpulsa/Telkomsel.svg"/>
          <img alt='XL Icon' className='mobile-home-image' src="https://s3-ap-southeast-1.amazonaws.com/iconpulsa/XL.svg"/>
          <img alt='Indosat Icon' className='mobile-home-image' src="https://s3-ap-southeast-1.amazonaws.com/iconpulsa/Indosat.svg"/>
          <img alt='Tri Icon' className='mobile-home-image' src="https://s3-ap-southeast-1.amazonaws.com/iconpulsa/Tri.svg"/>
          <img alt='Smartfren Icon' className='mobile-home-image' src="https://s3-ap-southeast-1.amazonaws.com/iconpulsa/Smartfren.svg"/>
        </div>
        <h2 className="mobile__pulsa__label">Pilih Nominal Pulsa mu</h2>
        <div className="mobile__pulsa__content1">
          {this.price()}
        </div>
        <ModalConfirm 
          typeBuy='buy pulsa'
          firebase= {envChecker('price')}
          displayPrice={this.state.displayPrice} 
          open={this.state.openModal} 
          toggle={this.toggleConfirm} 
          priceOrProductId={this.state.priceOrProductId}
        />
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
    getPrices: () => dispatch(getPrices())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Price)

export default connectComponent