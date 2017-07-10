import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import SaveButton from './saveButton';

export default class Input extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			message: null,
		};

		this.showBody = this.showBody.bind(this);
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

  hideBody(){
    this.setState({show:false});
  }

	render(){
    const body = 
			<div className="bgimage">
			<div className="container">
      {this.state.show ?
        <div>
        <p className="close" onClick={this.hideBody.bind(this)}>
        ｘ close
        </p>
        <br />
        <div className="lined-paper" dangerouslySetInnerHTML={{ __html: this.state.message}}>
        </div>
      <div className="checkbox">
      <label>
      <input type="checkbox" id="fb_notification" name="fb_notification"/>保存したことをfacebook上で通知する。
      </label>
      </div>
        </div>
        : 
        <div>
      <div className="form-group">
      <textarea id="body" name="body" placeholder="ここに遺書を残してみましょう。" className="form-control" rows="20"></textarea>
      </div>
      <SaveButton showBody={this.showBody}/>
        </div>
      }
			</div>
			</div>
        ;

    return (
      <div>
      <CSSTransitionGroup transitionName="note" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      {body}
      </CSSTransitionGroup>
      </div>
    );
		
	}
}
