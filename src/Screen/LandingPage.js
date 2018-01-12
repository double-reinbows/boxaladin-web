import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../logo.jpeg'
import promotion from '../promotion.jpg'

import { loginAction } from '../actions/'

class LandingPage extends Component {
  render () {
    return (
      <div>
        <div style= {{ height: '300px', backgroundColor: 'black', width: '100%'}}>
           <img  src={logo} width="350"  height="300" alt='logo'/>
        </div>
        <div style= {{ height: '80px', backgroundColor: 'green', width: '100%'}} >
          <div >
          <a>Home</a>
          <a>How its works</a>
          <a>Contact</a>
          </div>
        </div>
        <div style= {{ height: '500px', backgroundColor: 'black', width: '100%'}}>
           <img  src={promotion} width="800" height="500" alt='logo'/>
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
