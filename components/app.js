import React, { Component } from 'react';
import Main from './main'
import Input from './input'

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
		this.state.route = "Main";
	}

	componentDidMount() {
		// window.addEventListener('hashchange', () => {
		// 	console.log("hashchange");
		// 	this.setState({
		// 		route: "/input"
		// 	})
		// })
	}

	componentWillUnmount() {
	}

	render(){
		let Child
		switch (this.state.route) {
			case '/main': Child = Main; break;
			case '/input': Child = Input; break;
			default:      Child = Main;
		}

		return(
			<Child />
		)
	}
}
