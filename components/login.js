import React, { Component } from 'react';
import LoginButton from './loginButton';

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			message: null,
			userId: null
		};

		console.log("login.js constructor",this.props);
	}
	componentDidMount() {
		console.log("login.js componentDidMount");
	}

	componentWillUnmount() {
		console.log("login.js componentWillUnmount");
	}

	render(){
    return (
      <div>
      <LoginButton />
      </div>
    );

	}
}
