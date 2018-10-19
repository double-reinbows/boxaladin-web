import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
<<<<<<< HEAD
import MediaQuery from 'react-responsive'
=======
import { Collapse } from 'reactstrap';
>>>>>>> 69d66d18f231682552fe177d3d60cf0ffcebc90d

class MobileLegend extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      openModal: false
    }
  }

  renderMobileLegend = () => {
    const { priceData } = this.props
<<<<<<< HEAD
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
    
=======
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
            <button key={index} onClick={() => this.props.onClick(price.id, price.displayPrice, 'buy game')} className="homecontent__bottom__pulsa__button baBackground">{price.displayPrice.toLocaleString(['ban', 'id'])}</button>
            )
          })
        }
        </div>
        </Collapse>
      </Fragment>
    )
>>>>>>> 69d66d18f231682552fe177d3d60cf0ffcebc90d
  }

  render() {
    return (
      this.renderMobileLegend()
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