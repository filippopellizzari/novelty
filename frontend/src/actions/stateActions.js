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

export function updatePageProfile(data) {
  return dispatch => {
    return axios.put("/api/state/update-page/",data);
  }
}

export function updateQuestionNumberProfile(data) {
  return dispatch => {
    return axios.put("/api/state/update-question-number/", data);
  }
}

export function saveAnswers(data) {
  return dispatch => {
    return axios.post("/api/state/save-answers/", data);
  }
}

export function getAnswers(email) {
  return dispatch => {
    return axios.get("/api/state/get-answers/"+email+"/");
  }
}

export function deleteAnswers(email) {
  return dispatch => {
    return axios.delete("/api/state/delete-answers/"+email+"/");
  }
}
