import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader } from 'reactstrap'
import axios from 'axios'

import Coin from '../../src/asset/Game/coin.svg'
import Star from '../../src/asset/Game/star.svg'

import win1 from '../../src/asset/Game/win/100rb.png'
import win2 from '../../src/asset/Game/win/50rb1.png'
import win3 from '../../src/asset/Game/win/50rb2.png'
import win4 from '../../src/asset/Game/win/25rb1.png'
import win5 from '../../src/asset/Game/win/25rb2.png'

import WinSfx from '../../src/asset/sound/Win-sfx.mp3'
import LoseSfx from '../../src/asset/sound/Lose-sfx.mp3'


import { getUser } from '../actions/userAction'
import { getUserWins } from '../actions/winAction'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			si1: null,
			si2: null,
			si3: null,

			slot1_atas: 5,
			slot2_atas: 5,
			slot3_atas: 5,

			slot1: 6,
			slot2: 6,
			slot3: 6,

			slot1_bawah: 0,
			slot2_bawah: 0,
			slot3_bawah: 0,

			speed1: 30,
			speed2: 20,
			speed3: 15,

			itemsdummy1: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],
			itemsdummy2: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],
			itemsdummy3: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],

			isRunning: false,
			modalWin: false,
			modalLose: false,
			key: null,
			pulsaAmount: 0,
			notif: '',
			winResult: null,
			gameCount: 1,
			mustWin: false
		}

		this.toggle = this.toggle.bind(this)
	}

	render() {

		return (
			<div className="game">
				<div className="game__container">
					<div className="game__slotLabel">
						<h1 className="game__slotLabel__h1">ALADIN GAME</h1>
						<p className="game__slotLabel__paragraph">Mainkan Game Menggunakan Coin Anda</p>
					</div>
					<div>
						<div className="game__container2">
							<div className="game__convert">
								<div>
									<label className="game__convert__label">Aladin Key : {this.props.userInfo.aladinKeys}</label>
								</div>
								<div>
									<p className="game__slotLabel__paragraph">Tukar Aladin Key Menjadi Koin</p>
									<form onSubmit={(e) => this.upCoin(e)}>
										<input className="game__convert__input" min="1" id="upcoin" onChange={(e) => this.setState({ key: parseInt(e.target.value, 10) })} type="number" placeholder="1 aladin key = 5 coin" />
										<button className="game__convert__buttonConvert">TUKAR</button>
									</form>
								</div>
							</div>
						</div>
						<label className="alert__game">{this.state.notif}</label>
							<div className="game__slotCoin">
								<img className="game__slotCoin__icon" src={Coin} alt="coin"/>
								<label className="game__slotCoin__label">Koin Anda : {this.props.userInfo.coin}</label>
							</div>
						<div className="game__container3">
							<div className="game__slotItems">
								<div className="game__slotItems__boxContainer">
									<div className="game__slotItems__boxContainer__box">
										<div className={this.state.itemsdummy1[this.state.slot1_atas]} />
										<div className={this.state.itemsdummy1[this.state.slot2_atas]} />
										<div className={this.state.itemsdummy1[this.state.slot3_atas]} />
									</div>
									<div className="game__slotItems__boxContainer__box">
										<div className={this.state.itemsdummy1[this.state.slot1]} />
										<div className={this.state.itemsdummy1[this.state.slot2]} />
										<div className={this.state.itemsdummy1[this.state.slot3]} />
									</div>
									<div className="game__slotItems__boxContainer__box">
										<div className={this.state.itemsdummy1[this.state.slot1_bawah]} />
										<div className={this.state.itemsdummy1[this.state.slot2_bawah]} />
										<div className={this.state.itemsdummy1[this.state.slot3_bawah]} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="game__slotButton">
						<div className="game__slotButton__container3">
							<button disabled={this.state.isRunning} className="game__slotButton__start" onClick={ () => this.start() }>START</button>
						<div>
							<button disabled={!this.state.isRunning} className="game__slotButton__start" onClick={ () => this.stop() }>STOP</button>
						</div>
						{/* <div>
							<button disabled={this.state.isRunning} className="game__slotButton__start" onClick={ () => this.reset() }>RESET</button>
						</div> */}
						</div>
					</div>

				</div>

				<div className="game__prize">
					<h1 className="game__prize__title">Game Prize</h1>

					<h1 className="game__prize__h1">
						Dapatkan hadiah pulsa Rp. 10.000 dengan memainkan Aladin Games
					</h1>

					<div className="game__prize__row">
						<div className="game__prize__container">
							<img className="game__prize__img" src={win1} alt="coin" />
							<h1 className="game__prize__h1">
								pulsa Rp. 10.000
							</h1>
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src={win2} alt="coin" />
							<h1 className="game__prize__h1">
								pulsa Rp. 10.000
							</h1>
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src={win3} alt="coin" />
							<h1 className="game__prize__h1">
								pulsa Rp. 10.000
							</h1>
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src={win4} alt="coin" />
							<h1 className="game__prize__h1">
								pulsa Rp. 10.000
							</h1>
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src={win5} alt="coin" />
							<h1 className="game__prize__h1">
								pulsa Rp. 10.000
							</h1>
						</div>
					</div>

				</div>

					<Modal isOpen={this.state.modalWin} className="gameModal">
						<ModalHeader toggle={this.toggle} className="gameModal__Top"></ModalHeader>
							<div className="gameModal__Container">

								<div className="gameModal__Container__item">
									<img className="gameModal__icon" src={Star} alt="Star" />
								</div>

								<label className="gameModal__Container__text">
									selamat
								</label>

								<label className="gameModal__Container__text">
									anda mendapatkan hadiah
								</label>

								<label className="gameModal__Container__text">
									berupa Rp.{this.state.pulsaAmount.toLocaleString(['ban', 'id'])} pulsa gratis
								</label>
							</div>
					</Modal>

				{ this.state.modalLose ? <audio src={LoseSfx} autoPlay /> : null }
				{ this.state.modalWin ? <audio src={WinSfx} autoPlay /> : null }
			</div>
		)
	}

	componentDidMount() {
		this.props.getUser()
		this.getGameCount()
	}
	//

	async getGameCount() {
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/lose`
		})
		.then( async ({data}) => {
			await this.setState({gameCount: data[0].count})
		})
		.catch(err => console.log(err))
	}

	// increaseGameCount() {
	// 	axios({
	// 		method: 'GET',
	// 		url: `${process.env.REACT_APP_API_HOST}/lose/increase`
	// 	})
	// 	.then(({data}) => {
	// 		this.getGameCount()
			// return console.log(data)
	// 	})
		// .catch(err => console.log(err))
	// }

	upCoin(e) {
		e.preventDefault()

		if (this.state.key <= 0) {
			return this.setState({
        notif: "Harus Lebih Besar Dari 0",
      })
		} else if (this.state.key === null || this.state.key === '') {
			return this.setState({
				notif: "Tidak Boleh Kosong",
			})
		}	else {
			this.setState({
				notif:""
			})
		}

		// CEK SISA ALADIN KEY LANGSUNG DARI API
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/users/info`,
			headers: {
				token: localStorage.getItem('token')
			}
		})
		.then(({data}) => {
			if (this.state.key > data.aladinKeys) {
				return this.setState({
					notif: "Aladin Key Tidak Cukup",
				})
			} else {

				// REQUEST UPDATE ALADIN KEY DAN COIN KE API
				axios({
					method: 'PUT',
					url: `${process.env.REACT_APP_API_HOST}/users/upcoin`,
					data: {
						key: this.state.key
					},
					headers: {
						token: localStorage.getItem('token')
					}
				})
				.then(response => {

					this.setState({
						coin: 0,
						key: null
					})

					document.getElementById('upcoin').value = ''
					this.props.getUser()
					return console.log(response.data)

				})
				.catch(err => console.log(err))

			}
		})
		.catch(err => console.log(err))

		// if (this.state.key > this.props.userInfo.aladinKeys) {
		// 	return this.setState({
    //     notif: "Aladin Key Tidak Cukup",
    //   })
		// }

	}

	submitResult(result) {
		if (result === 0) {
			// this.reset()
			this.setState({
				modalLose: true,
			})
			return
		} else {

			console.log('Anda menang dengan star =', result)

			// const slots = [ slot1, slot2, slot3 ]
			// const stars = slots.filter(data => data === 6)

			// console.log('starts:', stars)
			// console.log('Total bintang: ', stars.length)

			axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_HOST}/win`,
				headers: { token: localStorage.getItem('token') },
				data: {
					star: result
				}
			})
			.then(({data}) => {
				this.setState({
					pulsaAmount: data.data.gamerule.pulsaAmount,
					winResult: data.data,
					modalWin:true,
				})

				this.props.getUser()
				this.props.getUserWins()
				
			})
			.catch(err => console.log(err))

		}
	}

	toggle() {
		this.setState({
			pulsaAmount: 0,
			modalWin: false,
		})
		this.reset()

		this.props.history.push('/claimfreepulsa', this.state.winResult)
	}

	handleResult() {
		switch (this.state.slot1.toString() + this.state.slot2.toString() + this.state.slot3.toString()) {
			case '666':
				return 5

			case '000':
				return 4

			case '555':
				return 3

			case '560':
				return 2

			case '065':
				return 1

			default:
				return 0
		}
	}

	handleBingo() {
		// if (this.state.slot3 === this.state.itemsdummy3.length - 1 && (this.state.slot1 === this.state.slot2 && this.state.slot2 === this.state.slot3) ) {
		// 	this.setState({ slot3: this.state.slot3 - (this.state.itemsdummy3.length - 1) })
		// }

		switch (this.handleResult()) {
			case 5:
				return this.setState({
					slot3_atas: 6,
					slot3: 0,
					slot3_bawah: 1
				})

			case 4:
				return this.setState({
					slot3_atas: 0,
					slot3: 1,
					slot3_bawah: 2
				})

			case 3:
				return this.setState({
					slot3_atas: 5,
					slot3: 6,
					slot3_bawah: 0
				})

			case 2:
				return this.setState({
					slot3_atas: 0,
					slot3: 1,
					slot3_bawah: 2
				})

			case 1:
				return this.setState({
					slot3_atas: 5,
					slot3: 6,
					slot3_bawah: 0
				})

			default:
				return null
		}
	}

	async start() {
		// this.increaseGameCount()
		this.getGameCount()

		if (((this.state.gameCount) >= 25) && ((this.state.gameCount) % 25 === 0)) {
			await this.setState({mustWin: true})
		}

		if (this.props.userInfo.coin <= 0) {
			this.setState({
				notif: "Maaf Anda tidak punya coin untuk bermain game."
      })

		} else {

			axios({
				method: 'PUT',
				url: `${process.env.REACT_APP_API_HOST}/users/coin`,
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

			this.setState({
				isRunning: true,
				notif: '',
				modalLose: false
			})

		}
	}

	async stop() {
		this.stop1()
		this.stop2()
		this.stop3()

		await this.handleBingo()

    // HANDLE PEMAIN KE 21 OTOMATIS WIN
		if (this.state.mustWin === true) {

			await this.setState({
				slot1_atas: 6,
				slot2_atas: 5,
				slot3_atas: 4,

				slot1: 0,
				slot2: 6,
				slot3: 5,

				slot1_bawah: 1,
				slot2_bawah: 0,
				slot3_bawah: 6,
			})
		}

		this.getGameCount()

		this.submitResult(this.handleResult())

		this.setState({
			si1: null,
			si2: null,
			si3: null,
			isRunning: false,
			mustWin: false
		})

		// this.toggle()
	}

	reset() {
		this.setState({
			slot1: 6,
			slot2: 6,
			slot3: 6,

			slot1_atas: 5,
			slot2_atas: 5,
			slot3_atas: 5,

			slot1_bawah: 0,
			slot2_bawah: 0,
			slot3_bawah: 0
		})
	}

	start1() {


		var _this = this
		var i = 0

		this.setState.si1 = setInterval(function() {

			_this.setState({
				slot1: i,
				slot1_atas: i === 0 ? _this.state.itemsdummy1.length-1 : i-1,
				slot1_bawah: i === _this.state.itemsdummy1.length-1 ? 0 : i+1
			})

			if (i < _this.state.itemsdummy1.length-1) {
				i++
			} else {
				i=0
			}

  	}, this.state.speed1)

	}

	stop1() {

		clearInterval(this.setState.si1)
	}

	start2() {


		var _this = this
		var i = 0

		this.setState.si2 = setInterval(function() {

			_this.setState({
				slot2: i,
				slot2_atas: i === 0 ? _this.state.itemsdummy2.length-1 : i-1,
				slot2_bawah: i === _this.state.itemsdummy1.length-1 ? 0 : i+1
			})

			if (i < _this.state.itemsdummy2.length-1) {
				i++
			} else {
				i=0
			}

  	}, this.state.speed2)

	}

	stop2() {

		clearInterval(this.setState.si2)
	}

	start3() {


		var _this = this
		var i = 0

		this.setState.si3 = setInterval(function() {

			_this.setState({
				slot3: i,
				slot3_atas: i === 0 ? _this.state.itemsdummy1.length-1 : i-1,
				slot3_bawah: i === _this.state.itemsdummy1.length-1 ? 0 : i+1
			})

			if (i < _this.state.itemsdummy3.length-1) {
				i++
			} else {
				i=0
			}

  	}, this.state.speed3)

	}

	stop3() {

		clearInterval(this.setState.si3)
	}




}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo,
		userWins: state.winReducer.userWins,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: () => dispatch(getUser()),
		getUserWins: () => dispatch(getUserWins())
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Game)

export default connectComponent
