import React,{Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import axios from 'axios';

import ModalConfirm from '../../Home/Modal/ModalConfirm';
import { selectPriceID } from '../../../actions/productAction';
import { TabContent, TabPane} from 'reactstrap';
import priceProduct from '../../../utils/splitPrice'
import productName from '../../../utils/splitProduct'
import envChecker from '../../../utils/envChecker'

class ModalCheck extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pulsaPrice : '',
      pulsaName: '',
      modalConfirm : false,
      disabled: false,
      activeTab: '2',
      defaultId: 0,
      defaultName: '',
      defaultPrice: '',
      pulsa: [],
      paketData: []
    }
    this.toggleTabs = this.toggleTabs.bind(this);
  }

  toggleConfirm = () => {
    this.setState({
      modalConfirm: !this.state.modalConfirm
    })
  }
  componentDidMount() {
    this.getProduct()
  }

  getProduct = () => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/api/product/${this.props.defaultId}`,
    })
    .then(response => {
      this.setState({
        pulsa: response.data.pulsa,
        paketData: response.data.paketData,
        defaultName: response.data.pulsa[0].productName,
        defaultId: response.data.pulsa[0].id,
        defaultPrice: response.data.pulsa[0].displayPrice
      })
    })
    .catch(err => console.log('error'))
  }

  choicePulsa = () => {
    const {activeTab, pulsa, paketData} = this.state
    if (pulsa.length === 0 && paketData.length === 0){
      return null
    } else if (activeTab === '2' && paketData.length === 0){
      return(
        <label>Produk Sedang Tidak Tersedia</label>
      )
    } else {
      if (activeTab === '1'){
        return pulsa.map((dataMap, i) => {
          return(
            <button onClick={(e) => this.pulsa(dataMap.id, dataMap)} className="modal__pulsa__content__2__button" key ={i}>
              <div>
                <img className="modal__pulsa__content__2__logo__image"  src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
              </div>
              {dataMap.displayPrice.toLocaleString(['ban', 'id'])}
            </button>
          )
        })
      } else if (activeTab === '2'){
        return paketData.map((dataMap, i) => {
          return(
            <button onClick={(e) => this.pulsa(dataMap.id, dataMap)} className="modal__pulsa__content__2__button" key ={i}>
              <div>
                <img className="modal__pulsa__content__2__logo__image"  src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
              </div>
              {dataMap.displayPrice.toLocaleString(['ban', 'id'])}
            </button>
          )
        })
      }
    }
  }

  toggle = () => {
    this.setState({
      pulsaName: '',
      disabled: true
    },
      () => this.props.toggle(),
    )
  }

  pulsa = async (id, data) => {
    await this.setState({
      defaultId: id,
      pulsaPrice: data.displayPrice,
      pulsaName: data.productName,
      disabled: false,
    })
    this.props.selectPriceID(this.state.defaultId)
  }

  handleNotLogin() {
    if (localStorage.getItem('token') === null) {
      alert('Anda belum masuk')
    } else {
      this.setState({
        modalConfirm: !this.state.modalConfirm,
      }, () => {
        this.props.selectPriceID(this.state.defaultId)

      })
    }
  }

  imageProps = () => {
    if ( !this.props.brandName ){
      return (<h1>Loading</h1>)
    } else if ( this.props.brandName === 'Telkomsel' || this.props.brandName === 'Smartfren') {
      return (
        <img className="modal__pulsa__content__1__logo__image__special" src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
      )
    } else {
      return (
        <img className="modal__pulsa__content__1__logo__image" src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
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
        disabled: true
      });
    }
  }


  render() {
    return (
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__pulsa">
        <div className="modal__pulsa__container">
        <TabContent className="modal__pulsa__tabsContainer" activeTab={this.state.activeTab}>
          <TabPane tabId="2">
          <div className="modal__pulsa__content">
          <div className="modal__pulsa__content__1">
            <div className="modal__pulsa__content__1__logo">
              <div>
                {this.imageProps()}
              </div>
              <label>{ !this.state.pulsaPrice ? (this.state.defaultPrice.toLocaleString(['ban', 'id'])) : this.state.pulsaPrice.toLocaleString(['ban', 'id'])}</label>
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
                      productName(this.state.defaultName) :
                      productName(this.state.pulsaName)}</label>
              <br />
              <label>{ !this.state.pulsaName ?
                      priceProduct(this.state.defaultName) : // penamaan nya masih salah .. ini buat harga
                      priceProduct(this.state.pulsaName)}</label>
            </div>
            <div >
              <button value={this.state.defaultId} onClick={() => this.handleNotLogin()} disabled={this.state.disabled} type="button" className="modal__pulsa__content__3__button__price">
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
    userInfo: state.userReducer.userInfo,
    // products: state.productReducer.products,
    selectedPriceID: state.productReducer.selectedPriceID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getUser: () => dispatch(getUser()),
    selectPriceID: (id) => dispatch(selectPriceID(id))
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalCheck)

export default connectComponent
