import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export function recommend(data) {
  return dispatch => {
    return axios.post("/api/recsys/recommend/", data);
  }
}

export function getContent(data) {
  return dispatch => {
    return axios.post("/api/recsys/get-content/", data);
  }
}
