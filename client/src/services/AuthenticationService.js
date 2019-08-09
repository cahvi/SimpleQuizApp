import Api from './Api';

export default {
  register(credentials) {
    return Api().post('register', credentials);
  },
  login(credentials) {
    return Api().post('login', credentials);
  },
  getprog(testId) {
    return Api().get(`/testprogress/${testId}`);
  },
  progress(test) {
    return Api().post('testprogress/post', test);
  }
};
