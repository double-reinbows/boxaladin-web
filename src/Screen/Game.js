import React from 'react'
import { connect } from 'react-redux'

class Slot {
	constructor(el, max, step) {
		this.speed = 0; //speed of the slot at any point of time
    this.step = step; //speed will increase at this rate
    this.si = null; //holds setInterval object for the given slot
    this.el = el; //dom element of the slot
    this.maxSpeed = max; //max speed this slot can have
		this.items = ['zonk', 'zonk', 'zonk', 'zonk', 'zonk', 'zonk', 'BOX-ALADIN'];
	}

	start() {

		console.log('Slot start......')

		var _this = this;
    // $(_this.el).addClass('motion');
    // $(_this.el).spStart();
    _this.si = setInterval(function() {
      if(_this.speed < _this.maxSpeed) {
        _this.speed += _this.step;
        // $(_this.el).spSpeed(_this.speed);
				console.log(`running... with speed ${_this.speed} & step ${_this.step}`);

				// for (var i = 0; i < _this.items.length; i+=_this.step) {
				// 	var run = setInterval(() => {
				// 		console.log(`running... with speed ${_this.speed} & step ${_this.step}`);
				// 	}, _this.speed)
				// }
      } else {
				console.log(`running stable... with speed ${_this.speed} & step ${_this.step}`);
      }
    }, 100);

	}

	stop() {

		var _this = this
    		,limit = 30;
    clearInterval(_this.si);
    _this.si = setInterval(function() {
      if(_this.speed > limit) {
        _this.speed -= _this.step;
        // $(_this.el).spSpeed(_this.speed);
				console.log(`running to stop... with speed ${_this.speed} & step ${_this.step}`);
      }
      if(_this.speed <= limit) {
        // _this.finalPos(_this.el);
        // $(_this.el).spSpeed(0);
        // $(_this.el).spStop();
        clearInterval(_this.si);
        // $(_this.el).removeClass('motion');
        _this.speed = 0;
				console.log('Slot stopped :)');
      }
    }, 100);

	}

}

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			si1: null,
			si2: null,
			si3: null,
			slot1: 'BOX-ZONK-1',
			slot2: 'BOX-ZONK-1',
			slot3: 'BOX-ZONK-1',
			items: ['BOX-ZONK-1', 'BOX-ZONK-2', 'BOX-ZONK-3', 'BOX-ZONK-4', 'BOX-ZONK-5', 'BOX-ZONK-6', 'BOX-ALADIN']
		}
	}

	render() {
		console.log('State:', this.state)

		return (
			<div className="container">
				<h1>{this.state.slot1}</h1>
				<h1>{this.state.slot2}</h1>
				<h1>{this.state.slot3}</h1>
				<button className="btn btn-success btn-lg" onClick={ () => this.start() }>START</button>
				<button className="btn btn-danger btn-lg" onClick={ () => this.stop() }>STOP</button>
				<button className="btn btn-secondary btn-lg" onClick={ () => this.reset() }>RESET</button>
			</div>
		)
	}

	start() {
		this.start1()
		this.start2()
		this.start3()
	}

	stop() {
		this.stop1()
		this.stop2()
		this.stop3()

		this.setState({
			si1: null,
			si2: null,
			si3: null
		})
	}

	reset() {
		this.setState({
			slot1: 'BOX-ZONK-1',
			slot2: 'BOX-ZONK-1',
			slot3: 'BOX-ZONK-1'
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
