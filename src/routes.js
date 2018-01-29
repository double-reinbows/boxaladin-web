import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import NavBar from './screen/components/navbar'
import Footer from './screen/components/footer'

import Login from './screen/login'
import Signup from './screen/signup'
import EmailVerificationDone from './screen/emailVerificationDone'
import Product from './screen/Product'
import LandingPage from './screen/landingPage'
import User from './screen/User'
import Home from './screen/home'


// import Phone from './screen/Phone'


class RouteList extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar />

            <Route exact path="/" component={LandingPage} />
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

            <Footer/>
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
