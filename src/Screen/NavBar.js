import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logoutAction } from '../actions/'
class NavBar extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    console.log(this.props.isLogin)
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">boxAladin</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            { this.showMenu() }
            { this.showRightButton() }
          </div>
        </div>
      </nav>
    )
  }

  showRightButton() {
    if (localStorage.getItem('token') !== null) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="?#" onClick={ () => localStorage.removeItem('token') }>Logout</a></li>
        </ul>
      )
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/signup">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )
    }
  }

  goToLogin() {
    this.props.history.push('/login')
  }

  showMenu() {
    if (localStorage.getItem('token') !== null) {
      return (
        <ul className="nav navbar-nav">
          <li><a href="?#">Link</a></li>
          <li><a href="?#">Link</a></li>
        </ul>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => dispatch(logoutAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default connectComponent
