import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { UncontrolledCarousel } from 'reactstrap';

import banner1 from '../asset/LandingPage/banner/001.jpg'
import banner2 from '../asset/LandingPage/banner/002.jpg'
import pulsabanner from '../asset/pulsabanner.png'

import {loginAction} from '../actions/'


const items = [
{
  src: banner1,
  altText: 'Pulsa termurah',
  caption: 'Slide 1'
},
{
  src: banner2,
  altText: 'Slide 3',
  caption: 'Slide 3'
}
];

class LandingPage extends Component {

  render() {
    return (
      <div>
      <UncontrolledCarousel items={items} />


        <div className="col-sm-12 text-center logoz" >
          <h2>Whatever the carrier... we are the cheapest, guaranteed !!!</h2>
        </div>


        <div className="jumbotron jumbo">
          <div className="row">
            <div className="col-sm-12 image-responsive banner3">
              <img src={banner1} class="img-fluid" alt="Responsive image" />
            </div>
          </div>
        </div>


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
  return {
    loginAction: () => dispatch(loginAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(
  LandingPage
)

export default connectComponent
