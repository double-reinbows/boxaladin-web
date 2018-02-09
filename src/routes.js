import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

//convention pake camelcase

//component page
import NavBar from './Screen/Components/NavBar'
import Footer from './Screen/Components/Footer'

//page non login
import LandingPage from './Screen/LandingPage'
import AboutUs from './Screen/AboutUs'
import HowItWorks from './Screen/HowItWorks'

//page login
import Login from './Screen/Login'
import Signup from './Screen/Signup'

//page after login
import Home from './Screen/Home'
import EmailVerificationDone from './Screen/EmailVerificationDone'
import User from './Screen/User'

//page can access with or without login
import Product from './Screen/product'

import Invoice from './screen/Invoice'
import InvoiceDetail from './screen/Pembayaran'


class RouteList extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar />

            <Route exact path="/" component={LandingPage} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/howitworks" component={HowItWorks} />

            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/Login"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Redirect to="/landingpage" />
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
                  <Redirect to="/landingpage" />
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
                  <Redirect to="/landingpage" />
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
            <Route exact path="/payment/:id" component={InvoiceDetail} />

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
