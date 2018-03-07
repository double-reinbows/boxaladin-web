import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Table,
  Button
} from 'reactstrap'

import { getUserWins } from '../actions/winAction'

class Reward extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log('Props:', this.props)
    console.log('State:', this.state)
    return (
      <div>
        <Container>
          <h1>Reward</h1>
          {this.showWin()}
        </Container>
      </div>
    )
  }

  componentDidMount() {
    this.props.getUserWins()
  }

  showWin() {
    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Star</th>
            <th>Free Key</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {this.props.userWins.map((data, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{data.freekey.star}</td>
                <td>{data.freekey.amount}</td>
                <td>{data.createdAt}</td>
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
    userWins: state.winReducer.userWins,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserWins: () => dispatch(getUserWins())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Reward)

export default connectComponent
