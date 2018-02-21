import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux'

import LogoSmart from '../../../../asset/LandingPage/pulsa/Smart.svg'
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

          <div className="dropz__big">
            <img src={LogoSmart} className="dropz__img" alt="Logo Smart" />
          </div>
          <div className="dropz__small">
            <img src={expand} className="dropz__icon" alt="Logo expand" />
          </div>

        </DropdownToggle>

        <DropdownMenu className="dropz__item">

          {this.props.products.filter(data => {
            return data.brand === 'Smartfren' && data.category === 'Pulsa'
          })
          .map((data, i) => {
            return (
              <DropdownItem key={i} value={data.id} className="dropz__item" onClick={(e) => this.props.selectProductID(e.target.value)}>{data.price}</DropdownItem>
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
