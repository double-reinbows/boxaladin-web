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
import LogoXL from '../asset/LandingPage/pulsa/XL.svg'


import {loginAction} from '../actions/'


class LandingPage extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6" style={{padding:0}}>
            <img src={banner1} className="img-fluid float-left Bar-Images" alt="banner1" />
          </div>
          <div className="col-sm-6" style={{padding:0}}>
            <img src={banner2} className="img-fluid float-left Bar-Images" alt="banner1" />
          </div>
        </div>


        <div className="text-center Bar-Second" >
          <h2 className="Bar-Second-Text">Whatever the carrier... we are the cheapest, guaranteed !!!</h2>
        </div>
        <div className="col-sm-12 text-center Bar-Third" >
          <div className="row">
            <div className="col-sm-2">
              <img src={LogoTelkomsel} className="Bar-Third-Img" alt="Logo Telkomsel" />
            </div>

            <div className="col-sm-2">
              <img src={LogoIndosat} className="Bar-Third-Img" alt="Logo Indosat" />
            </div>

            <div className="col-sm-2">
              <img src={LogoXL} className="Bar-Third-Img" alt="Logo XL" />
            </div>

            <div className="col-sm-2">
              <img src={LogoTri} className="Bar-Third-Img" alt="Logo Tri" />
            </div>

            <div className="col-sm-2">
              <img src={LogoSmart} className="Bar-Third-Img" alt="Logo Smart" />
            </div>

            <div className="col-sm-2">
              <img src={LogoBolt} className="Bar-Third-Img" alt="Logo Bolt" />
            </div>
          </div>

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
