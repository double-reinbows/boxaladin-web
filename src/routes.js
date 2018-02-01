import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import NavBar from './screen/NavBar'

import Home from './screen/Home'
import Login from './screen/Login'
import Signup from './screen/Signup'
import EmailVerificationDone from './screen/EmailVerificationDone'
// import Phone from './screen/Phone'
import Product from './screen/Product'
import LandingPage from './screen/LandingPage'
import User from './screen/User'
import Invoice from './screen/Invoice'
// import Cart from './screen/Cart'


class RouteList extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar />

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
              path="/Login"
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
              path="/me"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <User />
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

            <Route
              exact
              path="/invoice"
              render={() =>
                localStorage.getItem('token') === null ? (
                  <Redirect to="/" />
                ) : (
                  <Invoice />
                )
              }
            />

            {/* <Route
              exact
              path="/cart"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Cart />
                ) : (
                  <Redirect to="/" />
                )
              }
            /> */}

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
