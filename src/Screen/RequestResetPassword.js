import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class RequestResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null
    }
  }

  render() {
    console.log('Props:', this.props)
    console.log('State:', this.state)

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
          alert(data.msg)
          this.props.history.push('/')
        } else {
          console.log(data)
        }
      })
      .catch(err => console.log(err))

    } else {
      alert('harus masukan email')
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
