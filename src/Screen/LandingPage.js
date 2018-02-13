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
        <div className="row Bar-First">
          <div className="col-sm-6 Bar-First__col1">
            <img src={banner1} className="img-fluid Bar-First__banner" alt="banner1" />
          </div>
          <div className="col-sm-6 Bar-First__col2">
            <img src={banner2} className="Bar-First__banner" alt="banner1" />
            <div className="Bar-First__label">
              <label className="Bar-First__label__TextTop">THE MORE YOU SEE IT,</label>
              <label className="Bar-First__label__TextBottom">THE CHEAPER IT GETS ...</label>
            </div>
          </div>
        </div>


        <div className="text-center Bar-Second" >
          <h2 className="Bar-Second__Text">Whatever the carrier... we are the cheapest, guaranteed !!!</h2>
        </div>
        <div className="text-center Bar-Third">
          <div className="Bar-Third__clip">
            <img src={LogoTelkomsel} className="Bar-Third__img" alt="Logo Telkomsel"/>
            <img src={LogoIndosat} className="Bar-Third__img" alt="Logo Indosat" />
            <img src={LogoXL} className="Bar-Third__img" alt="Logo XL" />
            <img src={LogoTri} className="Bar-Third__img" alt="Logo Tri" />
            <img src={LogoSmart} className="Bar-Third__img" alt="Logo Smart" />
            <img src={LogoBolt} className="Bar-Third__img" alt="Logo Bolt" />
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
