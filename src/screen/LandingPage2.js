import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import banner1 from '../asset/LandingPage/banner/001.jpg'
import banner2 from '../asset/LandingPage/banner/002.jpg'
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
                src={banner1}
                width="50%"
                height="50%"
                alt="banner1"
                className="img-responsive"
              />
            </div>

            <div className="col-sm-6">
              <img
                src={banner2}
                width="50%"
                height="50%"
                alt="banner2"
                className="img-responsive"
              />
            </div>
          </div>
        </div>
        <div className="col-sm-12 text-center banner2 logoz" >
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
