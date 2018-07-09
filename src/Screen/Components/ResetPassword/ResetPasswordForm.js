//@flow
import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap'
import {withRouter} from 'react-router-dom';
import envChecker from '../../../utils/envChecker'

type Props = {
  passwordChanged: Function,
  location: {
    search: string,
  },
}
type State = {
  password: null | string,
  confirmPassword: null | string,
  notif: string,
  passwordInvalid: boolean,
  passwordFeedback: null | JSX,
  confirmPasswordInvalid: boolean,
  confirmPasswordFeedback: null | JSX,
}
class ResetPasswordForm extends React.Component<Props, State> {
  state = {
    password: null,
    confirmPassword: null,
    notif: '',
    passwordValid: false,
    passwordInvalid: false,
    passwordFeedback: null,
    confirmPasswordValid: false,
    confirmPasswordInvalid: false,
    confirmPasswordFeedback: null,
  }

  resetPassword(e) {
    e.preventDefault();
    const {email, email_token, passwordChanged} = this.props;
    const {password, confirmPassword} = this.state;
    // const email_token:string = this.props.location.search.split('&')[1].split('=')[1];

    if (password == null) {
      this.setState({
        passwordFeedback: (<FormFeedback>Form ini wajib diisi.</FormFeedback>),
        passwordInvalid: true,
      });
    } else if (password.length < 8) {
      this.setState({
        passwordFeedback: (<FormFeedback>Mohon pakai password dengan kepanjangan minimum 8 karakter</FormFeedback>),
        passwordInvalid: true,
      });
    } else {
      this.setState({
        passwordFeedback: null,
        passwordInvalid: false,
        passwordValid: true,
      });
    }
    if (confirmPassword == null) {
      this.setState({
        confirmPasswordFeedback: (<FormFeedback>Form ini wajib diisi.</FormFeedback>),
        confirmPasswordInvalid: true,
      });
    } else if (password !== confirmPassword) {
      this.setState({
        confirmPasswordFeedback: (<FormFeedback>Password tidak sama.</FormFeedback>),
        confirmPasswordInvalid: true,
      });
    } else {
      this.setState({
        confirmPasswordFeedback: null,
        confirmPasswordInvalid: false,
        passwordValid: true,
      });
    }
    if (password && confirmPassword && password === confirmPassword) {
      axios({
        method: 'POST',
        url: `${envChecker('api')}/resetpassword?email=${email}&encoded=${email_token}`,
        headers: {
          key: process.env.REACT_APP_KEY,
        },
        data: {
          password: password,
        }
      })
      .then(({data}) => {
        if (data.msg === 'password updated') {
          passwordChanged();
        } else if (data.msg === 'link expired') {
          // console.log('data');
          alert('Mohon maaf, Anda harus membuat permintaan mengubah password baru, silakan isi ulang email Anda di page berikut');
          this.props.history.push('/requestresetpassword');
        } else {
          alert('Mohon maaf ada masalah dengan sistem kami. Mohon coba ulang beberapa saat lagi');
        }
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          this.setState({
            notif: 'Mohon chek koneksi internet Anda.',
          });
        } else {
          this.setState({
            notif: 'Mohon maaf ada masalah dengan sistem kami. Mohon coba ulang beberapa saat lagi',
          })
        }
      });
    }
  }

  render() {
    // console.log(this.props);
    return (
      <div className="resetPassword">
        <div className="resetPassword__box">
          <h1 className="resetPassword__text">Mohon masukkan password Anda</h1>
          <div className="resetPassword__formBox">
            <Form className="resetPassword__form" onSubmit={ (e) => this.resetPassword(e) }>
              <FormGroup>
                <Label>Password Baru:</Label>
                <Input className="resetPassword__input"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  type="password"
                  name="password"
                  id="password"
                  invalid={this.state.passwordInvalid}
                  valid={this.state.passwordValid}
                />
                {this.state.passwordFeedback}
              </FormGroup>
              <FormGroup>
                <Label>Konfirmasi Password Baru:</Label>
                <Input className="resetPassword__input"
                  type="password"
                  onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                  invalid={this.state.confirmPasswordInvalid}
                  valid={this.state.confirmPasswordValid}
                />
                {this.state.confirmPasswordFeedback}
              </FormGroup>
              <FormGroup>
                <Button className="resetPassword__button"
                  size="lg" block>Reset
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    )
  }

}
export default withRouter(ResetPasswordForm);
