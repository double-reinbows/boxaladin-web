import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginAction} from '../actions/'

import Carousel from './Components/Home/Carousel'
import BannerText1 from './Components/Home/BannerText1'
import BannerText2 from './Components/Home/BannerText2'
import TabsHome from './Components/Home/TabsHome'

class Home extends Component {
  render() {
    console.log('State:', this.state);
		console.log('Props:', this.props);
    return (
      <div>
        <Carousel />
        <TabsHome />
        <BannerText1 />
        <BannerText2 />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.userReducer.isLogin,
    dataUser: state.userReducer.dataUser,
    phoneNumbers: state.userReducer.phoneNumbers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: () => dispatch(loginAction())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Home)

export default connectComponent
