//@flow
import React, { Component } from 'react';
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
      </div>
    )
  }
}

export default About;
