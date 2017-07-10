import React, { Component } from 'react';
import Main from './main'
import Header from './header'

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
		this.state.route = "Main";
	}

	componentDidMount() {
		console.log("componentDidMount app");
	}

	componentWillUnmount() {
	}

	viewChange(view){
		console.log("call viewChange in app.js",view);
		// console.log(this.state);
		// this.setState(state);
		//
		var state = {route:view};

		this.setState(state);
	}

	render(){
		return(
			<div>
			<Header />
         { this.props.children }
			</div>
		)
	}
}
