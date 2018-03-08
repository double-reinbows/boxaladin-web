import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Table, Button, Row, Col, Card, CardImg, CardText, CardBody, CardLink, CardTitle, CardSubtitle } from 'reactstrap'
import moment from 'moment'

import { getRewards } from '../actions/rewardAction'
import { getUser } from '../actions/userAction'
import { getUserClaims } from '../actions/claimAction'

class ClaimReward extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    console.log('State:', this.state)
    console.log('Props:', this.props)

    return (
      <div className="container">
        <Row>
          {this.props.rewards.map((data, i) => {
            return (
              <Col xs="3" key={i}>
                <Card>
                  <CardBody>
                    <CardTitle>{data.rewardName}</CardTitle>
                    <CardSubtitle>{data.rewardName}</CardSubtitle>
                  </CardBody>
                  <img width="100%" src={data.image} alt="Card image cap" />
                  <CardBody>
                    <CardText>{data.description}.</CardText>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <CardText>{data.aladinKey} Aladin Key</CardText>    
                    <Button onClick={() => this.claim(data)} size="lg" color="success">TUKAR | {data.aladinKey}</Button>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Row>

        <br />
        <h1>Your Claim</h1>

        <Table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Item</th>
              <th>Deskripsi</th>
              <th>Tanggal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userClaims.map((data, idx) => {
              return (
                <tr key={idx}>
                  <th scope="row">{idx+1}</th>
                  <td>{data.reward.rewardName}</td>
                  <td>{data.reward.description}</td>
                  <td>{moment(data.createdAt, moment.ISO_8601).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>{data.status}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>

      </div>
    )
  }

  componentDidMount() {
    this.props.getRewards()
    this.props.getUser()
    this.props.getUserClaims()
  }

  claim(reward) {
    if (this.props.userInfo.aladinKeys < reward.aladinKey) {

      alert('Maaf, Aladin Key Anda tidak cukup.')
      
    } else {

      axios({
        method: 'POST',
        url: `http://localhost:3000/claim`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          rewardId: reward.id
        }
      })
      .then(response => {

        this.props.getUser()
        this.props.getUserClaims()
        alert('Claim on progress')
        console.log(response)
        
      })
      .catch(err => console.log(err))

    }
  }

}

const mapStateToProps = (state) => {
  return {
    rewards: state.rewardReducer.rewards,
    userInfo: state.userReducer.userInfo,
    userClaims: state.claimReducer.userClaims,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRewards: () => dispatch(getRewards()),
    getUser: () => dispatch(getUser()),
    getUserClaims: () => dispatch(getUserClaims()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ClaimReward)

export default connectComponent