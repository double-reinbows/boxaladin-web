import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    tab: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired
  };

  onClick = () => {
    const {tab, onClick } = this.props;
    onClick(tab);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        src,
        alt,
        tab
      },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === tab) {
      className += ' tab-list-active';
    }

    return (
      <li
        className={className}
        onClick={onClick}
      >
        <img className="reward-tab-icon"  src={src} alt={alt}/>
      </li>
    );
  }
}

export default Tab;