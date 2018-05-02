import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

//convention pake camelcase

//component page
// import NavBar from './Screen/Components/NavBar'
import Header from './Screen/Components/Header/Header'
import FooterBot from './Screen/Components/Footer/FooterBot'

//page non login
import AboutUs from './Screen/AboutUs'
import HowItWorks from './Screen/HowItWorks'
import Layanan from './Screen/Layanan'

//page after login
import Home from './Screen/Home/Home'
import EmailVerificationDone from './Screen/EmailVerificationDone'
import User from './Screen/User/Users'

//page pembelian
import Invoice from './Screen/Invoice'
import Pembayaran from './Screen/Pembayaran'
import TopupKey from './Screen/TopupKey'
import TopupInvoice from './Screen/TopupInvoice'
import TopupPayment from './Screen/TopupPayment'
// import Cart from './screen/Cart'

import Bidding from './Screen/Bidding'
import InsertPhone from './Screen/Components/InsertPhone/InsertPhone'
// import Pulsa from './Screen/Pulsa'

import DompetAladin from './Screen/DompetAladin'
import Game from './Screen/Game'
import GameResult from './Screen/GameResult'
// import ClaimReward from './Screen/ClaimReward'
import RequestResetPassword from './Screen/RequestResetPassword'
import ResetPassword from './Screen/ResetPassword'
import ClaimFreePulsa from './Screen/ClaimFreePulsa'

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
      <div className="mainContainer">
        <Router>
          <div>
            <Header />
              <div className = "bodyContainer">
                <Route exact path="/" component={Home} />
                <Route exact path="/aboutus" component={AboutUs} />
                <Route exact path="/howitworks" component={HowItWorks} />
                <Route exact path="/home" component={Home} />
                <Route exact path='/layanan' component={Layanan} />

                <PrivateRoute exact path="/me" component={User} />
                <PrivateRoute exact path="/invoice" component={Invoice} />
                <PrivateRoute exact path="/payment/:id" component={Pembayaran} />
                <PrivateRoute exact path="/topup" component={TopupKey} />
                <PrivateRoute exact path="/topupinvoice" component={TopupInvoice} />
                <PrivateRoute exact path="/topupinvoice/:id" component={TopupPayment} />
                <PrivateRoute exact path="/bidding" component={Bidding} />
                <PrivateRoute exact path="/insertphone" component={InsertPhone} />
                {/* <PrivateRoute exact path="/pulsa" component={Pulsa} /> */}
                <PrivateRoute exact path="/game" component={ Game } />
                <PrivateRoute exact path="/dompetaladin" component={DompetAladin} />
                <PrivateRoute exact path="/gameresult" component={ GameResult } />
                <PrivateRoute exact path="/claimfreepulsa" component={ ClaimFreePulsa } />
                {/* <PrivateRoute exact path="/claimreward" component={ ClaimReward } /> */}

                <Route exact path="/emailVerification" component={EmailVerificationDone} />
                {/* <Route exact path="/product" component={Product} /> */}
                <Route exact path="/requestresetpassword" component={RequestResetPassword} />
                <Route exact path="/resetpassword" component={ResetPassword} />
              </div>
              <div className="phantom">
              </div>
            <div className = "footerContainer">
              <FooterBot/>
            </div>
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
