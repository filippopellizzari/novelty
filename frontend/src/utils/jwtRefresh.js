import jwtDecode from 'jwt-decode';
import axios from 'axios';

import setAuthorizationToken from './setAuthorizationToken';
import { setCurrentUser } from '../actions/authActions';


export default function jwtRefresh(store){
  if (localStorage.jwtAccess) {

    const jwtAccess = localStorage.jwtAccess;
    setAuthorizationToken(jwtAccess);

    const expirationTime = 1000 * jwtDecode(jwtAccess).exp - (new Date()).getTime();

    if(expirationTime < 10000){ //time in milliseconds
      console.log("expired");
      const body = {"refresh": localStorage.jwtRefresh};
      axios.post('/api/auth/token/refresh/', body).then(res => {
        const newJwtAccess = res.data.access;
        localStorage.setItem('jwtAccess', newJwtAccess);
        setAuthorizationToken(newJwtAccess);
        store.dispatch(setCurrentUser(jwtDecode(newJwtAccess)));
      });
    }
    
    store.dispatch(setCurrentUser(jwtDecode(jwtAccess)));
  }
}
