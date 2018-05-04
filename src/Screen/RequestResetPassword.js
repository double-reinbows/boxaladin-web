// @flow
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setModalLogin, loginAction } from '../actions/';
import { Button, Form, FormGroup, Input } from 'reactstrap';

type State = {
  email: string,
  notif: string,
  // buttonText: string,
};
type Props = {
  history: Array,
};
class RequestResetPassword<Props, State> extends React.Component {
  state: State = {
    email: '',
    notif: '',
    // buttonText: 'Kirim email',
  }

  sendLink(e: SyntheticInputEvent<HTMLInputElement>): void {
    e.preventDefault();

    if (this.state.email !== '') {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/forgotpassword`,
        headers: {
          key: process.env.REACT_APP_KEY
        },
        data: {
          email: this.state.email
        }
      })
      .then(({data}) => {
        if (data.msg === 'email sent') {
          this.setState({
            notif: 'Email reset password ulang terkirim!',
            // buttonText: 'Terkirim!',
          });
          this.props.history.push('/');
        } else {
          console.log('data')
        }
      })
      .catch(err => {
        if (err.message == 'Network Error') {
          this.setState({
            notif: 'Mohon chek koneksi internet Anda.',
            // buttonText: 'Kirim email',
          });
        } else {
          this.setState({
            notif: 'Mohon maaf ada masalah dengan sistem kami. Mohon coba ulang beberapa saat lagi',
            // buttonText: 'Kirim email',
          })
        }
      });
      //whilst waiting for backend response, change button text
      this.setState({notif: 'Email sedang di kirim...'})

    } else {
      this.setState({
        notif: 'Email Harus diisi',
      })
    }
  }
  openLoginModal() {
    this.props.setModalLogin(!this.props.modalLogin)
  }

  render() {
    let {buttonText, notif} = this.state;
    return (
      <div className="RequestReset">
        <div className="RequestReset__box">
          <h1 className="RequestReset__text">Lupa Password ?</h1>
          <h2 className="RequestReset__text">Tolong masukkan email kamu di kolom bawah ini. Kami akan mengirimkan link ke
            email tersebut untuk meng-reset password kamu.</h2>
          <Form onSubmit={ (e: SyntheticInputEvent<HTMLInputElement>) => this.sendLink(e) }>
            <FormGroup>
               <Input className="RequestReset__input"
                 onChange={(e: SyntheticInputEvent<HTMLInputElement>) => this.setState({email: e.target.value}) }
                 type="email"
                 name="email"
                 id="email"
                 bsSize="lg"
               />
            </FormGroup>
          </Form>
          <label className="alert__resetPassword">{notif}</label>
          <a href="#">
            <h2 className="RequestReset__text"
              onClick={()=>this.openLoginModal()}
              >atau kembali ke login
            </h2>
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalLogin: state.modalReducer.modalLogin,
    // modalRegister: state.modalReducer.modalRegister,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalLogin: (payload) => dispatch(setModalLogin(payload)),
    // setModalRegister: (payload) => dispatch(setModalRegister(payload)),
    // loginAction: () => dispatch(loginAction()),
    // getUser: () => dispatch(getUser()),
    // refreshToken: () => dispatch(refreshToken()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(RequestResetPassword);

export default connectComponent;
