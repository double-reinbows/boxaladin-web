import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BA_API_HOST = 'http://localhost:3000'

class EmailVerificationDone extends React.Component {
  constructor() {
    super()
  }

  render() {
    console.log(this.props.location.search.split('=')[1])
    return (
      <div>
        <h1>Congratz, your email is verified.</h1>
        <h3>Click <Link to="/login">here</Link> to login</h3>
      </div>
    )
  }

  componentDidMount() {
    this.verifyEmail()
  }

  verifyEmail() {
    const email_token = this.props.location.search.split('=')[1]
    axios({
      method: 'GET',
      url: `${BA_API_HOST}/emailVerification?encoded=${email_token}`
    })
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }
}

export default EmailVerificationDone
