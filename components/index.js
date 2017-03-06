import React, { Component } from 'react';
import {render} from 'react-dom'
// import ExampleApp from '../../../components/ExampleApp'
import FbLogin from './FacebookLogin';
import App from './App';

// First we import some modules...
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

export default class Index extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: null,
			route:Home,
		};

		// この書き方はhandleSubmitが反応せず
		// this.home = React.createClass({
		// 		render:function(){
		// 			return (
		// 				<div className="intro-text">
		// 					<div className="intro-heading">遺書を書いてみよう</div>
		// 					<a className="btn btn-xl" onClick={this.handleSubmit}>Tell Me More</a>
		// 					<FbLogin val="teststr" />
		// 					</div>
		// 			);
		// 		}
		// 	});
		// this.handleClick = this.handleClick.bind(this);

		// bindしないとhandleClick内でthisがnull
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(){
		console.log("index handleSubmit");
		console.log(this);
		// this.setState({value:"value"});
		// TODO Clildの中身を別のxmlに変えたい
		// this.state.route = Main;
		// this.setState({
		// 	route : Main
		// });
	}

	render(){

		let Child

		// Child=this.state.route;
		// Child=this.home;
		Child=Home;

		return(
			<Child />
		)
	}

}

let ind = new Index;

let Home = React.createClass({
	getInitialState:function(){
		return {root:""};
	},
	moveView:function(root){
		console.log("call moveView:",root);
		this.setState({root: root});
	},
	render:function(){
		return (
			<div className="intro-text">
				<div className="intro-heading">遺書を書いてみよう</div>
{/*
				<a className="btn btn-xl" onClick={ind.handleSubmit}>Tell Me More</a>
				<a className="btn btn-xl" href="/more">Tell Me More</a>
*/}
				<FbLogin handleView={this.moveView} val="teststr" />
				</div>
		);
	}
});
//
// let Main = React.createClass({
// 	render:function(){
// 		return(
// 			<div className="container">
// 				<form>
// 				<div className="form-group">
// 				<label>遺書本文</label>
// 				<textarea name="password" placeholder="ここに遺書を残せます" className="form-control" rows="20"></textarea>
// 				</div>
// 				<div className="checkbox">
// 				<label>
// 				<input type="checkbox" />保存したことをfacebook上で通知する。
// 				</label>
// 				</div>
// 				<button type="submit" className="btn btn-default">保存</button>
// 				</form>
// 				</div>
// 		);
// 	}
// });

// var Routes = (
//   <Route path="/" component={Index}>
//     <IndexRoute component={Top}/>
//     <Route path="/top" component={Top}/>
//     <Route path="/portal" component={Main}>
//       <IndexRoute component={Body}/>
//       <Route path="/userbox" component={UserBox}/>
//     </Route>
//   </Route>
// );
//
