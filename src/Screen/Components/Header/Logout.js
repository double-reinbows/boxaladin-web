import React, { Component } from 'react';
import {connect} from 'react-redux'
import {logoutAction} from '../../../actions'

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    this.logout()
  }

  logout = () => {
    localStorage.removeItem('token')
    this.props.logoutAction()
    window.location.reload()
  }

  render() { 
    return (  
      <label></label>
    );
  }
}
const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(logoutAction()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Logout)

export default connectComponent
