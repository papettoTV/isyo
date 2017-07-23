import React, { Component } from 'react';
import {render} from 'react-dom'

// First we import some modules...
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

export default class Index extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: null,
			route:Home,
		};
	}

	render(){

		let Child

		// Child=this.state.route;
		// Child=this.home;
		Child=Home;

		return(
			<Child />
		)
	}

}

let ind = new Index;

let Home = React.createClass({
	getInitialState:function(){
		return {root:""};
	},
	moveView:function(root){
		console.log("call moveView:",root);
		this.setState({root: root});
	},
	render:function(){
		return (
			<div>
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <span className="copyright">Copyright &copy; Your Website 2014</span>
                </div>
                <div className="col-md-4">
                    <ul className="list-inline social-buttons">
                        <li><a href="#"><i className="fa fa-twitter"></i></a>
                        </li>
                        <li><a href="#"><i className="fa fa-facebook"></i></a>
                        </li>
                        <li><a href="#"><i className="fa fa-linkedin"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <ul className="list-inline quicklinks">
                        <li><a href="#">Privacy Policy</a>
                        </li>
                        <li><a href="#">Terms of Use</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
			</div>
		);
	}
});
