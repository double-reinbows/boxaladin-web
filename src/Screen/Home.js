import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginAction} from '../actions/'
import { getProducts } from '../actions/productAction'

import Carousel from './Components/Home/Carousel'
// import BannerText1 from './Components/Home/BannerText1'
import BannerText2 from './Components/Home/BannerText2'
import FAQ from './Components/Home/Faq'
import TabsHome from './Components/Home/TabsHome'
import Footer from './Components/Footer/Footer'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    
    return (
      <div>
            <Carousel />
        <TabsHome />
        <BannerText2 />
        <FAQ />
        <Footer/>
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
