import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import logo from '../asset/logo.jpeg'
import iphonex from '../asset/iphonex.svg'
import pulsabanner from '../asset/pulsabanner.png'

import {loginAction} from '../actions/'

class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron jumbo">
          <div className="row">
            <div className="col-sm-2">
              <img
                src={logo}
                width="300"
                height="300"
                alt="logo"
                className="img-responsive"
              />
            </div>

            <div className="banner1 col-sm-8">
              <h2>The more you see it, the more cheaper it gets</h2>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-default navbar-collapse">
          <div className="container-fluid">
            <ul className="nav navbar-nav banner1">
              <li className="betweenText">
                <Link to="/signup">
                  <p style={{color: 'white'}}>Home</p>
                </Link>
              </li>
              <li className="betweenText">
                <Link to="/signup">
                  <p style={{color: 'white'}}>How it works</p>
                </Link>
              </li>
              <li className="betweenText">
                <Link to="/signup">
                  <p style={{color: 'white'}}>Contact us</p>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <img src={pulsabanner} alt="logo" className="stretch" width="200%" />
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse">
          <img
            src={iphonex}
            width="450px"
            height="700px"
            alt="logo"
            style={{position: 'absolute', top: '200px', right: '50px'}}
          />
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
