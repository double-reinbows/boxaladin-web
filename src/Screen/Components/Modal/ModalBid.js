//@flow

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import ModalConfirm from '../../Home/Modal/ModalConfirm';
import RegisterIcon from '../../../asset/user/IconCheck.svg';
import { selectProductID } from '../../../actions/productAction';

class ModalCheck extends Component {
  static propTypes = {
    buttonToggle: PropTypes.func,
    open: PropTypes.bool,
    phone: PropTypes.string,
    loginAction: PropTypes.func,
    setModalRegister: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {  
      pulsaPrice : '',
      pulsaName: '',
      modalConfirm : false,
      pulsaId: ''
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
          return (
            <button onClick={(e) => this.pulsa(data.id, data)} className="modal__pulsa__content__2__button" value={data.id} key={i}>
              <img className="modal__pulsa__content__2__logo__image"  src={require('../../../asset/LandingPage/pulsa/' + this.props.pulsaValue + '.svg')} alt={`Logo ${this.props.pulsaValue}`}/>
              {data.price.toLocaleString(['ban', 'id'])}
            </button>
          )
        })
      )
    }
  }

  pulsa(e, data){
    console.log('data id', e)
    this.props.selectProductID(e)
    this.setState({
      pulsaPrice: data.price,
      pulsaName: data.productName,
      pulsaId : this.props.selectProductID(e)
    })
  }

  handleNotLogin() {
    if (localStorage.getItem('token') === null) {
      alert('Anda belum masuk')
    } else {
      this.setState({
        modalConfirm: !this.state.modalConfirm
      })
    }
  }

  imageProps = () => {
    if ( this.props.pulsaValue === null || this.props.pulsaValue === undefined || this.props.pulsaValue === ''){
      return (<h1>Loading</h1>)
    } else {
      return (
        <img className="modal__pulsa__content__1__logo__image" src={require('../../../asset/LandingPage/pulsa/' + this.props.pulsaValue + '.svg')} alt={`Logo ${this.props.pulsaValue}`}/>
      )
    }
  }

  render() { 
    console.log('render', this.props.pulsaValue)
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
                <button className="modal__pulsa__content__3__button__x" onClick={() => this.props.toggle('XL')}>X</button>
              </div>
              <label>{this.state.pulsaName}</label>
            </div>
            <div >
              <button onClick={() => this.handleNotLogin()} disabled={this.props.selectedProductID !== '' ? false : true} type="button" className="modal__pulsa__content__3__button__price">
                Intip Harga
                <img src={RegisterIcon} alt="RegisterIcon" className="modal__pulsa__content__3__button__price__image"/>
              </button>
            </div>
          </div>
          <ModalConfirm open={this.state.modalConfirm} toggle={this.toggleConfirm} idPulsa={this.state.pulsaId}/>
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

