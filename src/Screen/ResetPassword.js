import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Input } from 'reactstrap'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null,
      notif: ''
    }
  }

  render() {
    

    return (
      <div className="resetPassword">
        <h1 className="resetPassword__text">New Password</h1>

        <Form onSubmit={ (e) => this.resetPassword(e) }>
          <FormGroup>
            <Input onChange={(e) => this.setState({ password: e.target.value })} minLength="8" type="password" name="password" id="password" placeholder="new password" />
          </FormGroup>
          <FormGroup>
            <Button color="success" size="lg" block>submit</Button>
          </FormGroup>
        </Form>
        <label className="alert__resetPassword">{this.state.notif}</label>
      </div>
    )
  }

  resetPassword(e) {
    e.preventDefault()

    const email = this.props.location.search.split('&')[0].split('=')[1]
    const email_token = this.props.location.search.split('&')[1].split('=')[1]

    if (this.state.password !== null) {

      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/resetpassword?email=${email}&encoded=${email_token}`,
        data: {
          password: this.state.password
        }
      })
      .then(({data}) => {
        if (data.msg) {
          alert(data.msg)
          this.props.history.push('/')
        } else {
          console.log('data')
        }
      })
      .catch(err => console.log(err))

    } else {
      this.setState({
        notif: "Password Baru Tidak Boleh Kosong",
      })
    }

  }

}

const mapStateToProps = (state) => {
  return {
    //
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

export default connectComponent
