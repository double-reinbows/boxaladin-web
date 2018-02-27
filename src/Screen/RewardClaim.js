import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Container, TabContent, TabPane, Nav, NavItem, NavLink,
  Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody
} from 'reactstrap';

// import { getUserRewards } from '../actions/rewardAction'

class RewardClaim extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reward: null
    }
  }

  render() {
    console.log('State: ', this.state)
    console.log('Props: ', this.props)

    var hadiah = this.props.userRewards.filter(data => data.id.toString() === this.props.match.params.id)[0]
    
    return (
      <Container>
        <h1>Cara claim { hadiah !== null && hadiah !== undefined ? hadiah.reward.rewardName : null }:</h1>
        <p>lorem ipsum</p>
        <p>lorem ipsum</p>
        <p>lorem ipsum</p>
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userRewards: state.rewardReducer.userRewards,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getUserRewards: () => dispatch(getUserRewards())
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(RewardClaim)

export default connectComponent