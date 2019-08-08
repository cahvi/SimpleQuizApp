import Api from './Api';

export default {
  register(credentials) {
    return Api().post('register', credentials);
  },
  login(credentials) {
    return Api().post('login', credentials);
  },
  getprog() {
    return Api().get('testprogress');
  },
  progress(test) {
    return Api().post('testprogress/post', test);
  }
};
