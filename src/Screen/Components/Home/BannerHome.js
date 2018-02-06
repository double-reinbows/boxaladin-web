import React from 'react';

import banner1 from '../../../asset/LandingPage/banner/001.jpeg'
import banner2 from '../../../asset/LandingPage/banner/002.jpeg'

export default  class BannerHome extends React.Component {

  render() {
    return (
      <div>
        <div className="row Bar-First">
          <div className="col-sm-6 Bar-First__col1">
            <img src={banner1} className="img-fluid Bar-First__banner" alt="banner1" />
          </div>
          <div className="col-sm-6 Bar-First__col2">
            <img src={banner2} className="Bar-First__banner" alt="banner1" />
            <div className="Bar-First__label">
              <label className="Bar-First__label__TextTop">THE MORE YOU SEE IT,</label>
              <label className="Bar-First__label__TextBottom">THE CHEAPER IT GETS ...</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
