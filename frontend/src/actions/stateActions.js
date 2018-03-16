import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export function getProfile(email) {
  return dispatch => {
    return axios.get("/api/state/"+email+"/");
  }
}

export function createProfile(data) {
  return dispatch => {
    return axios.post("/api/state/create/", data);
  }
}

export function updateProfile(data) {
  return dispatch => {
    return axios.put("/api/state/update/", data);
  }
}
