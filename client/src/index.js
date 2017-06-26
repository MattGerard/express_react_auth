import {ConnectedRouter, push, routerMiddleware} from 'react-router-redux';
import {Route, Switch} from 'react-router';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {AUTH_USER} from './actions/types';
import AppPage from './components/pages/AppPage';
import ContentPage from './components/pages/ContentPage';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './components/Auth/register';
import RequireAuth from './components/Auth/requireAuth';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import Cookies from 'universal-cookie';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, middleware)(createStore);
const store = createStoreWithMiddleware(reducers);
const cookie = new Cookies();
const token = cookie.get('token');

if (token) {
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppPage>
        <ContentPage />
      </AppPage>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
