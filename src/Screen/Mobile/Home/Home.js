import React, { Component } from 'react';
import DompetAladin from './DompetAladin'
import Pulsa from './Pulsa'
import Topup from './Topup'
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
        <Topup/>
      </div>
    );
  }
}

export default Home;