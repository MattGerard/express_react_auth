import React, {PropTypes} from 'react';
import Home from './Home';
import Login from './../Auth/login';
import Register from './../Auth/register';
import Dashboard from './../Dashboard';
import Nav from './../Nav';
import {Route, Switch} from 'react-router';
import RequireAuth from './../Auth/requireAuth';
import NotFoundPage from './PageNotFound';

export default class ContentPage extends React.Component {
  render() {
    console.log(this.props, 'props');
    return (
      <div className="wrapper">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={RequireAuth(Dashboard)} />
          {/* Error Page */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}
