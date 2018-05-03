// @flow
import React from 'react'
import axios from 'axios'
// import { connect } from 'react-redux'
import { Button, Form, FormGroup, Input } from 'reactstrap'

type State = {
  email: string | null,
  notif: string,
  buttonText: string,
};
type Props = {
  history: Array,
};
export default class RequestResetPassword<Props, State> extends React.Component {
  state: State = {
    email: null,
    notif: '',
    buttonText: 'Kirim email',
  }

  sendLink(e: SyntheticInputEvent<HTMLInputElement>): void {
    e.preventDefault();

    if (this.state.email !== null) {
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
            buttonText: 'Terkirim!',
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
            buttonText: 'Kirim email',
          });
        } else {
          this.setState({
            notif: 'Mohon maaf ada masalah dengan sistem kami. Mohon coba ulang beberapa saat lagi',
            buttonText: 'Kirim email',
          })
        }
      });
      this.setState({buttonText: 'Sending email....'})

    } else {
      this.setState({
        notif: 'Email Harus diisi',
      })
    }

  }

  render() {
    let {buttonText, notif} = this.state;
    return (
      <div className="RequestReset">
        <h1 className="RequestReset__text">Request Reset Password</h1>

        <Form onSubmit={ (e: SyntheticInputEvent<HTMLInputElement>) => this.sendLink(e) }>
          <FormGroup>
             <Input onChange={(e: SyntheticInputEvent<HTMLInputElement>) => this.setState({email: e.target.value}) } type="email" name="email" id="email" placeholder="email" />
          </FormGroup>
          <FormGroup>
            <Button color="success" size="lg" block>{buttonText}</Button>
          </FormGroup>
        </Form>
        <label className="alert__resetPassword">{notif}</label>
      </div>
    )
  }



}
