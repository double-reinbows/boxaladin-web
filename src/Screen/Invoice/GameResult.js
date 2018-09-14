import React from 'react'
import { connect } from 'react-redux'
import {
  Table
} from 'reactstrap'
import moment from 'moment'

import { getUserWins } from '../../actions/winAction'
import FormatRupiah from '../../utils/formatRupiah'

class GameResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
            <th>Pulsa</th>
            <th>Status</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {this.props.userWins.map((data, idx) => {
            const price = data.description.split(' ')
            const newPrice = FormatRupiah(price[1])
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>Pulsa {price[0]} {newPrice}</td>
                <td>{data.status}</td>
                <td>{moment(data.createdAt, moment.ISO_8601).format('MMMM Do YYYY, h:mm:ss a')}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  render() {
    console.log(this.props.userWins)
    return (
      <div className="invoice">
        <div className="invoice__container">
          <h1 className="invoice__text">Hasil Game</h1>
          {this.showWin()}
        </div>
      </div>
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
