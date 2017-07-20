import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router'

export default class fbLogin extends Component {

	constructor(props) {
		super(props);
		// bindしないとhandleClick内でthisがnull
		this.onClicked = this.onClicked.bind(this);

    this.clicked = false;

		this.state = {
			clicked : false
		};

	}

	responseFacebook(response){
		console.log("responseFacebook");
		console.log(response);
    console.log(this);
    if(response){
      this.setState({clicked:true});
    }
	}

	onClicked(response){
		console.log("onClicked");
    console.log(this);
	}

	componentDidMount() {
		console.log("fblogin componentDidMount");

	}

	componentWillMount(){
		console.log("fblogin componentWillMount");
	}
	componentWillUpdate(){
		console.log("fblogin componentWillUpdate");
	}

	render(){

		console.log("FacebookLogin render");
		console.log(this.state);
    if(this.state.clicked!==true){
      return(
        <FacebookLogin
        appId="573141182862561"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.onClicked}
        callback={this.responseFacebook.bind(this)} />
      )
    }else{
      if(this.props.isyoId){
        var link = "/edit/" + this.props.isyoId;
        return(
          <div>
          <Link to={{pathname:link,state:{body:this.props.body}}} className="btn btn-xl" >{this.props.loggedLabel}</Link>
          </div>
        )
      }else{
        return(
          <div>
          <Link to="/input" className="btn btn-xl" >{this.props.loggedLabel}</Link>
          </div>
        )
      }
    }
	}
}
