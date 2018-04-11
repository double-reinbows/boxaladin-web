import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from 'reactstrap';

const items = [
  {
    src: 'https://s3-ap-southeast-1.amazonaws.com/iconpulsa/Iklan.jpg',
  },
//   {
    // src: 'http://lh3.ggpht.com/-asY4HtC0iCk/U0qWewb1zRI/AAAAAAAAATw/zPAzDXNY_FY/produk-telkomsel-sangat-menjengkelkan-%25255B5%25255D.jpg?imgmax=800',
//   },
  {
    src: 'https://s3-ap-southeast-1.amazonaws.com/iconpulsa/Iklan+(1).jpg',
  }
];

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
        src={item.src}
        altText={item.altText}
      >
      </CarouselItem>
    ))

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Example;