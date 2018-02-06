import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginAction} from '../actions/'

// import Carousel from './Components/Home/Carousel'
import BannerHome from './Components/Home/BannerHome'
import Banner2Home from './Components/Home/Banner2Home'
import Banner3Home from './Components/Home/Banner3Home'
import TabsHome from './Components/Home/TabsHome'

class Home extends Component {
  render() {
    console.log('State:', this.state);
		console.log('Props:', this.props);
    return (
      <div>
        <BannerHome />
        <TabsHome />
        <Banner2Home />
        <Banner3Home />
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
