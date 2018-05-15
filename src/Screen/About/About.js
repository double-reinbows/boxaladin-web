//@flow
import React, { Component } from 'react';
import Footer from '../Components/Footer/Footer';
import Welcome from './Welcome';
import Advantage from './Advantage';
import Faq from './Faq';

class About extends Component {
  render() { 
    return (  
      <div>
        <Welcome/>
        <Advantage/>
        <Faq/>
        <Footer/>
      </div>
    )
  }
}

export default About;