import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import SaveButton from './saveButton';
import FacebookProvider, { Share} from 'react-facebook';

export default class Edit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			isyoId: ""
		};

		this.showBody = this.showBody.bind(this);
		console.log("edit.js constructor",this.props);


		var that = this;
		// TODO model内 で処理するようリファクタリングする
      $.ajax({
        url: '/api/isyos?filter={"where":{"hash":"' + this.props.params.isyoHash + '"}}',
        type: 'GET',
        success: function(res) {
          console.log("editjs get api success",res);
          // this.setState({data: data})

					var body = res[0].body;
					var hash = res[0].hash;
          that.setState({message: body,isyoId:hash});
        },
      }).fail((responseData) => {
        if (responseData.responseCode) {
          console.error(responseData.responseCode);
        }
      });
	}
	componentDidMount() {
		console.log("componentDidMount");
	}

	componentWillUnmount() {
		console.log("componentWillUnmount");
	}

	// viewChange(view){
	// 	console.log("call viewChange in input.js",view);
	// 	// console.log(this.state);
	// 	// this.setState(state);
	// 	//
	// 	var state = {route:view};
 //
	// 	this.setState(state);
	// }

  showBody(data){
    console.log("input.js",data);
    data = "<p>" + data.replace("\n","</p><p>") + "</p>";
    this.setState({show:true,message:data});
  }
	//
  // hideBody(){
  //   this.setState({show:false});
  // }
	handleChange(e){
			this.setState({message: e.target.value});
	}
	// onChangeText(e){
	// 		console.log("onChangeText");
	// }

	render(){
		return (
			<div className="bgimage">
			<div className="container">
			<div className="form-group">
			<textarea id="body" name="body" className="form-control" rows="20" value={this.state.message} onChange={this.handleChange.bind(this)} />
			<input id="isyoId" name="isyoId" type="hidden" value={this.state.isyoId} />
			<p>※書いた内容は書いた本人しか見れません。</p>
			<SaveButton showBody={this.showBody}/>
			</div>
			</div>
			</div>
		);
	}
}
