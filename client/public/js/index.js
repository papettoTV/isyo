import React , { Component } from 'react'
import {render} from 'react-dom'
import App from '../../../components/app'
import Main from '../../../components/main'
// import FbLogin from '../../../components/FacebookLogin';
// import Index from '../../../components/index';
import Input from '../../../components/input';
import Show from '../../../components/show';
import FbLogin from '../../../components/FacebookLogin';
import { Router, Route, IndexRoute, Link, hashHistory , RouteHandler } from 'react-router'

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
      <Route path="/show" component={Show} />
    </Route>
  </Router>
), document.getElementById('main'))
