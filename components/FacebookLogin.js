import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

export default class fbLogin extends Component {

	constructor(props) {
		super(props);
		// bindしないとhandleClick内でthisがnull
		this.onClicked = this.onClicked.bind(this);
	}

	responseFacebook(response){
		console.log("responseFacebook");
		console.log(response);
	}

	onClicked(response){
		console.log("onClicked");
		console.log(this.props);
		this.props.handleView("input");
		// console.log(response);
	}

	componentDidMount() {
		console.log("fblogin componentDidMount");
	}

	componentWillMount(){
		console.log("fblogin componentWillMount");
	}
	componentWillUpdate(){
		console.log("fblogin componentWillUpdate");
	}

	render(){

		console.log("FacebookLogin render");
		console.log(this.props);
		return(
			<FacebookLogin
			appId="573141182862561"
			autoLoad={true}
			fields="name,email,picture"
			onClick={this.onClicked}
			callback={this.responseFacebook} />
		)
	}
}
