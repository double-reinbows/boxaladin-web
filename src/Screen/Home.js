import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginAction } from '../actions/'

class Home extends Component {
  render () {
    return (
      <h1>
        Welcome home.
      </h1>
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Home)

export default connectComponent
