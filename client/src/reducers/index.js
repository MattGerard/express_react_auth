import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  router: routerReducer,
});

export default rootReducer;
