
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
      pulsaPrice : '',
      pulsaName: '',
      modalConfirm : false,
      disabled: true,
      activeTab: '1',
      defaultId: 0,
      category: 'Pulsa',
      defaultName: '',
      defaultId: '',
      defaultPrice: ''
    }
    this.toggleTabs = this.toggleTabs.bind(this);
  }

  toggleConfirm = () => {
    this.setState({
      modalConfirm: !this.state.modalConfirm
    })
  }
  componentDidMount() {
    this.getDefault()
  }

  getDefault = () => {
    const data = this.props.product
    let arr = []
    let arr2 = []
    for (let i = 1; i <= 6; i++) {
      arr.push({
        pulsa: data[`${i}`].pulsa
      })
  }
  const firstItem = arr.map((item, index) => {
    return item.pulsa[0];
  })
  
  console.log('aaaa', firstItem[0])
  }

  choicePulsa=()=>{
    const { product } = this.props
    if (product.length === 0){
      return (
        <h1>Loading</h1>
      )
    } else if ( this.state.activeTab === '2' && this.props.brandName === 'Smartfren'){
      return(
        <label>Paket Data Smartfren Sedang Tidak Tersedia</label>
      )
    } else {
      let name = ''
      let id = ''
      let price = ''
      const brand = [
        {name: 'Telkomsel', brandId: 1},
        {name: 'Xl', brandId: 2},
        {name: 'Indosat', brandId: 3},
        {name: 'Tri', brandId: 4},
        {name: 'Axis', brandId: 5},
        {name: 'Smartfren', brandId: 6},
      ]
      return brand.map((data, idx) => {
        for (let i = 1; i <=brand.length ; i++){
          if (this.state.activeTab === '1'){
            name = product[`${i}`].pulsa[0].productName
            id = product[`${i}`].pulsa[0].id
            price = product[`${i}`].pulsa[0].displayPrice
            return (
              product[`${i}`].pulsa.filter(data2 => {
                return data2.brandId === data.brandId && data2.displayPrice !== 10000 
              })
              .map((data3, i) => {
                return(
                  <button onClick={(e) => this.pulsa(data3.id, data3)} className="modal__pulsa__content__2__button" key = {i}>
                    <div>
                      <img className="modal__pulsa__content__2__logo__image"  src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
                    </div>
                    {data3.displayPrice.toLocaleString(['ban', 'id'])}
                  </button>
                )
              })
            )
          } else if (this.state.activeTab === '2') {
            return (
              product[`${i}`].paketData.filter(data2 => {
                return data2.brandId === data.brandId && data2.displayPrice !== 10000 
              })
              .map((data3, i) => {
                return(
                  <button onClick={(e) => this.pulsa(data3.id, data3)} className="modal__pulsa__content__2__button" key = {i}>
                    <div>
                      <img className="modal__pulsa__content__2__logo__image"  src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
                    </div>
                    {data3.displayPrice.toLocaleString(['ban', 'id'])}
                  </button>
                )
              })
            )
          }
        }
      })
      this.setState({ 
        defaultName: name,
        defaultId: id,
        defaultPrice: price
      })
    }
    // if (this.props.products.length === 0) {
    //   return (
    //     <h1>Loading</h1>
    //   )
    // } else if ( this.state.activeTab === '2' && this.props.brandName === 'Smartfren') {
    //   return(
    //     <label>Paket Data Smartfren Sedang Tidak Tersedia</label>
    //   )
    // } else {
    //   return(
    //     this.props.products.filter(data => {
    //       return data.brand.brandName === `${this.props.brandName}` && data.category.categoryName === this.state.category && data.displayPrice !== 10000
    //     })
    //     .map((data, i) => {
    //       console.log('data filter and map', data)
    //       return (
    //         <button onClick={(e) => this.pulsa(data.id, data)} className="modal__pulsa__content__2__button" value={data.id} key={i}>
    //           <div>
    //           <img className="modal__pulsa__content__2__logo__image"  src={this.props.logo} alt={`Logo ${this.props.brandName}`}/>
    //           </div>
    //           {data.displayPrice.toLocaleString(['ban', 'id'])}
    //         </button>
    //       )
    //     })
    //   )
    // }
  }

  toggle = () => {
    this.setState({
      // pulsaPrice: 25000,
      pulsaName: '',
      disabled: true
    },
      () => this.props.toggle('XL'),
    )
  }

  pulsa(id, data) {
    this.setState({
      defaultId: id,
      pulsaPrice: data.displayPrice,
      pulsaName: data.productName,
      disabled: false,
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
    console.log('this.props', this.props)
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
              <label>{this.state.defaultName}</label>
              <br />
              <label>{this.state.pulsaName}</label>
            </div>
            <div >
              <button onClick={() => this.handleNotLogin()} disabled={this.state.disabled} type="button" className="modal__pulsa__content__3__button__price">
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
