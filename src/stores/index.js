// src/store/index.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, // Thông tin người dùng
    isAuthenticated: false, // Trạng thái đăng nhập
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
  },
});
