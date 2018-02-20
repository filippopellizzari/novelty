import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export function signup(data) {
  return dispatch => {
    localStorage.setItem('email', data.email);
    localStorage.setItem('password', data.password);
    return axios.post("/api/auth/users/create/", {email:data.email, password:data.password});
  }
}

export function resetPasswordRequest(email){
  return dispatch => {
    return axios.post("/api/auth/password/reset/", email);
  }
}

export function resetPassword(data){
  return dispatch => {
    return axios.post("/api/rest-auth/password/reset/confirm/", data);
  }
}

export function validateToken(data){
  return dispatch => {
    return axios.post("/api/auth/validate-token/", data);
  }
}

export function completeDemographic(data){
  return dispatch => {
    return axios.put("/api/auth/complete-demographic/", data);
  }
}
