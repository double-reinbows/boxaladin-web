//@flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import MediaQuery from 'react-responsive';

import {loginAction} from '../../actions/'

import HomeContent from './HomeContent'
import BannerHome from './BannerHome'
import MobileHome from '../Mobile/Home/Home'

type State = {
};
class Home extends Component<Props, State> {
  render() {
    return (
      <div>
        <MediaQuery query="(max-device-width: 720px)">
          <MobileHome/>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 721px)">
          <HomeContent/>
          <BannerHome />
        </MediaQuery>
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
    loginAction: () => dispatch(loginAction()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Home);

export default connectComponent;
