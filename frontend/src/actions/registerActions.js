import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export function signup(data) {
  return dispatch => {
    return axios.post("/api/auth/signup/", data);
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
