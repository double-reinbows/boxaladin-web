import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux'

import LogoTelkomsel from '../../../../asset/LandingPage/pulsa/Telkomsel.svg'
import { getProducts } from '../../../../actions/productAction'

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
    console.log('Props:', this.props);
    console.log('State:', this.state);
    
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret className="dropz">
        <img src={LogoTelkomsel} className="dropz__img" alt="Logo Telkomsel" />
        </DropdownToggle>
        <DropdownMenu className="dropz__item">

          {this.props.products.filter(data => {
            return data.brand === 'Telkomsel' && data.category === 'Pulsa'
          })
          .map((data, i) => {
            return (
              <DropdownItem key={i} className="dropz__item">{data.productName}</DropdownItem>
            )
          })}
          
        </DropdownMenu>
      </Dropdown>
    );
  }

  componentDidMount() {
    this.props.getProducts()
  }

}

const mapStateToProps = (state) => {
  return {
    products: state.productReducer.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Example)

export default connectComponent