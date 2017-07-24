import React, { Component } from 'react';
import FbLogin from './FacebookLogin';

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
		console.log("call updateState",state);
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
      <FbLogin updateState={this.updateState.bind(this)} loggedLabel="書いてみる"></FbLogin>
      </div>
      </div>
      </header>
		)
	}
}
