import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'

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

			speed1: 50,
			speed2: 30,
			speed3: 20,

			// items1: [
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6'
			// 				],
      //
			// items2: [
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6'
			// 				],
      //
			// items3: [
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin',
			// 				'box1', 'box2', 'box3', 'box4', 'box5', 'box6'
			// 				],

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

		return (
			<div className="container">

				<div className="slotitems">
					<div className={this.state.itemsdummy1[this.state.slot1]} />
					<div className={this.state.itemsdummy2[this.state.slot2]} />
					<div className={this.state.itemsdummy3[this.state.slot3]} />
				</div>

				<div>
					<button disabled={this.state.isRunning} className="btn btn-success btn-lg" onClick={ () => this.start() }>START</button>
					<button disabled={!this.state.isRunning} className="btn btn-danger btn-lg" onClick={ () => this.stop() }>STOP</button>
					<button disabled={this.state.isRunning} className="btn btn-secondary btn-lg" onClick={ () => this.reset() }>RESET</button>
				</div>

				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}></ModalHeader>
					<ModalBody>
						<div className="slotitems">
							<div className={this.state.itemsdummy1[this.state.slot1]} />
							<div className={this.state.itemsdummy2[this.state.slot2]} />
							<div className={this.state.itemsdummy3[this.state.slot3]} />
						</div>
					</ModalBody>
					<ModalFooter>
					 <Button color="primary" onClick={this.toggle}>OK</Button>
				 </ModalFooter>
				</Modal>

			</div>
		)
	}

	toggle() {
		this.setState({ modal: !this.state.modal })
	}

	handleBingo() {
		if (this.state.slot3 === this.state.itemsdummy3.length-1 && (this.state.slot1 === this.state.slot2 && this.state.slot2 === this.state.slot3) ) {
			this.setState({ slot3: this.state.slot3 - 6 })
		}
	}

	start() {
		this.start1()
		this.start2()
		this.start3()

		this.setState({ isRunning: true })
	}

	stop() {
		this.stop1()
		this.stop2()
		this.stop3()

		this.handleBingo()

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
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Game)

export default connectComponent
