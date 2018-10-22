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

  mergeDiamond = () => {
    const { priceData } = this.props
    const diamond = [
      {id:5, diamond: 19 },
      {id:1, diamond: 36 },
      {id:6, diamond: 74 },
      {id:4, diamond: 366 }
    ]
    const mergeArray = (source, merge, by) => source.map(item => ({
      ...item,
      ...(merge.find(i => i[by] === item[by]) || {}),
    }));
    return (mergeArray(priceData, diamond, 'id'));
  }

  renderMobileLegend = () => {
    const data = this.mergeDiamond()
    return (
      <Fragment>
        <Collapse isOpen={this.props.isOpen}>
        <h2 style={{textAlign: 'center', marginTop:'2%'}}>Voucher Mobile Legend</h2>
        <div className="homecontent__game__buttonGame">
        {data.filter(dataFilter => {
          return dataFilter.id === 1 || dataFilter.id === 4 || dataFilter.id === 5 || dataFilter.id === 6
        })
        .map((price, index) => {
          return (
          <div key={index} className="homecontent__game__ml__container">
            <button onClick={() => this.props.onClick(price.id, price.displayPrice, 'buy game', price.diamond)} className="homecontent__bottom__pulsa__button baBackground">{price.displayPrice.toLocaleString(['ban', 'id'])}</button>
            <label className="homecontent__game__label">Mobile Legend {price.diamond}<img className="homecontent__game__ml__diamond" src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Voucher+Game/Diamon-Mobile-legend.png" alt="diamond"/></label>
          </div>
            )
          })
        }
        </div>
        </Collapse>
      </Fragment>
    )
  }

  renderMobileMobileLegend = () => {
    const data = this.mergeDiamond()
    return (
      <Fragment>
        <Collapse isOpen={this.props.isOpen}>
        <h2 style={{textAlign: 'center', marginTop:'2%'}}>Voucher Mobile Legend</h2>
        <div className="mobile__game__container">
        {data.filter(dataFilter => {
          return dataFilter.id === 5 || dataFilter.id === 1
        })
        .map((price, index) => {
          return (
          <div key={index} className="mobile__game__content">
            <button onClick={() => this.props.onClick(price.id, price.displayPrice, 'buy game', price.diamond)} className="mobile__pulsa__button baBackground">{price.displayPrice.toLocaleString(['ban', 'id'])}</button>
            <label className="mobile__game__label">Mobile Legend {price.diamond}<img className="homecontent__game__ml__diamond" src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Voucher+Game/Diamon-Mobile-legend.png" alt="diamond"/></label>
          </div>
            )
          })
        }
        </div>
        <div className="mobile__game__container">
        {data.filter(dataFilter => {
          return dataFilter.id === 6 || dataFilter.id === 4
        })
        .map((price, index) => {
          return (
          <div key={index} className="mobile__game__content">
            <button onClick={() => this.props.onClick(price.id, price.displayPrice, 'buy game', price.diamond)} className="mobile__pulsa__button baBackground">{price.displayPrice.toLocaleString(['ban', 'id'])}</button>
            <label className="mobile__game__label">Mobile Legend {price.diamond}<img className="homecontent__game__ml__diamond" src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Voucher+Game/Diamon-Mobile-legend.png" alt="diamond"/></label>
          </div>
            )
          })
        }
        </div>
        </Collapse>
      </Fragment>
    )
  }

  render() {
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