import axios from 'axios';
import {browserHistory} from 'react-router';
import config from './../config';

import Cookies from 'universal-cookie';

import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, PROTECTED_TEST} from './types';

export const API_URL = config.apiUrl;
export const CLIENT_ROOT_URL = config.clientUrl;

const cookie = new Cookies();

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';
  const errorRes = error || {data: {error: 'Contact Support'}};
  if (errorRes.data.error) {
    errorMessage = errorRes.data.error;
  } else if (errorRes.data) {
    errorMessage = errorRes.data;
  } else {
    errorMessage = errorRes;
  }

  if (errorRes.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.',
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage,
    });
  }
}

export function loginUser({email, password}) {
  console.log('logging in');
  return function(dispatch) {
    console.log(dispatch, 'dispatch exists');
    axios
      .post(`${API_URL}/auth/login`, {email, password})
      .then(response => {
        cookie.set('token', response.data.token, {path: '/'});
        cookie.set('user', response.data.user, {path: '/'});
        dispatch({type: AUTH_USER});

        console.log(response, 'whats in the box');
        window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
      })
      .catch(error => {
        console.log(error, 'whats the error');
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function registerUser({email, firstName, lastName, password}) {
  return function(dispatch) {
    axios
      .post(`${API_URL}/auth/register`, {email, firstName, lastName, password})
      .then(response => {
        cookie.set('token', response.data.token, {path: '/'});
        dispatch({type: AUTH_USER});
        window.location.href = CLIENT_ROOT_URL + '/dashboard';
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function logoutUser() {
  return function(dispatch) {
    console.log(dispatch, 'yea');
    dispatch({type: UNAUTH_USER});
    cookie.remove('token', {path: '/'});

    window.location.href = CLIENT_ROOT_URL + '/login';
  };
}

export function protectedTest() {
  return function(dispatch) {
    axios
      .get(`${API_URL}/protected`, {
        headers: {Authorization: cookie.get('token')},
      })
      .then(response => {
        dispatch({
          type: PROTECTED_TEST,
          payload: response.data.content,
        });
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}
