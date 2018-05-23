//@flow

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import ModalConfirm from '../../Home/Modal/ModalConfirm';
import LockIcon from '../../../asset/LandingPage/pulsa/lock.png';
import { selectProductID } from '../../../actions/productAction';

class ModalCheck extends Component {

  constructor(props) {
    super(props);
    this.state = {  
      pulsaPrice : 25000,
      pulsaName: '',
      modalConfirm : false,
      disabled: false,
      defaultId: this.props.defaultId
    }
  }

  toggleConfirm = () => {
    this.setState({
      modalConfirm: !this.state.modalConfirm
    })
  }

  choicePulsa=()=>{
    if (this.props.products.length === 0) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        this.props.products.filter(data => {
          return data.brand === `${this.props.pulsaValue}` && data.category === 'Pulsa'
        })
        .map((data, i) => {
          console.log("dataaaaaaaaaaaaaaaaaaaaa", data)
          return (
            <button onClick={(e) => this.pulsa(data.id, data)} className="modal__pulsa__content__2__button" value={data.id} key={i}>
              <div>
              <img className="modal__pulsa__content__2__logo__image"  src={this.props.logo} alt={`Logo ${this.props.pulsaValue}`}/>
              </div>
              {data.displayPrice.toLocaleString(['ban', 'id'])}
            </button>
          )
        })
      )
    }
  }
  toggle = () => {
    this.setState({
      pulsaPrice: 25000,
      pulsaName: '',
      disabled: true
    },
      () => this.props.toggle('XL'),
    )
  }

  pulsa(id, data) {
    this.setState({
      pulsaPrice: data.displayPrice,
      pulsaName: data.productName,
      disabled: false,
      defaultId: id
    }, () => {
      this.props.selectProductID(this.state.defaultId)

    })
  }

  handleNotLogin() {
    if (localStorage.getItem('token') === null) {
      alert('Anda belum masuk')
    } else {
      this.setState({
        modalConfirm: !this.state.modalConfirm,
      }, () => {
        this.props.selectProductID(this.state.defaultId)

      })
    }
  }

  imageProps = () => {
    if ( !this.props.pulsaValue ){
      return (<h1>Loading</h1>)
    } else if ( this.props.pulsaValue === 'Telkomsel' || this.props.pulsaValue === 'Smartfren') {
      return (
        <img className="modal__pulsa__content__1__logo__image__special" src={this.props.logo} alt={`Logo ${this.props.pulsaValue}`}/>
      )
    } else {
      return (
        <img className="modal__pulsa__content__1__logo__image" src={this.props.logo} alt={`Logo ${this.props.pulsaValue}`}/>
      )
    }
  }

  render() { 
    console.log(this.props)
    return ( 
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__pulsa">
        <div className="modal__pulsa__container">
          <div className="modal__pulsa__content">
            <div className="modal__pulsa__content__1">
              <div className="modal__pulsa__content__1__logo">
                <div>
                  {this.imageProps()}
                </div>
                <label>{this.state.pulsaPrice.toLocaleString(['ban', 'id'])}</label>
              </div>
            </div>
            <div className="modal__pulsa__content__2">
              {this.choicePulsa()}
            </div>
          </div>
          <div className="modal__pulsa__content__3">
            <div className="modal__pulsa__content__3__top">
              <div className="modal__pulsa__content__3__button">
                <button className="modal__pulsa__content__3__button__x" onClick={this.toggle}>X</button>
              </div>
              <label>{ !this.state.pulsaName ? (this.props.defaultName) : (this.state.pulsaName)}</label>
            </div>
            <div >
              <button value={this.props.defaultId} onClick={() => this.handleNotLogin()} disabled={this.state.disabled} type="button" className="modal__pulsa__content__3__button__price">
                Intip Harga 
                <img src={LockIcon} alt="LockIcon" className="modal__pulsa__content__3__button__price__image"/>
              </button>
            </div>
          </div>
          <ModalConfirm open={this.state.modalConfirm} toggle={this.toggleConfirm}/>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    selectedProductID: state.productReducer.selectedProductID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProductID: (id) => dispatch(selectProductID(id))
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalCheck)

export default connectComponent

