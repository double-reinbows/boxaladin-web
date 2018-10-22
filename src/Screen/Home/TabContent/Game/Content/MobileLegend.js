import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import MediaQuery from 'react-responsive'
import { Collapse } from 'reactstrap';

class MobileLegend extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      openModal: false
    }
  }

  renderMobileLegend = () => {
    const { priceData } = this.props
    return (
      <Fragment>
        <Collapse isOpen={this.props.isOpen}>
        <h2 style={{textAlign: 'center', marginTop:'2%'}}>Voucher Mobile Legend</h2>
        <div className="homecontent__game__buttonGame">
        {priceData.filter(dataFilter => {
          return dataFilter.id !== 2 && dataFilter.id !== 3
        })
        .map((price, index) => {
          return (
          <Fragment>
            <button key={index} onClick={() => this.props.onClick(price.id, price.displayPrice, 'buy game')} className="homecontent__bottom__pulsa__button baBackground">{price.displayPrice.toLocaleString(['ban', 'id'])}</button>
          </Fragment>
            )
          })
        }
        </div>
        </Collapse>
      </Fragment>
    )
  }

  renderMobileMobileLegend = () => {
    const { priceData } = this.props
    return (
      <Fragment>
        <Collapse isOpen={this.props.isOpen}>
        <h2 style={{textAlign: 'center', marginTop:'2%'}}>Voucher Mobile Legend</h2>
        <div className="mobile__pulsa__content1">
        {priceData.filter(dataFilter => {
          return dataFilter.id !== 2 && dataFilter.id !== 3
        })
        .map((price, index) => {
          return (
          <Fragment>
            <button key={index} onClick={() => this.props.onClick(price.id, price.displayPrice, 'buy game')} className="mobile__pulsa__button baBackground">{price.displayPrice.toLocaleString(['ban', 'id'])}</button>
          </Fragment>
            )
          })
        }
        </div>
        </Collapse>
      </Fragment>
    )
  }

  render() {
    console.log ('this.props', this.props)
    return (
      <Fragment>
        <MediaQuery query="(max-device-width: 721px)">
          {this.renderMobileMobileLegend()}
        </MediaQuery>
        <MediaQuery query="(min-device-width: 721px)">
          {this.renderMobileLegend()}
        </MediaQuery>
      </Fragment>
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