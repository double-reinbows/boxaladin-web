import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

//convention pake camelcase

//component page
// import NavBar from './Screen/Components/NavBar'
import Header from './Screen/Components/Header/Header'
import Footer from './Screen/Components/Footer'

//page non login
import AboutUs from './Screen/AboutUs'
import HowItWorks from './Screen/HowItWorks'
import Product from './Screen/Product'

//page after login
import Home from './Screen/Home'
import EmailVerificationDone from './Screen/EmailVerificationDone'
import User from './Screen/Users'

//page pembelian
import Invoice from './Screen/Invoice'
import Pembayaran from './Screen/Pembayaran'
import TopupKey from './Screen/TopupKey'
import TopupInvoice from './Screen/TopupInvoice'
import TopupPayment from './Screen/TopupPayment'
// import Cart from './screen/Cart'

import Bidding from './Screen/Bidding'
import InsertPhone from './Screen/Components/InsertPhone/InsertPhone'
import Pulsa from './Screen/Pulsa'

import Game from './Screen/Game'
import Win from './Screen/Win'
// import RewardClaim from './Screen/RewardClaim'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      ))
    }
  />
);

class RouteList extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />

            <Route exact path="/" component={Home} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/howitworks" component={HowItWorks} />
            <Route exact path="/home" component={Home} />

            <PrivateRoute exact path="/me" component={User} />
            <PrivateRoute exact path="/invoice" component={Invoice} />
            <PrivateRoute exact path="/payment/:id" component={Pembayaran} />
            <PrivateRoute exact path="/topup" component={TopupKey} />
            <PrivateRoute exact path="/topupinvoice" component={TopupInvoice} />
            <PrivateRoute exact path="/topupinvoice/:id" component={TopupPayment} />
            <PrivateRoute exact path="/bidding" component={Bidding} />
            <PrivateRoute exact path="/insertphone" component={InsertPhone} />
            <PrivateRoute exact path="/pulsa" component={Pulsa} />
            <PrivateRoute exact path="/game" component={ Game } />
            <PrivateRoute exact path="/win" component={ Win } />
            {/* <PrivateRoute exact path="/reward/:id" component={ RewardClaim } /> */}

            <Route exact path="/emailVerification" component={EmailVerificationDone} />
            {/* <Route exact path="/product" component={Product} /> */}

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
