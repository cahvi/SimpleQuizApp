import Vue from 'vue';
import Vuex from 'vuex';
import Api from './services/Api';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
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
    }
  }
});
