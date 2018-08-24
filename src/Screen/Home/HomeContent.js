import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import envChecker from '../../utils/envChecker'
import ProviderModal from './Modal/ProviderModal';
import ModalConfirm from './Modal/ModalConfirm'
class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerModal: false,
      openModal: false,
      defaultId: 0,
      price: '',
    }
  }

  componentDidMount() {
    this.getPrice()
  }

  toggle = () =>  {
    this.setState({
      providerModal: !this.state.providerModal
    })
  }

  toggleConfirm = (id) => {
    this.setState({
      openModal: !this.state.openModal,
      defaultId: id
    })
  }

  price() {
    const { price } = this.state
    if (!price) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return(
        price.map((data, index) => {
          return(
            <button key={index} onClick={() => this.toggleConfirm(data.id)} className="homecontent__bottom__pulsa__button">{data.displayPrice}</button>
          )
        })
      )
    }
  }

  getPrice = () => {
    axios({
      method: 'GET',
      url: `${envChecker('api')}/api/price`,
    })
    .then(response => {
      this.setState({
        price: response.data
      })
    })
    .catch(err => console.log('error'))
  }

  render() {
    return (
      <div className="homecontent__container">
        <div className="homecontent__top">
          <div className="homecontent__top__text">
            <label className="homecontent__top__text__top"><b>Semakin Dilihat, Semakin Murah</b></label>
            <label className="homecontent__top__text__bot">sistem lelang terbalik pertama yang menyajikan harga pulsa termurah Setanah air!</label>
            <label>Ingat  <b>PULSA ?</b></label>
            <div>
            <label>Ingat  <img style = {{ width: '55%' }}src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Logo/logoTextOnly.png" alt="boxaladin" /></label>
            </div>
          </div>
          <div className="homecontent__top__youtube">
          <iframe title="boxaladin intro" width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLBVbVVQLrYxQHfTYfWf0xlrbAYQjajJ8e" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        </div>
        <div className="homecontent__bottom">
          <div className="homecontent__bottom__pulsa">
          {this.price()}
          </div>
          <div className="homecontent__bottom__check">
            <button onClick={this.toggle} className="homecontent__bottom__check__button">CEK PROVIDER-MU</button>
          </div>
        </div>
        <ProviderModal open={this.state.providerModal} buttonToggle={this.toggle}/>
        <ModalConfirm open={this.state.openModal} toggle={this.toggleConfirm} defaultId={this.state.defaultId}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(HomeContent)

export default connectComponent
