import axios from 'axios';
import store from '../store';

export default () => {
  return axios.create({
    baseURL: `http://localhost:5000/`,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
  });
};
