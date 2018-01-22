import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import NavBar from './screen/NavBar'
import NewNavBar from './screen/NewNavBar'
import NewNavBar2 from './screen/NewNavBar2'

import Home from './screen/Home'
import Login from './screen/Login'
import Signup from './screen/Signup'
import EmailVerificationDone from './screen/EmailVerificationDone'
import Phone from './screen/Phone'
import Product from './screen/Product'
import LandingPage from './screen/LandingPage'
import LandingPage2 from './screen/LandingPage2'


class RouteList extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NewNavBar2 />

            <Route
              exact
              path="/"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Redirect to="/home" />
                ) : (
                  <LandingPage />
                )
              }
            />

            <Route exact path="/home" component={Home} />

            <Route
              exact
              path="/landingpage2"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Redirect to="/" />
                ) : (
                  <LandingPage2 />
                )
              }
            />

            <Route
              exact
              path="/login"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Redirect to="/" />
                ) : (
                  <Login />
                )
              }
            />

            <Route
              exact
              path="/signup"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Redirect to="/" />
                ) : (
                  <Signup />
                )
              }
            />

            <Route
              exact
              path="/phone"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Phone />
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            <Route
              path="/product"
              component={Product}
            />
            <Route
              path="/emailVerification"
              component={EmailVerificationDone}
            />
          </div>
        </Router>
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
  return {}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(RouteList)

export default connectComponent
