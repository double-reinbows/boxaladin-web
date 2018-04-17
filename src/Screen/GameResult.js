import React from 'react'
import { connect } from 'react-redux'
import {
  Table
} from 'reactstrap'
import moment from 'moment'

import { getUserWins } from '../actions/winAction'

class GameResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    
    return (
      <div className="invoice">
        <div className="invoice__container">
          <h1 className="invoice__text">Game Result</h1>
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
            {/* <th>Star</th> */}
            <th>Pulsa</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {this.props.userWins.map((data, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                {/* <td>{data.gamerule.star}</td> */}
                <td>{data.gamerule.pulsaAmount.toLocaleString(['ban', 'id'])}</td>
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

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(GameResult)

export default connectComponent
