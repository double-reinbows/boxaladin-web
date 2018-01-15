import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../logo.jpeg'
import promotion from '../promotion.jpg'
import phone from '../phone.jpeg'

import { loginAction } from '../actions/'

class LandingPage extends Component {
  render () {
    return (
      <div>
        <div style= {{ height: '300px', backgroundColor: 'black', width: '100%'}}>
          <ul>
            <li><img  src={logo} width="380"  height="330" alt='logo' style={{ position: 'absolute', left: '200px'}}/></li>
            <li><h1 style= {{ color: 'white', fontWeight: 'bold', position: 'absolute', left: '400px' }}> The more you see it, the cheaper it gets</h1></li>
          </ul>
        </div>
        <nav className="navbar navbar-default" style= {{ height: '100px' ,paddingTop: '30px', backgroundColor: 'green', marginBottom: '0px', borderColor: 'transparent'}}>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style = {{ float: 'left', position: 'relative'}}>
            <ul className="nav navbar-nav navbar-right">
              <li style = {{ fontSize: '30px'}}><p style = {{ color : 'white'}} >Register</p></li>
              <li style = {{ fontSize: '30px'}}><p style = {{ color : 'white'}} >Login</p></li>
            </ul>
          </div>
        </nav>
        <div style= {{ height: '500px', backgroundColor: 'black', width: '100%'}}>
           <img  src={promotion} width="800" height="500" alt='logo'/>
        </div>
        <div>
        <img  src={phone} width="350"  height="600" alt='logo' style={{ position: 'absolute', top: '300px', right: '100px'}}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: () => dispatch(loginAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(LandingPage)

export default connectComponent
