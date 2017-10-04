import React, { Component } from 'react';
import FbLogin from './FacebookLogin';
import { Link } from 'react-router'
import Isyo from '../common/models/isyo';


export default class Main extends Component {

	constructor(props) {
		super(props);


		this.state = {
			isLoading : true,
			userId : null,
			isMounted: false
		};
	}

	updateState(state){
		console.log("call updateState",state);
		this.setState(state);

		//親コンポーネントを更新
		// this.props.updateState(state);
	}

	componentDidMount() {
		console.log("componentDidMount main");

		// var userId = "599c4a3efca924e3759c7875";
		//
		// // console.log(Isyo);
		// // Isyo.get(userId,function(isyo){
		// // // Isyo.getIsyo(userId,function(isyo){
		// // 	console.log("show.js isyo.getIsyo",isyo);
		// // });
		// // let isyo = new Isyo;
		// let isyo = Isyo();
		// console.log(isyo);
		// // isyo.get(userId,function(isyo){
		// Isyo.getIsyo(userId,function(isyo){
		// 	console.log("show.js isyo.getIsyo",isyo);
		// });

		var that = this;

    this.setState({ isMounted: true });
    if (this.state.isMounted == true) {

    $.ajax({
      url: "/logon",
      dataType: 'json',
      type: 'GET',
      success: function(res) {
        console.log("get logon",res);

        that.setState({isLoading: false,userId:res.userId});
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());

        that.setState({isLoading: false});
      }
    });
	}
	}

	componentWillUnmount() {
		console.log("componentWillUnmount main");
    this.setState({ isMounted: false });
	}

	render(){
		let link="/input";

		console.log("render main.js");

		return(
      <header>
      <div className="container">
      <div className="intro-text">
      <div className="intro-heading">遺書を書いてみよう</div>
			{/*
      <FbLogin updateState={this.updateState.bind(this)} loggedLabel="書いてみる"></FbLogin>
			*/}

			{this.state.userId ?
			<Link to={{pathname:link,state:{'userId':this.state.userId}}}>
			<button type="button" className="btn btn-primary btn-lg">
			書いてみる
			</button>
			</Link>
			:
			<a href="/auth/facebook" title="Facebook" className="btn btn-facebook">
			<i className="fa fa-facebook fa-fw"></i>書いてみる（facebookログイン）
			</a>
		}
      </div>
      </div>
      </header>
		)
	}
}
