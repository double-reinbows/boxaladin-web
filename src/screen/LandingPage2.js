import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import logo from '../asset/logo.jpeg'
import pulsabanner from '../asset/pulsabanner.png'

import {loginAction} from '../actions/'

class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron jumbo">
          <div className="row">
            <div className="col-sm-6">
              <img
                src={logo}
                width="300"
                height="300"
                alt="logo"
                className="img-responsive"
              />
            </div>

            <div className="banner1 col-sm-6">
            </div>
          </div>
        </div>
        <div className="col-sm-12 text-center banner2" >
          <h2>Whatever the carrier... we are the cheapest, guaranteed !!!</h2>
        </div>



        <div className="jumbotron jumbo">
          <div className="row">
            <div className="col-sm-12 image-responsive banner3">
              <img src={pulsabanner} class="img-fluid" alt="Responsive image" />
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
