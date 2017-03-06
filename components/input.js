import React, { Component } from 'react';

export default class Input extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
	}
	componentDidMount() {
		console.log("componentDidMount");
	}

	componentWillUnmount() {
		console.log("componentWillUnmount");
	}
	render(){
		return(
			<div className="container">
				input
			</div>
		)
	}
}
