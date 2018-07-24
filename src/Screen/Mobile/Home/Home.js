import React, { Component } from 'react';
import DompetAladin from './DompetAladin'
import Pulsa from './Pulsa'
import Wallet from '../DompetAladin/Wallet'
import AladinKeys from '../DompetAladin/AladinKeys'
import Convert from '../DompetAladin/Convert'
import Menu from '../DompetAladin/Menu'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <DompetAladin/>
        <Pulsa/>
        <Wallet/>
        <AladinKeys/>
        <Convert/>
        <Menu/>
      </div>
    );
  }
}

export default Home;
