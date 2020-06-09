import Vuex from '@wepy/x';
import users from './modules/user'

export default new Vuex.Store({
   modules: {
    users,
  }
  /*state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++;
    },
    decrement (state) {
      state.counter--;
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment');
    },
    decrement ({ commit }) {
      commit('decrement');
    },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    }
  }*/
});
