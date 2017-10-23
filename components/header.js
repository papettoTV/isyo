import React, { Component } from 'react';
import ListAbout from './ListAbout';
import ListReason from './ListReason';
import ListContact from './ListContact';
import ListFaq from './ListFaq';

export default class Header extends Component {

	constructor(props) {
		super(props);
	}


	render(){
		return(
    <nav className="navbar navbar-default navbar-shrink">
        <div className="container">
            <div className="navbar-header page-scroll">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand page-scroll" href="#page-top">遺書一筆</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li className="hidden">
                        <a href="#page-top"></a>
                    </li>
										<ListAbout />
										<ListReason />
										<ListFaq />
                </ul>
            </div>
        </div>
    </nav>
		)
	}

}
