import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import SaveButton from './saveButton';
import FacebookProvider, { Share} from 'react-facebook';

export default class Input extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			message: null,
			userId: null
		};

		this.showBody = this.showBody.bind(this);
		console.log("input.js constructor",this.props);
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
		let isyo_id = 123;
		let share_url = location.protocol + "//" + location.host + "/isyo/" + isyo_id;
		let display="遺書をここに残しました";
		let userId=null;

		// if(!!this.props.location.state.userId){
		// 	userId=this.props.location.state.userId;
		// }

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
      <label>
      </label>
			<div>
			<p>※書いた内容は本人しか見れません。</p>
			<p>※今後のversion upで、課金した人にだけ公開する機能を作成予定です。</p>
			</div>
        </div>
        :
        <div>
      <div className="form-group">
      <textarea id="body" name="body" placeholder="ここに遺書を残してみましょう。" className="form-control" rows="20"></textarea>
			{/*
      <input type="hidden" id="userId" name="userId" value={userId} />
			*/}
      </div>
			<p>※書いた内容は書いた本人しか見れません。</p>
			<p>※今後のversion upで、課金した人にだけ公開する機能を作成予定です。</p>
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
