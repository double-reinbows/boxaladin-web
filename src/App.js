import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/'
import Home from './Screen/Home'
import Login from './Screen/login'
import Signup from './Screen/signup'
import NavBar from './Screen/NavBar'
import EmailVerificationDone from './Screen/EmailVerificationDone'
import Phone from './Screen/Phone'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <div className="container">
              <Route exact path="/" component={ Home }/>
              <Route path="/login" component={ Login }/>
              <Route path="/signup" component={ Signup }/>
              <Route path="/emailVerification" component={ EmailVerificationDone }/>
              <Route path="/phone" component={ Phone }/>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
