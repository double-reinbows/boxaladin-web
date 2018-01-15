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
        <div className="container" style= {{ height: '400px', backgroundColor: 'black', width: '100%'}}>
          <ul >
            <img  src={logo} width="380"  height="330" alt='logo' class='img-responsive'/>
            <h1 style= {{ color: 'white', fontWeight: 'bold', position: 'absolute', left: '550px', top: '250px' }}> The more you see it, the cheaper it gets</h1>
          </ul>
        </div>
        <nav className="navbar navbar-default" style= {{ height: '100px' ,paddingTop: '30px', backgroundColor: 'green', marginBottom: '0px', borderColor: 'transparent'}}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2" style = {{ float: 'left', position: 'relative'}}>
              <ul className="nav navbar-nav navbar-right" style = {{ color: 'white'}}>
                <li style = {{ fontSize: '30px'}}><p style = {{ color : 'white', paddingLeft: '130px', paddingRight: '150px'}} >Home</p></li>
                <li style = {{ fontSize: '30px'}}><p style = {{ color : 'white', paddingLeft: '150px', paddingRight: '150px'}} >How it works</p></li>
                <li style = {{ fontSize: '30px'}}><p style = {{ color : 'white', paddingLeft: '150px', paddingRight: '30px'}} >Contact Us</p></li>
              </ul>
            </div>
          </div>
        </nav>
        <div style= {{ height: '480px', backgroundColor: 'black', width: '1000  %'}}>
           <img  src={promotion} alt='logo' class='img-responsive'  width="1000"/>
        </div>
        <div className="collapse navbar-collapse">
          <img  src={phone} width="450px"  height="700px" alt='logo'  style={{ position: 'absolute', top: '200px', right: '150px'}}/>
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
