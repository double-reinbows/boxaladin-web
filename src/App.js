import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Screen/Home'
import Login from './Screen/login'
import Signup from './Screen/signup'

import Product from './Screen/Product'

class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <Route exact path="/" component={ Home }/>
        <Route path="/login" component={ Login }/>
        <Route path="/signup" component={ Signup }/>
        <Route path="/Product" component={ Product }/>
      </div>
    </Router>
    )
  }
}

export default App;
