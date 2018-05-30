//@flow
import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';


export default class ModalText extends Component <{}> {
  static propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    text: PropTypes.string,
  }
  render() { 
    return (  
      <Modal ariaHideApp={false} isOpen={this.props.isOpen} className="modal__check">
        <div className="modal__check__container">
          <div className="modal__check__container__header">
            <button className="modal__check__button" onClick={this.props.toggle}>X</button>
          </div>
          <div className="modal__check__container__content">
            <label className="modal__check__label">{this.props.text}</label>
          </div>
      </div>
      </Modal>
    )
  }
}

