import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import MediaQuery from 'react-responsive'

class MobileLegend extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      openModal: false
    }
  }

  renderMobileLegend = () => {
    const { priceData } = this.props
    return priceData.filter(dataFilter => {
      return dataFilter.id !== 2 && dataFilter.id !== 3
    })
    .map((price, index) => {
      return (
        <Fragment>
          <MediaQuery query="(min-device-width: 721px)">
            <button key={index} onClick={() => this.props.onClick(price.id, price.displayPrice, 'buy game')} className="homecontent__bottom__pulsa__button baBackground">{price.displayPrice.toLocaleString(['ban', 'id'])}</button>
          </MediaQuery>
          <MediaQuery query="(max-device-width: 721px)">
            <button key={index} onClick={() => this.props.onClick(price.id, price.displayPrice, 'buy game')} className="mobile__pulsa__button baBackground">{price.displayPrice.toLocaleString(['ban', 'id'])}</button>
          </MediaQuery>
        </Fragment>
        )
      })
    
  }

  render() {
    return (
      <div className="homecontent__game__buttonGame">
        {this.renderMobileLegend()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    priceData: state.priceReducer.priceData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(MobileLegend)

export default connectComponent
