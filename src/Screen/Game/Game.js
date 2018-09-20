//@flow
import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import { getUser } from '../../actions/userAction';
import { getUserWins } from '../../actions/winAction';
import envChecker from '../../utils/envChecker'

type State = {
	si1: null | number,
	si2: null | number,
	si3: null | number,
	slot1_atas: number,
	slot2_atas: number,
	slot3_atas: number,
	slot1: number,
	slot2: number,
	slot3: number,
	slot1_bawah: number,
	slot2_bawah: number,
	slot3_bawah: number,
	speed1: number,
	speed2: number,
	speed3: number,
	itemsdummy1: Array<String>,
	itemsdummy2: Array<String>,
	itemsdummy3: Array<String>,
	// isRunning: false,
	modalWin: boolean,
	loseSfx: boolean,
	key: number,
	pulsaAmount: number,
	notif: string,
	winToken: null | string,
	// gameCount: 1,
	// mustWin: false,
	gameResult: null | Promise,
	// winType: null,
	startButton: null | JSX,
	stopButton: null | JSX,
	prize1: null | string,
	prize2: null | string,
	prize3: null | string,
	prize4: null | string,
	prize5: null | string,
}
class Game extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			si1: null,
			si2: null,
			si3: null,

			slot1_atas: 3,
			slot2_atas: 1,
			slot3_atas: 6,

			slot1: 2,
			slot2: 6,
			slot3: 0,

			slot1_bawah: 6,
			slot2_bawah: 5,
			slot3_bawah: 4,

			speed1: 30,
			speed2: 20,
			speed3: 15,

			itemsdummy1: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],
			itemsdummy2: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],
			itemsdummy3: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],

			isRunning: false,
			modalWin: false,
			loseSfx: false,
			key: 0,
			pulsaAmount: 0,
			notif: '',
			winToken: null,
			gameCount: 1,
			mustWin: false,
			gameResult: null,
			// winType: null,
			startButton: null,
			stopButton: null,
			prize1: null,
			prize2: null,
			prize3: null,
			prize4: null,
			prize5: null,
		}
	}

	dropdownConvert=()=>{
		return(
		<div>
			<div>
				<Form onSubmit={this.upCoin}>
					<FormGroup>
						<Input className="dompet__content__key__topup__dropdown" type="select" id="upcoin" name="aladinConvert" onChange={(e) => this.setState({ key: parseInt(e.target.value, 10) })}>
							<option selected="true" disabled="true" value=''>-- Select --</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={5}>5</option>
							<option value={this.props.userInfo.aladinKeys}>max</option>
						</Input>
					</FormGroup>
					<label>1 Kunci Aladin  = 5 Koin</label>
					<FormGroup>
							<button className="dompet__content__key__button" color="primary" type="submit">Tukar</button>
					</FormGroup>
				</Form>
			</div>
		<div>
			<label className="alert__dompetAladin">{this.state.notif2}</label>
		</div>
	</div>
		)
	}



	render() {
		let {stopButton, startButton, prize1, prize2, prize3, prize4, prize5} = this.state;
		return (
			<div className="game">
				<div className="game__container">
					<label className="game__textHeader">ALADIN GAME</label>
					<label>1 Koin = 1x Main</label>
					<div>
						<div className="game__convert">
								<label className="game__textKeytoCoin">Tukar Kunci Jadi Koin</label>
								{this.dropdownConvert()}
							</div>
						<label className="alert__game">{this.state.notif}</label>
							<div  className="game__slotCoin">
								<img className="game__slotCoin__icon" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/Key.png' alt="coin"/>
								<label> <b> : {this.props.userInfo.aladinKeys}</b></label>
								<img className="game__slotCoin__icon" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/koin-v2.png' alt="coin"/>
								<label> <b> : {this.props.userInfo.coin}</b></label>
							</div>
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
					<div className="game__slotButton">
						{startButton}
						{stopButton}
					</div>

				</div>

				<div className="game__prize">
					<div className="game__prize__textDistance">
						<label className="game__prize__title">Game Prize</label>
						<label>
							Dapatkan hadiah pulsa dengan mendapatkan salah satu kombinasi bawah ini
						</label>
						<label>GRATIS!</label>
					</div>

					<div className="game__prize__row">
						<div className="game__prize__container">
							<img className="game__prize__img" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/win1.png' alt="coin" />
							<label>{prize1}</label>
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/win2.png' alt="coin" />
							<label>{prize2}</label>
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/win3.png' alt="coin" />
							<label>{prize3}</label>
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/win4.png' alt="coin" />
							<label>{prize4}</label>
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/win5.png' alt="coin" />
							<label>{prize5}</label>
						</div>
					</div>

				</div>

					<Modal isOpen={this.state.modalWin} className="gameModal">
						<ModalHeader toggle={this.toggle} className="gameModal__Top"></ModalHeader>
							<div className="gameModal__Container">

								<div className="gameModal__Container__item">
									<img className="gameModal__icon" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/star.svg' alt="Star" />
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

								<button className="gameModal__Container__button" onClick={this.toggle}>Lanjut</button>
							</div>
					</Modal>

				{ this.state.loseSfx ? <audio src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/Lose-sfx.mp3' autoPlay /> : null }
				{ this.state.modalWin ? <audio src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Game/Win-sfx.mp3' autoPlay /> : null }
			</div>
		)
	}

	getRules = () => {
		axios({
			method: 'GET',
			url: `${envChecker('api')}/gamerules`,
			headers: {
				token: localStorage.getItem('token'),
			}
		})
		.then(({data}) => {
			// if (data.msg === 'Unverified') {
			// 	// console.log('VERIFIED', data);
			//
			// }
			// // else {
			// // 	// console.log('UNVERIFIED');
			// // 	this.setState({startButton: (<label className="game__textHeader">VERIFY NOMOR HAPE DAN EMAIL DAHULU UNTUK MAIN GAME</label>)});
			// // }

			this.setState({...data});
		});
		this.setState({
			startButton:(<button className="game__slotButton__start" onClick={ () => this.start() }>START</button>),
		});
	}

	componentDidMount() {
		this.props.getUser();
		this.getRules();
	}

	upCoin = (e) => {
		e.preventDefault();

		if (this.state.key <= 0) {
			return this.setState({
        notif: "Harus Lebih Besar Dari 0",
      })
		} else if (this.state.key === null || this.state.key === '') {
			return this.setState({
				notif: "Tidak Boleh Kosong",
			})
		}	else {
			this.setState({notif: ""});
      // REQUEST UPDATE ALADIN KEY DAN COIN KE API
      axios({
        method: 'GET',
        headers: {
          token: localStorage.getItem('token'),
        },
        url: `${envChecker('api')}/users/checkuser`,
      })
      .then(data => {
       if (this.state.key > data.aladinKeys) {
          return this.setState({
            notif: "Aladin Key Tidak Cukup",
          })
        } else {
          // REQUEST UPDATE ALADIN KEY DAN COIN KE API
          axios({
          method: 'PUT',
          url: `${envChecker('api')}/users/upcoin`,
          data: {
            key: this.state.key
          },
          headers: {
            token: localStorage.getItem('token'),
          }
        })
        .then(response => {
          if (response.data.message === 'coin updated') {
            this.setState({
              notif: "Aladin Key berhasil di tukar!",
              key: null,
            })
            document.getElementById('upcoin').value = '';
            this.props.getUser();
          } else {
              this.setState({notif: "Aladin Key Tidak Cukup", key: null});
              document.getElementById('upcoin').value = '';
          }
        })
        .catch(err => console.log('err'));
        }
      })
      .catch(err => console.log('error'))
		}
	}

	toggle() {
		this.setState({
			pulsaAmount: 0,
			modalWin: false,
		})
		this.reset()

		this.props.history.push('/claimfreepulsa', this.state.winToken);
	}

	handleBingo(winType) {
		switch (winType) {
			case 5:
				return this.setState({
					slot1_atas: 3,
					slot2_atas: 1,
					slot3_atas: 6,

					slot1: 2,
					slot2: 6,
					slot3: 0,

					slot1_bawah: 6,
					slot2_bawah: 5,
					slot3_bawah: 4,

					pulsaAmount: this.state.prize5,
					stopButton: null,
				})

			case 4:
				return this.setState({
					slot1_atas: 6,
					slot2_atas: 1,
					slot3_atas: 4,

					slot1: 2,
					slot2: 6,
					slot3: 0,

					slot1_bawah: 3,
					slot2_bawah: 5,
					slot3_bawah: 6,

					pulsaAmount: this.state.prize4,
					stopButton: null,
				})

			case 3:
				return this.setState({
					slot1_atas: 4,
					slot2_atas: 4,
					slot3_atas: 4,

					slot1: 0,
					slot2: 0,
					slot3: 0,

					slot1_bawah: 6,
					slot2_bawah: 6,
					slot3_bawah: 6,

					pulsaAmount: this.state.prize3,
					stopButton: null,
				})

			case 2:
				return this.setState({
					slot1_atas: 6,
					slot2_atas: 6,
					slot3_atas: 6,

					slot1: 5,
					slot2: 5,
					slot3: 5,

					slot1_bawah: 0,
					slot2_bawah: 0,
					slot3_bawah: 0,

					pulsaAmount: this.state.prize2,
					stopButton: null,
				})

			case 1:
				return this.setState({
					slot1_atas: 5,
					slot2_atas: 5,
					slot3_atas: 5,

					slot1: 6,
					slot2: 6,
					slot3: 6,

					slot1_bawah: 0,
					slot2_bawah: 0,
					slot3_bawah: 0,

					pulsaAmount: this.state.prize1,
					stopButton: null,
				})

			default:
				return null
		}
	}

	async start() {
		let gameResult =
			axios({
				method: 'GET',
				url: `${envChecker('api')}/game`,
				headers:{
					token: localStorage.getItem('token'),
				},
			});

		gameResult.then((data) => {
			if (data.data.message === 'Cannot Play') {
				this.setState({startButton: (<label className="game__textHeader">ANDA TIDAK MEMILIKI COIN</label>)});
			} else if (data.data.message === 'User not found') {
				this.setState({startButton: (<label className="game__textHeader">USER NOT FOUND</label>)});
			} else { //User can play
				this.start1();
				this.start2();
				this.start3();
				this.setState({gameResult, startButton: null,
					stopButton: (<button className="game__slotButton__start" onClick={ () => this.stop() }>STOP</button>),
				});
				this.props.getUser(); //update user data (for the coins);
				this.setState({winToken: data.data.winToken});
			}
		})
		// .catch(err => console.log(err));
		.catch(err => console.log('err'));



	}

	async stop() {
		let resolvedResult = await this.state.gameResult;
		if (resolvedResult.data.message === 'Win') {
			this.stop1();
			this.stop2();
			this.stop3();
			this.handleBingo(resolvedResult.data.winType);
			setTimeout(() => {
				this.setState({modalWin: !this.state.modalWin});
			}, 2000);
		} else {
				this.stop1();
				this.stop2();
				this.stop3();
				if (this.accidentalWin() === 0) { //User didn't win accidentally
					this.setState({
						startButton:(<button className="game__slotButton__start" onClick={ () => this.start() }>START</button>),
						stopButton: null,
					});
				}

		}
	}

	/*
	 * This checks the slots for a winning combination and if found, forces the User to lose
	*/
	accidentalWin() {
		let {slot1_atas, slot2_atas, slot3_atas, slot1, slot2, slot3, slot1_bawah, slot2_bawah, slot3_bawah} = this.state;
		if (slot1.toString() + slot2.toString() + slot3.toString() === '666') {
			this.setState({slot3: 0});
			return 1;
		} else if (slot1_atas.toString() + slot2_atas.toString() + slot3_atas.toString() === '666') {
			this.setState({slot1_atas: 0});
			return 2;
		} else if (slot1_bawah.toString() + slot2_bawah.toString() + slot3_bawah.toString() === '666') {
			this.setState({slot1_bawah: 0});
			return 3
		} else if (slot1_atas.toString() + slot2.toString() + slot3_bawah.toString() === '666') {
			this.setState({slot3_bawab: 0});
			return 4;
		} else if (slot1_bawah.toString() + slot2.toString() + slot3_atas.toString() === '666') {
			this.setState({slot2: 0});
			return 5;
		} else {
			return 0;
		}
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
