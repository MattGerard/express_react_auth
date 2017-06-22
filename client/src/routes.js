import React from 'react';
import {Route, Router} from 'react-router';

import App from './components/app';
import NotFoundPage from './components/pages/PageNotFound';

import HomePage from './components/pages/Home';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);
//https://github.com/ReactTraining/react-router/blob/9b3eae6eb181dd082f70570c54e5762dc80e4dd4/packages/react-router/docs/guides/migrating.md
