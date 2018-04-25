// import React from 'react';
//
// import { Modal, ModalHeader, Navbar } from 'reactstrap';
// import { connect } from 'react-redux'
//
// class ModalConfirmation extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modal: false
//     };
//
//     this.toggle = this.toggle.bind(this);
//   }
//
//   toggle() {
//     this.setState({
//       modal: !this.state.modal
//     });
//   }
//   render() {
//       return (
//         <div>
//           <Navbar className="ButtonLoginSignup" onClick={this.toggle}>
//             {this.props.buttonLabel}
//             Login
//             <hr className="dropdownLoginHr"/>
//             <img src={LoginIcon} alt="LoginIcon" className="ButtonLoginSignup__iconLogin" href="/home"/>
//           </Navbar>
//           <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} Modalz" backdrop="static">
//             <ModalHeader toggle={this.toggle} className="ModalTop"></ModalHeader>
//             <Login />
//           </Modal>
//         </div>
//       );
//     }
//   }
//
// const mapStateToProps = (state) => {
//   return {}
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {}
// }
//
// const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ModalConfirmation)
//
// export default connectComponent