import React from 'react';
import {Modal, ModalHeader, ModalBody, Container } from 'reactstrap';

export default function ModalLineInfo(props) {
  return(
    <Modal isOpen={props.isOpen} toggle={props.onToggle} className="modal__login">
      <div className="modal__login__container__line" >
        <ModalHeader toggle={props.onToggle}  className="modal__login__header">
          <div className="modal__login__header__title" >
            <h2>Add kami di LINE!</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <Container className="text-center">
            <img alt="Line icon"
              src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/SocialMedia/line-qr.jpeg"
              width={150}
              style={{margin: '20px'}}
            />
            <h3>@boxaladin</h3>
          </Container>
        </ModalBody>
      </div>
    </Modal>
  )
}
