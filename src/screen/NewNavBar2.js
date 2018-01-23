import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import logo from '../asset/Logo/LogoBig.svg'


import {logoutAction} from '../actions/'
class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
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
        <ul className=" navbar-nav navbar-right" style={{color: 'white'}}>

          <li className="nav-item">
            <a className="nav-link" href="/login">MEMBER'S AREA</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/signup">NOT YET MEMBER</a>
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
