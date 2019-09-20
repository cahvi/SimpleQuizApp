import Vue from 'vue';
import Vuex from 'vuex';
import Api from './services/Api';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,

    test: [],
    newTest: {
      name: 'New test',
      password: null,
      questions: [
        {
          question: 'First question',
          userpoints: 0,
          feedback: '',
          isDone: false,
          attemps: 3,
          points: 3,
          questionType: null,
          answers: [
            {
              answer: 'First answer',
              checked: false,
              correct: false
            },
            {
              answer: 'Second answer',
              checked: false,
              correct: false
            },
            {
              answer: 'Third answer',
              checked: false,
              correct: false
            }
          ]
        },
        {
          question: 'Second question',
          userpoints: 0,
          feedback: '',
          isDone: false,
          attemps: 3,
          points: 3,
          questionType: null,
          answers: [
            {
              answer: 'First answer',
              checked: false,
              correct: false
            },
            {
              answer: 'Second answer',
              checked: false,
              correct: false
            },
            {
              answer: 'Third answer',
              checked: false,
              correct: false
            }
          ]
        }
      ]
    }
  },
  getters: {
    getTest: ({ test }) => test,
    newTest: ({ newTest }) => newTest
  },
  mutations: {
    //User mutations
    setUser(state, user) {
      state.user = user;
      if (user) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },

    //Test mutations
    setTest(state, test) {
      state.test = test;
    },
    setNewTest(state, test) {
      state.newTest = test;
    },
    setAnswer(state, answer) {
      state.test.questions[answer.questionIndex].answers[
        answer.answerIndex
      ].checked = true;
    },
    setFeedback(state, feedback) {
      state.test.questions[feedback.index].feedback = feedback.feedback;

      if (
        feedback.feedback == 'Correct answer!' &&
        state.test.questions[feedback.index].questionType == 'single'
      ) {
        state.test.questions[feedback.index].isDone = true;
      }

      if ((state.test.questions[feedback.index].attemps = 0)) {
        state.test.questions[feedback.index].isDone = true;
      }
    },
    setQuestionAttemps(state, attemp) {
      state.test.questions[attemp.index].attemps = attemp.attemps;
    }
  },
  actions: {
    //User actions
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    getUser({ commit }) {
      Api()
        .get('getuser')
        .then(res => {
          commit('setUser', res.data);
        })
        .catch(err => console.log(err));
    },

    //Test actions
    setTest({ commit }, test) {
      commit('setTest', test);
    },
    setNewTest({ commit }, test) {
      commit('setNewTest', test);
    },
    setAnswer({ commit }, answer) {
      commit('setAnswer', answer);
    },
    setFeedback({ commit }, feedback) {
      commit('setFeedback', feedback);
    },
    setQuestionAttemps({ commit }, attemp) {
      commit('setQuestionAttemps', attemp);
    }
  }
});
