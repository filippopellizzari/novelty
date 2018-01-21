import jwtDecode from 'jwt-decode';
import axios from 'axios';

import setAuthorizationToken from './setAuthorizationToken';
import { setCurrentUser } from '../actions/authActions';


function expirationTime(jwt){
  setAuthorizationToken(jwt);
  return 1000 * jwtDecode(jwt).exp - (new Date()).getTime();
}

function refreshUpdate(store){
  if (localStorage.jwtRefresh) {
    var exp = expirationTime(localStorage.jwtRefresh);
    if(exp < 10000){ //time in milliseconds
      localStorage.removeItem('jwtAccess');
      localStorage.removeItem('jwtRefresh');
      localStorage.removeItem('username');
    }
  }
}

function accessUpdate(store){
  if (localStorage.jwtAccess) {
    var exp = expirationTime(localStorage.jwtAccess);
    if(exp < 10000){ //time in milliseconds
      const body = {"refresh": localStorage.jwtRefresh};
      axios.post('/api/auth/token/refresh/', body).then(res => {
        const newJwtAccess = res.data.access;
        localStorage.setItem('jwtAccess', newJwtAccess);
        setAuthorizationToken(newJwtAccess);
        store.dispatch(setCurrentUser(jwtDecode(newJwtAccess)));
      });
    }
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtAccess)));
  }
}

export default function jwtUpdate(store){
  refreshUpdate(store);
  accessUpdate(store);
}
