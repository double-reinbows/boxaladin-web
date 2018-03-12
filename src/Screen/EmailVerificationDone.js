import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BA_API_HOST = `${process.env.REACT_APP_API_HOST}`

class EmailVerificationDone extends React.Component {
  render() {
    return (
      <div>
        <h1>Congratz, your email is verified.</h1>
        { this.showLoginLink() }
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

  showLoginLink() {
    if (localStorage.getItem('token') == null) {
      return (
        <h3>Click <Link to="/login">here</Link> to login</h3>
      )
    }
  }
}

export default EmailVerificationDone
