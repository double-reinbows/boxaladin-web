import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Input } from 'reactstrap'

class RequestResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      notif: ''
    }
  }

  render() {
  

    return (
      <div className="RequestReset">
        <h1 className="RequestReset__text">Request Reset Password</h1>

        <Form onSubmit={ (e) => this.sendLink(e) }>
          <FormGroup>
             <Input onChange={(e) => this.setState({ email: e.target.value })} type="email" name="email" id="email" placeholder="email" />
          </FormGroup>
          <FormGroup>
            <Button color="success" size="lg" block>send link</Button>
          </FormGroup>
        </Form>
        <label className="alert__resetPassword">{this.state.notif}</label>
      </div>
    )
  }

  sendLink(e) {
    e.preventDefault()

    if (this.state.email !== null) {

      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/forgotpassword`,
        data: {
          email: this.state.email
        }
      })
      .then(({data}) => {
        if (data.msg === 'email sent') {
          this.setState({
            notif: "Email Sent",
          })
          this.props.history.push('/')
        } else {
          console.log('data')
        }
      })
      .catch(err => console.log(err))

    } else {
      this.setState({
        notif: "Email Harus diisi",
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(RequestResetPassword)

export default connectComponent
