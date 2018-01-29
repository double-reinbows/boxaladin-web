import React, {Component} from 'react'
import {connect} from 'react-redux'

// import { Jumbotron, Container } from 'reactstrap';

import banner1 from '../asset/LandingPage/banner/001.jpeg'
import banner2 from '../asset/LandingPage/banner/002.jpeg'

import LogoBolt from '../asset/LandingPage/pulsa/Bolt.svg'
import LogoIndosat from '../asset/LandingPage/pulsa/Indosat.svg'
import LogoSmart from '../asset/LandingPage/pulsa/Smart.svg'
import LogoTelkomsel from '../asset/LandingPage/pulsa/Telkomsel.svg'
import LogoTri from '../asset/LandingPage/pulsa/Tri.svg'
import LogoXL from '../asset/LandingPage/pulsa/Xl.svg'

import {loginAction} from '../actions/'


class LandingPage extends Component {

  render() {
    return (
      <div>
        <div className="row" style={{marginRight:0}}>
          <div className="col-sm-6" style={{padding:0}}>
            <img src={banner1} className="img-fluid float-left Bar-Images" alt="banner1" />
          </div>
          <div className="col-sm-6" style={{padding:0, position:'relative'}}>
            <img src={banner2} className="img-fluid float-left Bar-Images" alt="banner1" />
            <div className="image-label">
              <label className="image-label-text-top">THE MORE YOU SEE IT,</label>
              <label className="image-label-text-bottom">THE CHEAPER IT GETS ...</label>
            </div>
          </div>
        </div>


        <div className="text-center Bar-Second" >
          <h2 className="Bar-Second-Text">Whatever the carrier... we are the cheapest, guaranteed !!!</h2>
        </div>
        <div className="col-sm-12 text-center logo-container" style={{backgroundColor:"white"}}>
              <img src={LogoTelkomsel} className="Bar-Third-Img logo" alt="Logo Telkomsel"/>
              <img src={LogoIndosat} className="Bar-Third-Img logo" alt="Logo Indosat" />
              <img src={LogoXL} className="Bar-Third-Img logo" alt="Logo XL" />
              <img src={LogoTri} className="Bar-Third-Img logo" alt="Logo Tri" />
              <img src={LogoSmart} className="Bar-Third-Img logo" alt="Logo Smart" />
              <img src={LogoBolt} className="Bar-Third-Img logo" alt="Logo Bolt" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: () => dispatch(loginAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(
  LandingPage
)

export default connectComponent
