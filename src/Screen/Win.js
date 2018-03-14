import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Table,
  Button
} from 'reactstrap'
import moment from 'moment'

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
      <div className="invoice">
        <div className="invoice__container">
          <h1 className="invoice__text">Reward</h1>
          {this.showWin()}
        </div>
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
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {this.props.userWins.map((data, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{data.freekey.star}</td>
                <td>{data.freekey.amount}</td>
                <td>{moment(data.createdAt, moment.ISO_8601).format('MMMM Do YYYY, h:mm:ss a')}</td>
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
