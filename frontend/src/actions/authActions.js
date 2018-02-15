import axios from 'axios';
import jwtDecode from 'jwt-decode';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth/token/obtain/', data).then(res => {
      var jwtAccess = res.data.access;
      var jwtRefresh = res.data.refresh;
      localStorage.setItem('jwtAccess', jwtAccess);
      localStorage.setItem('jwtRefresh', jwtRefresh);
      setAuthorizationToken(jwtAccess);
      dispatch(setCurrentUser(jwtDecode(jwtAccess)));
    });
  }
}

export function socialLogin(data){
  return dispatch => {
    localStorage.setItem('email', data.email);
    localStorage.setItem('accessToken', data.accessToken);
    dispatch(setCurrentUser({email:data.email,accessToken:data.accessToken}));
  }
}


export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtAccess');
    localStorage.removeItem('jwtRefresh');
    localStorage.removeItem('email');
    localStorage.removeItem('accessToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}
