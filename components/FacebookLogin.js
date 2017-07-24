import React, { Component } from 'react';
import FacebookProvider, { Login } from 'react-facebook';

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
		console.log("FacebookLogin.js responseFacebook");
		console.log(response);
    if(response){
      this.setState({clicked:true});
			this.props.updateState(response);
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

	handleError(e){
			console.log("handleError",e);
	}

	render(){

		console.log("FacebookLogin render");
		console.log(this.state);
    if(this.state.clicked!==true){
      return(
				<FacebookProvider appId="336671963423279">
        <Login
          scope="name"
					display=""
          onResponse={this.responseFacebook.bind(this)}
          onError={this.handleError.bind(this)}
          render={({ isLoading, isWorking, onClick }) => (
            <span onClick={onClick}>
              Facebookでログイン
              {(isLoading || isWorking) && (
                <span>Loading...</span>
              )}
            </span>
          )}
        />
      </FacebookProvider>
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
