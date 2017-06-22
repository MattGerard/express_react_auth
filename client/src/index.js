import {ConnectedRouter, push, routerMiddleware, routerReducer} from 'react-router-redux';
import {Route, Switch} from 'react-router';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import {AUTH_USER} from './actions/types';
import App from './components/app';
import Dashboard from './components/Dashboard';
import Home from './components/pages/Home';
import Login from './components/Auth/login';
import NotFoundPage from './components/pages/PageNotFound';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './components/Auth/register';
import RequireAuth from './components/Auth/requireAuth';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware)
);

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        {/* Error Page */}
        <Route component={NotFoundPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
