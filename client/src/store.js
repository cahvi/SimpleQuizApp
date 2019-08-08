import Vue from 'vue';
import Vuex from 'vuex';
import Api from './services/Api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //user
    user: null,
    isLoggedIn: false,

    //test
    test: {
      name: '',
      password: '',
      questions: [
        {
          question: '',
          points: null,
          answers: [
            {
              correct: null,
              answer: ''
            },
            {
              correct: null,
              answer: ''
            },
            {
              correct: null,
              answer: ''
            }
          ]
        }
      ]
    }
  },
  getters: {
    getTest: ({ test }) => test
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
    setAnswer(state, answer) {
      state.test.answers = answer;
    },
    setFeedback(state, feedback) {
      state.test.question = feedback;
    },
    setQuestionDone(state, done) {
      state.test.question = done;
    },
    setQuestionAttemps(state, attemp) {
      state.test.question = attemp;
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
    setAnswer({ commit }, answer) {
      commit('setAnswer', answer);
    },
    setFeedback({ commit }, feedback) {
      commit('setAnswer', feedback);
    },
    setQuestionDone({ commit }, done) {
      commit('setQuestionDone', done);
    },
    setQuestionAttemps({ commit }, attemp) {
      commit('setQuestionAttemps', attemp);
    }
  }
});
