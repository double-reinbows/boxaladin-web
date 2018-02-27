import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import axios from 'axios'
import Coin from '../../src/asset/Game/coin.svg'
import { getUser } from '../actions/userAction'
import { getUserRewards } from '../actions/rewardAction'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			si1: null,
			si2: null,
			si3: null,

			slot1: 0,
			slot2: 0,
			slot3: 0,

			speed1: 100,
			speed2: 100,
			speed3: 100,

			itemsdummy1: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],
			itemsdummy2: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],
			itemsdummy3: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],

			isRunning: false,
			modal: false
		}

		this.toggle = this.toggle.bind(this)
	}

	render() {
		console.log('State:', this.state)
		console.log('Props:', this.props)

		return (
			<div className="game">
				<div className="game__container">
					<div className="game__slotLabel">
						<h1 className="game__slotLabel__h1">GAMES</h1>
						<p className="game__slotLabel__paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
					</div>
					<div className="game__container2">
						<div className="game__slotItems">
							<div className="game__slotItems__box">
									<div className="game__slotItems__items">
										<div className={this.state.itemsdummy1[this.state.slot1]} />
									</div>
										<div className={this.state.itemsdummy1[this.state.slot2]} />
										<div className={this.state.itemsdummy1[this.state.slot3]} />
							</div>
						</div>
					</div>
					<div className="game__slotCoin">
								<img className="game__slotCoin__icon" src={Coin} alt="coin image"/>
								<label className="game__slotCoin__label">Your Coin : {this.props.userInfo.coin}</label>
					</div>
					<div className="game__slotButton">
						<div className="game__slotButton__container3">
							<button disabled={this.state.isRunning} className="game__slotButton__start" onClick={ () => this.start() }>START</button>
												<div>
							<button disabled={!this.state.isRunning} className="game__slotButton__start" onClick={ () => this.stop() }>STOP</button>
						</div>
						<div>
							<button disabled={this.state.isRunning} className="game__slotButton__start" onClick={ () => this.reset() }>RESET</button>
						</div>

						</div>

					</div>

				</div>
			</div>
		)
	}

	componentDidMount() {
		this.props.getUser()
	}

	submitResult(slot1, slot2, slot3) {
		if (slot1 !== 6 && slot2 !== 6 && slot3 !== 6) {
			alert('Maaf Anda kurang beruntung.')
			console.log('Maaf Anda kurang beruntung.')
		} else {

			const slots = [ slot1, slot2, slot3 ]
			const stars = slots.filter(data => data === 6)

			console.log('Total bintang: ', stars.length)

			axios({
				method: 'POST',
				url: `http://localhost:3000/win`,
				headers: { token: localStorage.getItem('token') },
				data: {
					star: stars.length
				}
			})
			.then(({data}) => {
				this.props.getUserRewards()		
				console.log(data)
				alert('Selamat! kamu dapat ' + data.reward.rewardName + '.')
				this.props.history.push(`/reward/${data.id}`)
			})
			.catch(err => console.log(err))

		}
	}

	toggle() {
		this.setState({ modal: !this.state.modal })
	}

	handleBingo() {
		if (this.state.slot3 === this.state.itemsdummy3.length - 1 && (this.state.slot1 === this.state.slot2 && this.state.slot2 === this.state.slot3) ) {
			this.setState({ slot3: this.state.slot3 - (this.state.itemsdummy3.length - 1) })
		}
	}

	start() {
		if (this.props.userInfo.coin <= 0) {
		
			alert('Maaf Anda tidak punya coin untuk bermain game.')
		
		} else {

			axios({
				method: 'PUT',
				url: `http://localhost:3000/users/coin`,
				headers: {
					token: localStorage.getItem('token')
				},
				data: {
					coin: this.props.userInfo.coin
				}
			})
			.then(({data}) => {
				console.log(data)
				this.props.getUser()
		})
			.catch(err => {
				console.log(err)
			})

			this.start1()
			this.start2()
			this.start3()

			this.setState({ isRunning: true })

		}
	}

	stop() {
		this.stop1()
		this.stop2()
		this.stop3()

		this.handleBingo()
		this.submitResult(this.state.slot1, this.state.slot2, this.state.slot3)

		this.setState({
			si1: null,
			si2: null,
			si3: null,
			isRunning: false
		})

		this.toggle()
	}

	reset() {
		this.setState({
			slot1: 0,
			slot2: 0,
			slot3: 0
		})
	}

	start1() {
		console.log('START-1...')

		var _this = this
		var i = 1

		this.state.si1 = setInterval(function() {

			_this.setState({ slot1: i })

			if (i < _this.state.itemsdummy1.length-1) {
				i++
			} else {
				i=0
			}

  	}, this.state.speed1)

	}

	stop1() {
		console.log('STOP-1...')
		clearInterval(this.state.si1)
	}

	start2() {
		console.log('START-2...')

		var _this = this
		var i = 1

		this.state.si2 = setInterval(function() {

			_this.setState({ slot2: i })

			if (i < _this.state.itemsdummy2.length-1) {
				i++
			} else {
				i=0
			}

  	}, this.state.speed2)

	}

	stop2() {
		console.log('STOP-2...')
		clearInterval(this.state.si2)
	}

	start3() {
		console.log('START-3...')

		var _this = this
		var i = 1

		this.state.si3 = setInterval(function() {

			_this.setState({ slot3: i })

			if (i < _this.state.itemsdummy3.length-1) {
				i++
			} else {
				i=0
			}

  	}, this.state.speed3)

	}

	stop3() {
		console.log('STOP-3...')
		clearInterval(this.state.si3)
	}




}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo,
		userRewards: state.rewardReducer.userRewards,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: () => dispatch(getUser()),
		getUserRewards: () => dispatch(getUserRewards())
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Game)

export default connectComponent
