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
      activeTab: this.props.children[0].props.tab,
    };
  }

  onClickTabItem = (value) => {
    this.setState({ activeTab: value });
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
    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child, index) => {
            const { alt, src, tab } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={index}
                src={src}
                onClick={onClickTabItem}
                alt={alt}
                tab={tab}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.tab !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;