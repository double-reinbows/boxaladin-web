import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginAction} from '../../actions/'
import { getProducts } from '../../actions/productAction'

import HomeContent from './HomeContent'
import BannerHome from './BannerHome'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <div>
        <HomeContent/>
        <BannerHome />
      </div>
    )
  }

  componentDidMount() {
    this.props.getProducts()
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Home)

export default connectComponent
