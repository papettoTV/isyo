import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import SaveButton from './saveButton';

export default class Edit extends Component {

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


  showBody(data){
    console.log("edit.js",data);
    data = "<p>" + data.replace("\n","</p><p>") + "</p>";
    this.setState({show:true,message:data});
  }

  hideBody(){
    this.setState({show:false});
  }

	render(){
    console.log("render edit.js");
    console.log(this.props);
    let body = this.props.location.state.body;
    return (
      <div>
      <div className="bgimage">
      <div className="container">
      <div>
      <div className="form-group">
      <textarea id="body" name="body" className="form-control" rows="20" defaultValue={body} />
      </div>
      <SaveButton showBody={this.showBody} />
      </div>
      </div>
      </div>
      </div>
    );
	}
}
