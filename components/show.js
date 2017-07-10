import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Show extends Component {

	constructor(props) {
		super(props);
		this.state = {
			body: null,
		};
	}
	componentDidMount() {
		console.log("componentDidMount");
	}

	responseFacebook(response){
    console.log("responseFacebook");
    if(response){
      $.ajax({
        url: "/get",
        dataType: 'json',
        type: 'POST',
        data: data,
        success: function(data) {
          console.log("get success");
          this.setState({body: data})
        },
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
	}

	componentWillUnmount() {
		console.log("componentWillUnmount");
	}
	render(){
		return(
			<div className="bgimage">
			<div className="container">
			<div className="lined-paper">
      <p>{this.state.body}</p>
      </div>
      </div>
			</div>
		)
	}
}
