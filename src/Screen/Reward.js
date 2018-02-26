import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Table,
  Button
} from 'reactstrap'

import { getUserRewards } from '../actions/rewardAction'

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
          {this.showReward()}
        </Container>
      </div>
    )
  }

  componentDidMount() {
    this.props.getUserRewards()
  }

  showReward() {
    return (
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Hadiah</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.userRewards.map((data, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx+1}</th>
                <td>{data.reward.rewardName}</td>
                <td>{data.status}</td>
                <td>{data.status === 'PENDING' ? (
                  <Button color="success" onClick={() => this.showMetodeClaim(data.id)}>Claim</Button>
                ) : null}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  showMetodeClaim(id) {
    this.props.history.push(`/reward/${id}`)
  }

}

const mapStateToProps = (state) => {
  return {
    userRewards: state.rewardReducer.userRewards,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserRewards: () => dispatch(getUserRewards())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Reward)

export default connectComponent
