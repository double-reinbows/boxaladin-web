import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginAction} from '../actions/'

class Home extends Component {
  render() {
    console.log('State:', this.state);
		console.log('Props:', this.props);
    return (
      <div className="text-center">
        <h1>Welcome</h1>
        <h4>This is BoxAladin Home Screen.</h4>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    dataUser: state.userReducer.dataUser,
    phoneNumbers: state.userReducer.phoneNumbers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: () => dispatch(loginAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Home)

export default connectComponent
