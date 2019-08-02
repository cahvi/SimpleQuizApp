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
    console.log(
      'testId: ',
      info.test + ' ' + 'questionId: ',
      info.question + ' ' + 'answerId: ',
      info.answer
    );
    return Api().post(`tests/${info.test}`, {
      question: info.question
    });
  }
};
