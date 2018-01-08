import axios from 'axios'
import React, { Component } from 'react'

const URL = 'http://localhost:3000/'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      username: '',
      isSignedIn: false
    }
  }

  logIn(e) {
    e.preventDefault()
    axios.post(URL + 'signin', {
      username: this.state.username,
      password: this.state.password
    })
    .then(({data}) => {
      console.log('signed in')
      /**
       * balikan dari server harusnya berupa jwttoken.
       * ambil token, simpen di localstorage
       */
      console.log(data)
      localStorage.setItem('token', data)
      this.setState({isSignedIn: true})
    })
    .catch(e => {
      console.log(e)
    })
  }

  logInInputHandler(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  logOut(e) {
    e.preventDefault()
    /**
     * hapus localstorage yang nyimpen jwttoken
     */
    localStorage.removeItem('token')
    this.setState({isSignedIn: false})
  }

  render () {
    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={(e) => this.logIn(e)}>
          <label>
            Username
            <input type="text" name="username" placeholder="Input Username" onChange={(e) => this.logInInputHandler(e)} />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="Input Password" onChange={(e) => this.logInInputHandler(e)} />
          </label>
          <input type="submit" value="Log In" />
        </form>

        <br/><br/><br/>

        <h3>Log Out</h3>
        <form onSubmit={(e) => this.logOut(e)}>
          <input type="submit" value="Log Out" />
        </form>
      </div>
    )
  }
}

export default Login
