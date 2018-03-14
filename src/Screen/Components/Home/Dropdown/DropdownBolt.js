import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux'

import LogoBolt from '../../../../asset/LandingPage/pulsa/Bolt.svg'
import expand from '../../../../asset/TabsHome/expandDrop.svg'

import { selectProductID } from '../../../../actions/productAction'

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>

        <DropdownToggle className="dropz">
        
          <div className="dropz__devide">
            <div className="dropz__big">
              <img src={LogoBolt} className="dropz__img" alt="Logo Smart" />
            </div>
            <div className="dropz__small">
              <img src={expand} className="dropz__icon" alt="Logo expand" />
            </div>
          </div>

        </DropdownToggle>

        <DropdownMenu className="dropz__item">

          {this.props.products.filter(data => {
            return data.brand === 'Bolt' && data.category === 'Paket Data'
          })
          .map((data, i) => {
            return (
              <DropdownItem key={i} value={data.id} className="dropz__item__inside" onClick={(e) => this.props.selectProductID(e.target.value)}>{data.productName}</DropdownItem>
            )
          })}

        </DropdownMenu>

      </Dropdown>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products,
    selectedProductID: state.productReducer.selectedProductID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProductID: (id) => dispatch(selectProductID(id))
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Example)

export default connectComponent
