import React, { Component } from 'react';
import FbLogin from './FacebookLogin';
import { Link } from 'react-router'

export default class Main extends Component {

	constructor(props) {
		super(props);

		
		this.state = {
			value: null,
			myState1 : null,
			myState2 : null
		};
		// bindしないとメソッド内でthisがnull
		this.handleClick = this.handleClick.bind(this);
		this.onClicked = this.onClicked.bind(this);
	}

	updateState(state){
		console.log("call updateState");
		this.setState(state);

		//親コンポーネントを更新
		// this.props.updateState(state);
	}

	componentDidMount() {
		console.log("componentDidMount main");
	}

	componentWillUnmount() {
		console.log("componentWillUnmount main");
	}

	handleClick(){
		console.log("handleClick");
		this.setState({value: "clicked"});
	}

	onClicked(){
		console.log("onClicked main");
		// console.log(this.props);
		// this.props.handleView("input");
		// console.log(response);

		//子コンポーネントのステートを更新
		this.props.viewChange("input");
	}
			
	render(){
		return(
      <header>
      <div className="container">
      <div className="intro-text">
      <div className="intro-heading">遺書を書いてみよう</div>
      {/*
      <a href="/#" className="page-scroll btn btn-xl" onClick={this.onClicked} >Tell Me More{this.state.myState1}</a>
      <Link to="/input" className="page-scroll btn btn-xl" >Link input</Link>
      */}
      <FbLogin updateState={this.updateState.bind(this)} loggedLabel="書いてみる"></FbLogin>
      </div>
      </div>
      </header>
		)
	}
}
