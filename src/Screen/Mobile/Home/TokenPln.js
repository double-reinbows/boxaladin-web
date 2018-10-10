import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ModalConfirm from '../../Home/Modal/ModalConfirm'
import { getPrices } from '../../../actions/priceAction'
import envChecker from '../../../utils/envChecker'

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      inputPln: "",
      success: false,
      disabledBtn:true,
      disabledCheck:true,
      priceId: 0,
      price: '',
      displayPrice: 0,
      notif: '',
      notif2: '',
      type: ''
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
      priceId: id,
      displayPrice,
      type: 'price'
    })
  }

  NextBtn = () => {
    this.setState({
      success: true
    })
  }

  submitPlnNumber = () =>{
    // this.props.setIsLoading(true)
    axios({
      method: 'POST',
      url: `${envChecker('api')}/checkuserpln`,
      data: {
        tokenNumber : this.state.inputPln
      }
    })
    .then(response=> {
        console.log('responbackend', response)
    //   this.props.setIsLoading(false)
      if (response.data.message._text === "SUCCESS"){
        this.setState({
          // success:true,
          disabledBtn:false 
        })
      } else {
        this.setState({
          notif: 'No Yang Anda Masukkan Salah',
          success: false
        })
      }
    })
  }

  checkPlnNumber = (e) => {
    this.setState({
      inputPln: e.target.value,
      disabledCheck: false
    })
  }

  checkSuccess = () => {
    const {success} = this.state
    if (success) {
      return ("isValid")
    }else {
      return ("isInvalid")
    }

  }

  price() {
    const { priceData } = this.props
    if (!priceData) {
      return (
        <h1>Loading</h1>
      )
    } else {
      return (
        this.props.priceData.filter(data => {
          return data.id !== 1 && data.id !== 3
        })
        .map ((data, index) => {
          console.log('tes', data)
          return (
            <button key={index} onClick={() => this.toggleConfirm(data.id, data.displayPrice)} className="mobile__pulsa__button background">{data.displayPrice.toLocaleString(['ban', 'id'])}</button>
          )
          })
        )

      // return(
      //   <Fragment>
      //   <label>No PLN Kamu : {this.state.inputPln}</label>
      //   <br/>
      //   {priceData.map((data, index) => {
      //     return(
      //       <button key={index} onClick={() => this.toggleConfirm(data.id, data.displayPrice)} className="mobile__pulsa__button background">{data.displayPrice.toLocaleString(['ban', 'id'])}</button>
      //     )
      //   })}
      // </Fragment>
      // )
    }
  }

  mobilePln = () => {
    return(
    <div className="mobile__pulsa__content1">
      {this.price()}
    </div>
    )
  }

  changeComponentPln = () => {
    if (this.state.success === true){
      return (this.mobilePln())
    } return (this.inputPln())
  }

  inputPln = () => {
    return (
      <div className="mobile__pulsa__pln">
        <input className={`modal__confirm__pln__input ${this.checkSuccess()}`} value={this.state.inputPln} onChange={this.checkPlnNumber}/>
        <button disabled={this.state.disabledCheck} className="mobile__pulsa__pln__button" onClick={this.submitPlnNumber}>Check No ID</button>
          <br/>
          <br/>
          <button disabled={this.state.disabledBtn} className="mobile__pulsa__pln__button" onClick={this.NextBtn}>Lanjut</button>
        <br/>
        <label>{this.state.notif}</label>
        <label>{this.state.alert}</label>
      </div>
    )
  }

  render() {
    console.log('props tokenpln', this.props.priceData)
    return (
      <div>
        <div className='mobile-home-image-container'>
          <img alt='Telkomsel Icon' className='mobile-home-image' src="https://s3-ap-southeast-1.amazonaws.com/iconpulsa/Telkomsel.svg"/>
       </div>
        <h2 className="mobile__pulsa__label">Masukan Nomor ID Listrik mu</h2>
        {this.changeComponentPln()}
        <ModalConfirm
          typeBuy='buy pln'
          firebase= {envChecker('price')}
          displayPrice={this.state.displayPrice === undefined ? 0 : this.state.displayPrice}
          open={this.state.openModal}
          toggle={this.toggleConfirm}
          priceId={this.state.priceId}
          type={this.state.type}
          pln={this.state.inputPln}
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
