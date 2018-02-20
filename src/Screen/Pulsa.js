import React from 'react'
import { connect } from 'react-redux'
import {
	FormGroup, Input, Button
} from 'reactstrap'

import { getPhoneNumbers } from '../actions/'
import { getProducts } from '../actions/productAction'
import { getBrands } from '../actions/brandAction'
import { getCategories } from '../actions/categoryAction'

class Pulsa extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			number: '',
			brand: '',
			nominal: 0
    }
  }

  render() {
    console.log('Pulsa Props:', this.props);
    console.log('Pulsa State:', this.state);

    return (
      <div className="container">
        <h1>PULSA</h1>

					<FormGroup>
						<Input onChange={(e) => this.handleNumber(e.target.value)} type="text" placeholder="Contoh: 082100001111" />
					</FormGroup>

					<h1>{this.state.brand}</h1>

					<div>
						<Button onClick={() => this.setState({nominal: 50000})} type="button" style={{ width: "150px", padding: "20px", marginRight: "10px" }}>50.000</Button>
						<Button onClick={() => this.setState({nominal: 100000})} type="button" style={{ width: "150px", padding: "20px", marginRight: "10px" }}>100.000</Button>
					</div>

					<FormGroup style={{ marginTop: "10px" }}>
						<Button type="button" color="primary">Lihat Harga</Button>
					</FormGroup>
      </div>
    )
  }

  componentDidMount() {
		this.props.getPhoneNumbers()
		this.props.getProducts()
		this.props.getBrands()
    this.props.getCategories()
  }

	handleNumber(number) {
		this.setState({number: number})
		let prefix = number.charAt(0) + number.charAt(1) + number.charAt(2) + number.charAt(3)

		if (prefix === '0821' || prefix === '0812' || prefix === '0852' || prefix === '0853') {
			this.setState({brand: 'Telkomsel'})
		} else if (prefix === '') {
			this.setState({brand: ''})
		} else {
			this.setState({brand: 'Other'})
		}
	}

}

const mapStateToProps = (state) => {
  return {
		phoneNumbers: state.userReducer.phoneNumbers,
		products: state.productReducer.products,
		brands: state.brandReducer.brands,
		categories: state.categoryReducer.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		getPhoneNumbers: () => dispatch(getPhoneNumbers()),
		getProducts: () => dispatch(getProducts()),
		getBrands: () => dispatch(getBrands()),
		getCategories: () => dispatch(getCategories()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Pulsa)

export default connectComponent
