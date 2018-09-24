import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired
  };

  onClick = () => {
    const {image, onClick } = this.props;
    onClick(image);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        image,
        alt
      },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === image) {
      className += ' tab-list-active';
    }

    return (
      <li
        className={className}
        onClick={onClick}
      >
        <img className="reward-tab-icon"  src={image} alt={alt}/>
      </li>
    );
  }
}

export default Tab;