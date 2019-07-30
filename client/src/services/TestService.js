import Api from './Api';

export default {
  testindex() {
    return Api().get('tests');
  },
  testdetail(testId) {
    return Api().get(`tests/${testId}`);
  }
};
