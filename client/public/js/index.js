import React , { Component } from 'react'
import {render} from 'react-dom'
// import { Router, Route, IndexRoute, Link, hashHistory ,  Redirect} from 'react-router'
import { BrowserRouter, Route, hashHistory ,IndexRoute} from 'react-router-dom'
// import {hashRouter} from 'react-router-dom'
import App from '../../../components/app'
import Main from '../../../components/main'
// import FbLogin from '../../../components/FacebookLogin';
// import Index from '../../../components/index';
import Input from '../../../components/input';
import Show from '../../../components/show';
import FbLogin from '../../../components/FacebookLogin';
import Edit from '../../../components/edit';
import Login from '../../../components/login';

import Header from './../../../components/header'

// render(
//   <App title="title1" />,
//   document.getElementById('main')
// )
// render((
//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Index} />
//       <Route path="input" component={Input} />
//       <Route path="show" component={Show} />
//     </Route>
//   </Router>
// ), document.getElementById('main'))
//

render((
  <BrowserRouter history={hashHistory}>
	<div>
	<Header />
      <Route exact path="/" component={Main} />
      <Route path="/input" component={Input} />
      <Route path="/edit/:isyoHash" component={Edit} />
      <Route path="/show/:isyoHash" component={Show} />
      <Route path="/login" component={Login} />
	</div>
  </BrowserRouter>
), document.getElementById('main'))
