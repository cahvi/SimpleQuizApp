import Vue from 'vue';
import Vuex from 'vuex';
import Api from './services/Api';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    isLoggedIn: false,
    attemps: 3
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    setAttemps(state) {
      state.attemps > 0 ? state.attemps-- : (state.attemps = 0);
    }
  },
  actions: {
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
    setAttemps({ commit }, attemp) {
      commit('setAttemps', attemp);
    }
  }
});
