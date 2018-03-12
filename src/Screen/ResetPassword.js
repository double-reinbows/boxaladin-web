import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null
    }
  }

  render() {
    console.log('Props:', this.props)
    console.log('State:', this.state)

    return (
      <div className="container">
        <h1>New Password</h1>

        <Form onSubmit={ (e) => this.resetPassword(e) }>
          <FormGroup>
            <Label for="password">password</Label>
            <Input onChange={(e) => this.setState({ password: e.target.value })} minLength="8" type="password" name="password" id="password" placeholder="new password" />
          </FormGroup>
          <FormGroup>
            <Button color="success">submit</Button>
          </FormGroup>
        </Form>

      </div>
    )
  }

  resetPassword(e) {
    e.preventDefault()

    const email_token = this.props.location.search.split('=')[1]
    
    if (this.state.password !== null) {
      
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/resetpassword?encoded=${email_token}`,
        data: {
          password: this.state.password
        }
      })
      .then(({data}) => {
        if (data.msg) {
          alert(data.msg)
          this.props.history.push('/')
        } else {
          console.log(data)
        }
      })
      .catch(err => console.log(err))

    } else {
      alert('tidak boleh kosong')
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
