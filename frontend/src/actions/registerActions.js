import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export function signup(data) {
  return dispatch => {
    return axios.post('/api/auth/signup/', data);
  }
}
