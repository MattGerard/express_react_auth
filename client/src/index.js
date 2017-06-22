import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {Route} from 'react-router';
import reduxThunk from 'redux-thunk';
// import routes from './routes';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';

import Home from './components/pages/Home';
import App from './components/app';
import NotFoundPage from './components/pages/PageNotFound';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/requireAuth';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

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
      <Route exact path="/" component={Home} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
