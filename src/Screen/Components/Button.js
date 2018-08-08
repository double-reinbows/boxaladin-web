import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import classnames from 'classnames';

// import './Button.scss';

class Button extends PureComponent {
  static propTypes = {
    size: string,
  }

  size = () => {
    const { size } = this.props;

    return classnames('btn', {
      'btn-small': size === 'small',
      'btn-medium': size === 'medium',
      'btn-large': size === 'large',
    })
  }

  // size = () => {
  //   const { size } = this.props;

  //   return classnames('btn', {
  //     'btn-small': size === 'small',
  //     'btn-medium': size === 'medium',
  //     'btn-large': size === 'large',
  //   })
  // }

  // colorWahab = () => {
  //   const { red, green, blue } = this.props;

  //   return classnames('btn', {
  //     'btn-red': red,
  //     'btn-green': green,
  //     'btn-blue': blue,
  //   })
  // }

  renderStyles = () => {
    const { block } = this.props
    return `${this.size()} ${this.color()} ${block && 'btn-block'}`
  }

  // a = () => {
  //   const b = true
  //   return  b ? '1': '2';
  //   b && 'a'
  // }
  
  render() { 
    return (
      <button className={this.renderStyles()}>{this.props.children}</button>
    );
  }
}

export default Button;