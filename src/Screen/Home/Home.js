//@flow
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginAction} from '../../actions/'
import { getProducts } from '../../actions/productAction'

import HomeContent from './HomeContent'
import BannerHome from './BannerHome'
import MediaQuery from 'react-responsive';

type Props = {
  getProducts: Function,
};
type State = {
};
class Home extends Component<Props, State> {

  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    return (
      <div>
        <MediaQuery query="(max-device-width: 720px)">
          <h1>Mobile app</h1>
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
    getProducts: () => dispatch(getProducts())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Home);

export default connectComponent;
