import React, { Component } from 'react';
import { Link } from 'react-router'
import FbLogin from './FacebookLogin';
import Isyo from '../common/models/isyo';

export default class Show extends Component {

	constructor(props) {
		super(props);
		this.state = {
			body: null,
			message: null,
			messageRow: null,
		};

    console.log("show.js constructor");
    console.log(this.props.params);

	}
	componentDidMount() {
		console.log("show.js componentDidMount");

    var that = this;

		var userId = "599c4a3efca924e3759c7875";

		let isyo = new Isyo;
		// isyo.getIsyo(userId,function(isyo){
		// 	console.log("show.js isyo.getIsyo",isyo);
		// });
		// // TODO model内 で処理するようリファクタリングする
    //   $.ajax({
    //     url: '/api/isyos?filter={"where":{"hash":"' + this.props.params.isyoId + '"}}',
    //     type: 'GET',
    //     success: function(res) {
    //       console.log("get api success",res);
    //       // this.setState({data: data})
		//
    //       var message = "<p>" + res[0].body.replace("\n","</p><p>") + "</p>";
    //       that.setState({isLoading: false,message:message,messageRow:res[0].body});
    //     },
    //   }).fail((responseData) => {
    //     if (responseData.responseCode) {
    //       console.error(responseData.responseCode);
    //     }
    //   });
	}

	componentWillUnmount() {
		console.log("show.js componentWillUnmount");
	}
	render(){
    console.log("render");
    console.dir(this.props);
		return(
			<div className="bgimage">
			<div className="container">
      <div className="lined-paper" dangerouslySetInnerHTML={{ __html: this.state.message}}>
      </div>
			<Link to="/edit" >
			<button>編集する</button>
			</Link>
      </div>
			</div>
		)
	}
}
