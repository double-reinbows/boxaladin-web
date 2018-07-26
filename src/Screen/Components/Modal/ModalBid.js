//@flow

import React,{Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import ModalConfirm from '../../Home/Modal/ModalConfirm';
import { selectProductID } from '../../../actions/productAction';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import priceProduct from '../../../utils/splitPrice'
import productName from '../../../utils/splitProduct'

class ModalCheck extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pulsaPrice : 25000,
      pulsaName: '',
      modalConfirm : false,
      disabled: false,
      defaultId: this.props.defaultId,
      activeTab: '1',
      category: 'Pulsa'
    }
    this.toggleTabs = this.toggleTabs.bind(this);
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
    } else if ( this.state.activeTab === '2' && this.props.pulsaValue === 'Smartfren') {
      return(
        <label>Paket Data Smartfren Sedang Tidak Tersedia</label>
      )
    } else {
      return(
        this.props.products.filter(data => {
          return data.brand.brandName === `${this.props.pulsaValue}` && data.category.categoryName === this.state.category && data.displayPrice !== 10000
        })
        .map((data, i) => {
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

    toggleTabs(tab, category) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        category: category,
        pulsaName: '',
        pulsaPrice: '',
        defaultId: '',
        disabled: true
      });
    }
  }

  render() {
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__pulsa">
        <div className="modal__pulsa__container">
        <TabContent className="modal__pulsa__tabsContainer" activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <div className="modal__pulsa__content">
          <Nav className="modal__pulsa__tabs" tabs>
            <NavItem className= "modal__pulsa__tabs__text">
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggleTabs('1', 'Pulsa'); }}
                >
              Pulsa
              </NavLink>
            </NavItem>
            <NavItem className= "modal__pulsa__tabs__text">
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggleTabs('2','Paket Data'); }}
                >
              Paket Data
              </NavLink>
            </NavItem>
          </Nav>
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
          </TabPane>
          <TabPane tabId="2">
          <div className="modal__pulsa__content">
          <Nav className="modal__pulsa__tabs" tabs>
            <NavItem className= "modal__pulsa__tabs__text">
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggleTabs('1', 'Pulsa'); }}
                >
              Pulsa
              </NavLink>
            </NavItem>
            <NavItem className= "modal__pulsa__tabs__text">
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggleTabs('2','Paket Data'); }}
                >
              Paket Data
              </NavLink>
            </NavItem>
          </Nav>
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
          </TabPane>
        </TabContent>
          <div className="modal__pulsa__content__3">
            <div className="modal__pulsa__content__3__top">
              <div className="modal__pulsa__content__3__button">
                <button className="modal__pulsa__content__3__button__x" onClick={this.toggle}>X</button>
              </div>
              <label>{ !this.state.pulsaName ?
                      (this.props.defaultName) :
                      productName(this.state.pulsaName)}</label>
              <br />
              <label>{ !this.state.pulsaName ?
                      (this.props.defaultProduct) : // penamaan nya masih salah .. ini buat harga
                      priceProduct(this.state.pulsaName)}</label>
            </div>
            <div >
              <button value={this.props.defaultId} onClick={() => this.handleNotLogin()} disabled={this.state.disabled} type="button" className="modal__pulsa__content__3__button__price">
                Intip Harga
                <img src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/lock.png' alt="LockIcon" className="modal__pulsa__content__3__button__price__image"/>
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
