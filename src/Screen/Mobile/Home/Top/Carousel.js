import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import HelperAxios from '../../../../utils/axios'

export default class CarouselMobile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    };
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

    renderImage = () => {
      const settings = {
        infinite: true,
        speed: 450,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        lazyLoad: true,
      };
      return(
        <div>
          <Slider {...settings}>
            {
            this.state.items.map((item, index) => {
              return (
              <Link to={item.caption}>
                <img className="d-block img-fluid" src={item.src} alt={item.altText} />
              </Link>
                )
            })
            }
          </Slider>
        </div>
      )
    }

  render() {
    return (
      <div>
        {this.renderImage()}
      </div>
    );
  }
}