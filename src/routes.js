import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import NavBar from './Screen/NavBar'

import Home from './Screen/Home'
import Login from './Screen/Login'
import Signup from './Screen/Signup'
import EmailVerificationDone from './Screen/EmailVerificationDone'
// import Phone from './Screen/Phone'
import Product from './Screen/Product'
import LandingPage from './Screen/LandingPage'
import User from './Screen/User'
import Invoice from './Screen/Invoice'
import Pembayaran from './Screen/Pembayaran'
import TopupKey from './Screen/TopupKey'
import TopupInvoice from './Screen/TopupInvoice'
import TopupPayment from './Screen/TopupPayment'
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

            <Route exact path="/invoice" component={Invoice} />
            <Route exact path="/payment/:id" component={Pembayaran} />
            <Route exact path="/topup" component={TopupKey} />
            <Route exact path="/topupinvoice" component={TopupInvoice} />
            <Route exact path="/topupinvoice/:id" component={TopupPayment} />

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
