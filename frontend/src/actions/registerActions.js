import axios from 'axios';

export function signup(data) {
  return dispatch => {
    return axios.post('/api/auth/signup/', data);
  }
}
