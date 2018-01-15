import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../logo.jpeg'
import promotion from '../promotion.jpg'
import phone from '../phone.jpeg'

import { loginAction } from '../actions/'

class LandingPage extends Component {
  render () {
    return (
      <div>

        <div className="jumbotron jumbo">
          <div className="row">
            <div className="col-sm-2">
              <img  src={logo} width="300"  height="300" alt='logo' className='img-responsive'/>
            </div>
            <div className="banner1 col-sm-8">
              <h2>Semakin dilihat semakin murah</h2>
            </div>
            <div className="col-sm-4">
            </div>
          </div>
        </div>

        <nav class="navbar navbar-default navbar-collapse">
          <div class="container-fluid">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">How it works</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <img  src={promotion} alt='logo' class='img-responsive'  width="1000"/>
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse">
          <img  src={phone} width="450px"  height="700px" alt='logo'  style={{ position: 'absolute', top: '200px', right: '50px'}}/>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: () => dispatch(loginAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(LandingPage)

export default connectComponent
