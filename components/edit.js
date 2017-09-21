import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import SaveButton from './saveButton';
import FacebookProvider, { Share} from 'react-facebook';

export default class Edit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			message: null,
			userId: null
		};

		// this.showBody = this.showBody.bind(this);
		console.log("edit.js constructor",this.props);
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

  // showBody(data){
  //   console.log("input.js",data);
  //   data = "<p>" + data.replace("\n","</p><p>") + "</p>";
  //   this.setState({show:true,message:data});
  // }
	//
  // hideBody(){
  //   this.setState({show:false});
  // }
	handleChange(){
			console.log("handleChange");
			this.setState({textAreaValue:"setState"});
	}

	render(){

    return (
			<div className="bgimage">
			<div className="container">
        <div>
      <div className="form-group">
      <textarea id="body" name="body" placeholder="ここに遺書を残してみましょう。" className="form-control" rows="20" defaultValue={this.state.textAreaValue} onChange={this.handleChange.bind(this)} />
      </div>
      <SaveButton showBody={this.showBody}/>
        </div>
			</div>
			</div>
    );

	}
}
