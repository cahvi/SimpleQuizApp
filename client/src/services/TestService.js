import Api from './Api';

export default {
  testindex() {
    return Api().get('tests');
  },
  access(info) {
    return Api().post('tests/access', info);
  },

  testdetail(testId) {
    return Api().get(`tests/${testId}`);
  },

  sendanswer(info) {
    return Api().post(`tests/${info.test}`, {
      question: info.question,
      answer: info.answer
    });
  }
};
