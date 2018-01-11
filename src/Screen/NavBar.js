import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logoutAction } from '../actions/'
class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default" style= {{ height: '100px' ,paddingTop: '30px', backgroundColor: 'green'}}>
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Box<b>Aladin</b></Link>
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
          <li><button onClick={ () => this.logout() }>Logout</button></li>
        </ul>
      )
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li style = {{ fontSize: '30px'}}><Link to="/signup">Register</Link></li>
          <li style = {{ fontSize: '30px'}}><Link to="/login">Login</Link></li>
        </ul>
      )
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.props.logoutAction()
  }

  showMenu() {
    if (localStorage.getItem('token') !== null) {
      return (
        <ul className="nav navbar-nav">
          <li><Link to="/phone">Phone</Link></li>
          <li><a href="#?">Link</a></li>
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
