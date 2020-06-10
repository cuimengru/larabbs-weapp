import Vuex from '@wepy/x';
import users from './modules/user'
import notification from './modules/notification'

export default new Vuex.Store({
  // getters,
  modules: {
    user,
    notification
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
