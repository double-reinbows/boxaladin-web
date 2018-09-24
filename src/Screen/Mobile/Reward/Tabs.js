import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.src,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;
    console.log('children', children)
    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child, index) => {
            const { src, alt } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={index}
                image={src}
                onClick={onClickTabItem}
                alt={alt}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.src !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;