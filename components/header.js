import React, { Component } from 'react';

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
                    <li>
                        <a className="page-scroll" href="#about">このサービスについて</a>
                    </li>
                    <li>
                        <a className="page-scroll" href="#services">どうして作ったか</a>
                    </li>
                    <li>
                        <a className="page-scroll" href="#contact">お問い合わせ</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
		)
	}

}

