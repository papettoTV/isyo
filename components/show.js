import React, { Component } from 'react';

export default class Show extends Component {

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
				show
			</div>
		)
	}
}
