//@flow
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';

//component page
import Header from './Screen/Components/Header/Header';
import FooterBot from './Screen/Components/Footer/FooterBot';
import Footer from './Screen/Components/Footer/Footer';

//page non login
import HowItWorks from './Screen/HowItWorks';
import Layanan from './Screen/Layanan';

//page after login
import Home from './Screen/Home/Home';
import EmailVerificationDone from './Screen/EmailVerificationDone';
import User from './Screen/User/Users';

//page pembelian
import TabsInvoice from './Screen/Invoice/TabsInvoice';
import Pembayaran from './Screen/Invoice/Pembayaran';
import TopupInvoice from './Screen/Invoice/TopupInvoice';
import WalletInvoice from './Screen/Invoice/TopupWalletInvoice'

import Bidding from './Screen/Bidding/Bidding'
import InsertPhone from './Screen/Bidding/InsertPhone'
// import Pulsa from './Screen/Pulsa'

import DompetAladin from './Screen/DompetAladin/DompetAladin';
import Game from './Screen/Game';
import GameResult from './Screen/GameResult';
import RequestResetPassword from './Screen/RequestResetPassword';
import ResetPassword from './Screen/ResetPassword';
import ClaimFreePulsa from './Screen/ClaimFreePulsa';
import About from './Screen/About/About';

//mobile
import MobileMenuDompetAladin from './Screen/Mobile/Home/DompetAladin'
import MobileKey from './Screen/Mobile/DompetAladin/AladinKeys'
import MobileConvert from './Screen/Mobile/DompetAladin/Convert'
import MobileWallet from './Screen/Mobile/DompetAladin/Wallet'

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
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

class RouteList extends Component {
  render() {
    return (
      <div className="mainContainer">
        <Router>
          <div>
            <Header />
            <MediaQuery query="(max-device-width: 720px)">
              <MobileMenuDompetAladin/>
            </MediaQuery>
              <div className = "bodyContainer">
                <Route exact path="/" component={Home} />
                <Route exact path="/howitworks" component={HowItWorks} />
                <Route exact path="/home" component={Home} />
                <Route exact path='/layanan' component={Layanan} />
                <PrivateRoute exact path="/me" component={User} />
                <PrivateRoute exact path="/tabsinvoice" component={TabsInvoice} />
                <PrivateRoute exact path="/invoice" component={Pembayaran} />
                <PrivateRoute exact path="/topupinvoice" component={TopupInvoice} />
                <PrivateRoute exact path="/walletinvoice" component={WalletInvoice} />
                <PrivateRoute exact path="/bidding" component={Bidding} />
                <PrivateRoute exact path="/insertphone" component={InsertPhone} />
                <PrivateRoute exact path="/game" component={ Game } />
                <PrivateRoute exact path="/dompetaladin" component={DompetAladin} />
                <PrivateRoute exact path="/gameresult" component={ GameResult } />
                <PrivateRoute exact path="/claimfreepulsa" component={ ClaimFreePulsa } />
                <Route exact path="/About" component={About} />
                <Route exact path="/emailVerification" component={EmailVerificationDone} />
                <Route exact path="/requestresetpassword" component={RequestResetPassword } />
                <Route exact path="/resetpassword/:email/:email_token" component={ResetPassword}/>
                
                <PrivateRoute exact path="/mdompetwallet" component={ MobileWallet } />
                <PrivateRoute exact path="/mdompetkey" component={ MobileKey } />
                <PrivateRoute exact path="/mdompetconvert" component={ MobileConvert } />

              </div>
              <div className="footer__container">
                <Footer />
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
    isLogin: state.userReducer.isLogin,
  }
}

const mapDispatchToProps = dispatch => {
  return {};
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(RouteList);

export default connectComponent;
