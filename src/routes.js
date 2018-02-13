import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

//convention pake camelcase

//component page
// import NavBar from './Screen/Components/NavBar'
import Header from './Screen/Components/Header'
import Footer from './Screen/Components/Footer'

//page non login
import LandingPage from './Screen/LandingPage'
import AboutUs from './Screen/AboutUs'
import HowItWorks from './Screen/HowItWorks'
import Product from './Screen/product'

//page login
import Login from './Screen/Login'
import Signup from './Screen/Signup'

//page after login
import Home from './Screen/Home'
import EmailVerificationDone from './Screen/EmailVerificationDone'
import User from './Screen/User'

//page pembelian
import Invoice from './Screen/Invoice'
import Pembayaran from './Screen/Pembayaran'
<<<<<<< HEAD
import TopupKey from './Screen/TopupKey'
import TopupInvoice from './Screen/TopupInvoice'
import TopupPayment from './Screen/TopupPayment'
// import Cart from './screen/Cart'
=======
>>>>>>> 6349684433c391c1979bdf616e084fe1539438ea


class RouteList extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />

            <Route exact path="/" component={LandingPage} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/howitworks" component={HowItWorks} />

            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/Login"
              render={() =>
                localStorage.getItem('token') !== null ? (
                  <Redirect to="/home" />
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
                  <Redirect to="/home" />
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

<<<<<<< HEAD
            <Route exact path="/invoice" component={Invoice} />
            <Route exact path="/payment/:id" component={Pembayaran} />
            <Route exact path="/topup" component={TopupKey} />
            <Route exact path="/topupinvoice" component={TopupInvoice} />
            <Route exact path="/topupinvoice/:id" component={TopupPayment} />
=======
            <Route
              path="/payment/:id"
              component={Pembayaran}
            />
>>>>>>> 6349684433c391c1979bdf616e084fe1539438ea

            <Route
              path="/invoice"
              component={Invoice}
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
