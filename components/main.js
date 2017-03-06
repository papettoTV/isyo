import React, { Component } from 'react';

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
		// bindしないとhandleClick内でthisがnull
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		console.log("componentDidMount");
	}

	componentWillUnmount() {
		console.log("componentWillUnmount");
	}
	handleClick(){
		console.log("handleClick");
		this.setState({value: "clicked"});
	}
	render(){
		return(
			<div className="container">
				<form>
				<div className="form-group">
				<label>遺書本文</label>
				<textarea name="password" placeholder="ここに遺書を残せます" className="form-control" rows="20"></textarea>
				</div>
				<div className="checkbox">
				<label>
				<input type="checkbox" />保存したことをfacebook上で通知する。
				</label>
				</div>
				<button type="submit" className="btn btn-default">保存</button>
				</form>
				</div>
		)
	}
}
