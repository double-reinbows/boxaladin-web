import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setModalLogin } from '../../actions';
import { Form, FormGroup, Input, FormFeedback, Button } from 'reactstrap';
import formatEmail from '../../utils/formatEmail';
import envChecker from '../../utils/envChecker'
import helperaxios from '../../utils/axios'

// type State = {
//   email: string,
//   notif: string,
// };
// type Props = {
//   history: Array,
// };

const button  = {
  marginTop: '3%',
  marginBottom: '-2%',
  backgroundColor: '#FFCD06',
  color: 'black'
}

class RequestResetPassword<State> extends React.Component {
  state: State = {
    email: '',
    newEmail: '',
    valid: false,
    invalid: false,
    feedback: null,
    feedback2: null,
    emailNotFound: false,
    disabled: false
  }

  sendLink(e: SyntheticInputEvent<HTMLInputElement>): void {
    e.preventDefault();

    if (this.state.email !== '') {
      axios({
        method: 'POST',
        url: `${envChecker('api')}/forgotpassword`,
        headers: {
          key: process.env.REACT_APP_KEY
        },
        data: {
          email: formatEmail(this.state.email)
        }
      })
      .then(({data}) => {
        if (data.msg === 'email sent') {
          this.checkResponse(false, true, 'Email reset password ulang terkirim!')
          setTimeout(() => {
            this.props.history.push('/');
        }, 3000)
        } else if (data === 'user not found') {
          this.checkResponse(true, false, 'Email Atau No Hp tidak terdaftar, mohon dicek kembali')
        } else if (data.msg === 'email atau nomor hp tidak ada') {
          this.checkResponse(true, false, 'Email Atau No Hp tidak terdaftar, mohon dicek kembali')
        } else if (data.msg === 'nomor hp tidak ada') {
          this.checkResponse(false, true, 'No Hp tidak terdaftar, mohon daftar dahulu')
        } else if (data.msg === 'email tidak ada') {
          this.checkResponse(false, true, 'Email tidak terdaftar, mohon daftar dahulu.')
          this.setState({
            emailNotFound: true,
            disabled: true
          })
        }
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          this.setState({
            feedback: (<FormFeedback>Mohon chek koneksi internet Anda.</FormFeedback>),
          });
        } else {
          this.setState({
            feedback: (<FormFeedback>Mohon maaf ada masalah dengan sistem kami. Mohon coba ulang beberapa saat lagi.</FormFeedback>),
          });
        }
      });
      //whilst waiting for backend response, change button text
      this.checkResponse(true, false , 'Email sedang di kirim...')
    } else {
      this.checkResponse(true, false , 'Email wajib di isi')
    }
  }

  inputNewEmail = () => {
    const {emailNotFound} = this.state
    return emailNotFound && (
      <h1>email tidak ada</h1>
      // <Fragment>
      // <Form className="RequestReset__form"
      //   onSubmit={ (e: SyntheticInputEvent<HTMLInputElement>) => this.sendEmailToken(e) }>
      //   <FormGroup>
      //     <Input className="RequestReset__input"
      //       onChange={(e: SyntheticInputEvent<HTMLInputElement>) => this.setState({newEmail: e.target.value}) }
      //       placeholder="Masukkan Email Anda"
      //       type="email"
      //       name="text"
      //       bsSize="lg"
      //       valid={valid}
      //       invalid={invalid}
      //     />
      //     {feedback2}
      //   </FormGroup>
      // </Form>
      // </Fragment>
    )
  }

  sendEmailToken = (e) => {
    const {email, newEmail} = this.state
    e.preventDefault();
    helperaxios('POST', 'emailforgotPassword', {email: newEmail, phonenumber: email})
    .then(response => {
      if (response.data === 'email is already taken') {
        this.checkResponse(true, false , 'Email Sudah Digunakan')
      } else {
        this.checkResponse(false, true, 'Email reset password ulang terkirim!')
        setTimeout(() => {
          this.props.history.push('/');
      }, 3000)
      }
    })
    .catch(err => console.log(err))
  }

  checkResponse = (bool1, bool2, text) => {
    this.setState({
      invalid: bool1,
      valid: bool2,
      feedback: (<FormFeedback>{text}</FormFeedback>),
    });
  }

  openLoginModal() {
    this.props.setModalLogin(!this.props.modalLogin)
  }

  render() {
    let {valid, invalid, feedback} = this.state;
    return (
      <div className="RequestReset">
        <div className="RequestReset__box">
          <h1 className="RequestReset__text">Lupa Password?</h1>
          <h2 className="RequestReset__text">Tolong masukkan email kamu di kolom bawah ini. Kami akan mengirimkan link ke
            email tersebut untuk meng-reset password kamu.</h2>
          <div className="RequestReset__formBox">
            <Form className="RequestReset__form"
              onSubmit={ (e: SyntheticInputEvent<HTMLInputElement>) => this.sendLink(e) }>
              <FormGroup>
                <Input className="RequestReset__input"
                  onChange={(e: SyntheticInputEvent<HTMLInputElement>) => this.setState({email: e.target.value}) }
                  disabled={this.state.disabled}
                  placeholder='Masukkan Email Kamu'
                  type="text"
                  name="text"
                  id="text"
                  bsSize="lg"
                  valid={valid}
                  invalid={invalid}
                />
                {feedback}
                <Button style={button} onClick={ (e: SyntheticInputEvent<HTMLInputElement>) => this.sendLink(e) }>Kirim Email</Button>
              </FormGroup>
            </Form>
          </div>
          <div className="RequestReset__formBox">
            {this.inputNewEmail()}
          </div>
            <h2 className="RequestReset__text" onClick={()=>this.openLoginModal()}>atau kembali ke login</h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalLogin: state.modalReducer.modalLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalLogin: (payload) => dispatch(setModalLogin(payload)),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(RequestResetPassword);

export default connectComponent;
