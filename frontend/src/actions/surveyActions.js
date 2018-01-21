import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export function submitSurvey(data) {
  return dispatch => {
    return axios.post("/api/surveys", data);
  }
}
