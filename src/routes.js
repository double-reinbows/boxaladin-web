import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import NavBar from './Screen/NavBar'
import Home from './Screen/Home'
import Login from './Screen/login'
import Signup from './Screen/signup'
import EmailVerificationDone from './Screen/EmailVerificationDone'
import Phone from './Screen/Phone'
import Product from './Screen/product'
import LandingPage from './Screen/LandingPage'

class RouteList extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<NavBar />
						<div className="container">
							<Route exact path="/" render={() => (
								localStorage.getItem('token') !== null ? (
									<Redirect to="/home"/>
								) : (
									<LandingPage/>
								)
							)}/>

							<Route exact path="/home" render={() => (
								localStorage.getItem('token') !== null ? (
									<Home/>
								) : (
									<Redirect to="/"/>
								)
							)}/>

							<Route exact path="/product" render={() => (
								localStorage.getItem('token') !== null ? (
									<Product/>
								) : (
									<Product/>
								)
							)}/>

							<Route exact path="/login" render={() => (
								localStorage.getItem('token') !== null ? (
									<Redirect to="/"/>
								) : (
									<Login/>
								)
							)}/>

							<Route exact path="/signup" render={() => (
								localStorage.getItem('token') !== null ? (
									<Redirect to="/"/>
								) : (
									<Signup/>
								)
							)}/>

							<Route exact path="/phone" render={() => (
								localStorage.getItem('token') !== null ? (
									<Phone/>
								) : (
									<Redirect to="/"/>
								)
							)}/>

							<Route path="/emailVerification" component={ EmailVerificationDone }/>
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
