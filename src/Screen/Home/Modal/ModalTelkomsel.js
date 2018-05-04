import React, { Component } from 'react';

import { Button, Modal , ModalHeader} from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import RegisterIcon from '../../../asset/user/IconCheck.svg'
import LogoTelkomsel from '../../../asset/LandingPage/pulsa/Telkomsel.svg';
import { selectProductID } from '../../../actions/productAction'

class ModalTelkomsel extends Component {
  constructor(props) {
    super(props);
    this.pulsa = this.pulsa.bind(this)
    this.state = {  
      pulsaPrice : '',
      pulsaName: ''
    }
  }

  pulsa(e, data){
    this.props.selectProductID(e),
    console.log('data', e)
    this.setState({
      pulsaPrice: data.price,
      pulsaName: data.productName
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
          return data.brand === 'Telkomsel' && data.category === 'Pulsa'
        })
        .map((data, i) => {
          return (
            <button onClick={(e) => this.pulsa(data.id, data)} className="modal__pulsa__content__2__button" value={data.id} key={i}>
              <img className="modal__pulsa__content__2__logo__image"  src={LogoTelkomsel} alt="Logo Telkomsel"/>
              {data.price.toLocaleString(['ban', 'id'])}
            </button>
          )
        })
      )
    }
  }

  handleNotLogin() {
    if (localStorage.getItem('token') === null) {
      alert('Anda belum masuk')
    }
  }

  render() { 
    return (  
      <Modal isOpen={this.props.open} className="modal__pulsa">
        <div className="modal__pulsa__container">
          <div className="modal__pulsa__content">
            <div className="modal__pulsa__content__1">
              <div className="modal__pulsa__content__1__logo">
                <div>
                  <img className="modal__pulsa__content__1__logo__image" src={LogoTelkomsel} alt="Logo Telkomsel"/>
                </div>
                <label>{this.state.pulsaPrice.toLocaleString(['ban', 'id'])}</label>
              </div>
            </div>
            <div className="modal__pulsa__content__2">
              {this.choicePulsa()}
            </div>
          </div>
          <div className="modal__pulsa__content__3">
            <div>
            <div className="modal__pulsa__content__3__button">
                <button className="modal__pulsa__content__3__button__x" onClick={this.props.buttonToggle}>X</button>
              </div>
              <label>{this.state.pulsaName}</label>
            </div>

              <div >
              <Link to="/bidding">

                <button onClick={() => this.handleNotLogin()} disabled={this.props.selectedProductID !== '' ? false : true} type="button" className="modal__pulsa__content__3__button__price">
                Intip Harga
                <img src={RegisterIcon} alt="RegisterIcon" className="modal__pulsa__content__3__button__price__image"/>
                </button>
                </Link>

              </div>
          </div>
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalTelkomsel)

export default connectComponent
