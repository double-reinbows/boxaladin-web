import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import NavBar from './Screen/NavBar'
import Home from './Screen/Home'
import Login from './Screen/login'
import Signup from './Screen/signup'
import EmailVerificationDone from './Screen/EmailVerificationDone'
import Phone from './Screen/Phone'

class RouteList extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<Router>
					<div>
						<NavBar />
							<div className="container">
							<Route exact path="/" component={ Home }/>
							<Route path="/login" component={ Login }/>
							<Route path="/signup" component={ Signup }/>
							<Route path="/emailVerification" component={ EmailVerificationDone }/>
							<Route path="/phone" component={ Phone }/>
						</div>
					</div>
				</Router>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isLogin: state.userReducer.isLogin
	}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(RouteList)

export default connectComponent
