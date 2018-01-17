import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginAction} from '../actions/'

class Home extends Component {
  render() {
    return (
      <div className="text-center">
        <h1>Welcome</h1>
        <h4>This is BoxAladin's Home Screen.</h4>
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Home)

export default connectComponent
