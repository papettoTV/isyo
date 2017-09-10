import React , { Component } from 'react'
import {render} from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory ,  Redirect} from 'react-router'
import App from '../../../components/app'
import Main from '../../../components/main'
// import FbLogin from '../../../components/FacebookLogin';
// import Index from '../../../components/index';
import Input from '../../../components/input';
import Show from '../../../components/show';
import FbLogin from '../../../components/FacebookLogin';
import Edit from '../../../components/edit';
import Login from '../../../components/login';

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
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/input" component={Input} />
      <Route path="/edit" component={Edit} />
      <Route path="/show" component={Show} />
      <Route path="/login" component={Login} />
      <Route path="/*" component={Main} />
    </Route>
  </Router>
), document.getElementById('main'))
