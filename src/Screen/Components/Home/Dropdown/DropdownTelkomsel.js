import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
          Telkomsel
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
