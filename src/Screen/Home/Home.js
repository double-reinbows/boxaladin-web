//@flow
import React, {Component} from 'react'
import MediaQuery from 'react-responsive';

import HomeContent from './HomeContent'
import BannerHome from './BannerHome'
import MobileHome from '../Mobile/Home/MobileHome'

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

export default Home;
