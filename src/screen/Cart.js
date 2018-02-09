import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Table,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,
  Col
} from 'reactstrap'

import { getPhoneNumbers } from '../actions/'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log('Props:', this.props);
    console.log('State:', this.state);
    
    return (
      <div>
        <Container>
          <h1>Cart</h1>
          {this.showCart()}
        </Container>
      </div>
    )
  }

  componentDidMount() {
    this.props.getPhoneNumbers()
  }

  showCart() {
    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Barang</th>
            <th>Tujuan</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((product, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                {/* <td>{product.productName}</td> */}
                <td>
                  <Col xs="3">
                    <Card>
                      <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>{product.productName}</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title.</CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </td>
                <td>No. HP Tujuan</td>
                <td>{product.aladinPrice}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    cart: state.productReducer.cart,
    phoneNumbers: state.userReducer.phoneNumbers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhoneNumbers: () => dispatch(getPhoneNumbers())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default connectComponent