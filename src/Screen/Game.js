import React from 'react'
import { connect } from 'react-redux'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			si1: null,
			si2: null,
			si3: null,
			slot1: 'box1',
			slot2: 'box1',
			slot3: 'box1',
			items: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],
			isRunning: false
		}
	}

	render() {
		console.log('State:', this.state)

		return (
			<div className="container">
				<div className={this.state.slot1} />
				<div className={this.state.slot2} />
				<div className={this.state.slot3} />

				<h1>{this.state.slot1}</h1>
				<h1>{this.state.slot2}</h1>
				<h1>{this.state.slot3}</h1>
				<button disabled={this.state.isRunning} className="btn btn-success btn-lg" onClick={ () => this.start() }>START</button>
				<button disabled={!this.state.isRunning} className="btn btn-danger btn-lg" onClick={ () => this.stop() }>STOP</button>
				<button disabled={this.state.isRunning} className="btn btn-secondary btn-lg" onClick={ () => this.reset() }>RESET</button>
			</div>
		)
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

		this.setState({
			si1: null,
			si2: null,
			si3: null,
			isRunning: false
		})
	}

	reset() {
		this.setState({
			slot1: 'box1',
			slot2: 'box1',
			slot3: 'box1'
		})
	}

	start1() {
		console.log('START-1...')

		var _this = this
		var i = 1

		this.state.si1 = setInterval(function() {

			console.log(_this.state.items[i])
			_this.setState({ slot1: _this.state.items[i] })

			if (i < 6) {
				i++
			} else {
				i=0
			}

  	}, 100)

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

			console.log(_this.state.items[i])
			_this.setState({ slot2: _this.state.items[i] })

			if (i < 6) {
				i++
			} else {
				i=0
			}

  	}, 70)

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

			console.log(_this.state.items[i])
			_this.setState({ slot3: _this.state.items[i] })

			if (i < 6) {
				i++
			} else {
				i=0
			}

  	}, 50)

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
