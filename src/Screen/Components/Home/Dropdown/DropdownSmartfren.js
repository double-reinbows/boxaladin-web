import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LogoSmart from '../../../../asset/LandingPage/pulsa/Smart.svg'


export default class Example extends React.Component {
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
        <DropdownToggle caret className="dropz">
          <img src={LogoSmart} className="dropz__img" alt="Logo Smart" />
        </DropdownToggle>
        <DropdownMenu className="dropz__item">
          <DropdownItem className="dropz__item">100</DropdownItem>
          <DropdownItem className="dropz__item">50</DropdownItem>
          <DropdownItem className="dropz__item">25</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
