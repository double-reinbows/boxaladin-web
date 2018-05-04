import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Input } from 'reactstrap'

export default class ResetPassword extends React.Component {
  state = {
    password: null,
    confirmPassword: null,
    notif: ''
  }

  resetPassword(e) {
    e.preventDefault();

    const email = this.props.location.search.split('&')[0].split('=')[1];
    const email_token = this.props.location.search.split('&')[1].split('=')[1];

    if (this.state.password !== null && this.state.confirmPassword !== null) {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/resetpassword?email=${email}&encoded=${email_token}`,
        headers: {
          key: process.env.REACT_APP_KEY,
        },
        data: {
          password: this.state.password,
        }
      })
      .then(({data}) => {
        if (data.msg) {
          alert(data.msg);
          this.props.history.push('/');
        } else {
          console.log('data');
        }
      })
      .catch(err => {
        if (err.message == 'Network Error') {
          this.setState({
            notif: 'Mohon chek koneksi internet Anda.',
          });
        } else {
          this.setState({
            notif: 'Mohon maaf ada masalah dengan sistem kami. Mohon coba ulang beberapa saat lagi',
          })
        }
      });
    } else {
      this.setState({notif: "Mohon isi form dengan password baru Anda."});
    }
  }

  render() {
    return (
      <div className="resetPassword">
        <div className="resetPassword__box">
          <h1 className="resetPassword__text">Mohon masukkan password Anda</h1>

          <Form onSubmit={ (e) => this.resetPassword(e) }>
            <FormGroup>
              <Input className="resetPassword__input"
                onChange={(e) => this.setState({ password: e.target.value })}
                minLength="8" type="password"
                name="password"
                id="password"
                placeholder="Password Baru" />

            </FormGroup>
            <FormGroup>
              <Input className="resetPassword__input"
                onChange={(e) => this.setState({ password: e.target.value })}
                minLength="8" type="password"
                name="password"
                id="password"
                placeholder="Konfirmasi Password Baru" />
            </FormGroup>
          </Form>
          <label className="alert__resetPassword">{this.state.notif}</label>
        </div>
      </div>
    )
  }

}
//
// const mapStateToProps = (state) => {
//   return {
//     //
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     //
//   }
// }
//
// const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
//
// export default connectComponent
