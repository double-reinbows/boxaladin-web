import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import HelperAxios from '../../../../utils/axios'

class CarouselMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
  
  componentDidMount() {
    this.getPictures()
  }

  getPictures = () => {
    HelperAxios('GET', 'carousel')
    .then(response => {
      this.setState({
        items: response.data
      })
    })
    .catch(err => console.log(err))

  }

  render() { 
    return (  
      <UncontrolledCarousel items={this.state.items} />
    );
  }
}
export default CarouselMobile;