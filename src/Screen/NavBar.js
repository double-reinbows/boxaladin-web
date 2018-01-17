import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logoutAction} from '../actions/'
class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>

            <Link className="navbar-brand" style={{fontSize: '30px', color: 'white'}} to="/home">
              Box<b>Aladin</b>
            </Link>

          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
            style={{float: 'right', position: 'relative'}}
          >
            {this.showMenu()}
            {this.showRightButton()}
          </div>
        </div>
      </nav>
    )
  }

  showRightButton() {
    if (localStorage.getItem('token') !== null) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <button className="btn btn-danger" onClick={() => this.logout()}>
              Logout
            </button>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="nav navbar-nav navbar-right" style={{color: 'white'}}>
          <li style={{fontSize: '30px'}}>
            <Link to="/signup">
              <p style={{color: 'white'}}>Register</p>
            </Link>
          </li>
          <li style={{fontSize: '30px'}}>
            <Link to="/login">
              <p style={{color: 'white'}}>Login</p>
            </Link>
          </li>
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
        <ul className="nav navbar-nav" style={{color: 'white'}}>
          <li style={{fontSize: '30px'}}>
            <Link to="/phone">
              <p style={{color: 'white'}}>Phone</p>
            </Link>
          </li>
          <li style={{fontSize: '30px'}}>
            <Link to="/product">
              <p style={{color: 'white'}}>Product</p>
            </Link>
          </li>
        </ul>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(logoutAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default connectComponent
