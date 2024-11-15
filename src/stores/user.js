// src/stores/user.js

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('authToken') || '',
    userRole: localStorage.getItem('userRole') || '',
    userName: localStorage.getItem('userName') || '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.userRole === 'admin',
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('authToken', token);
    },
    setUserRole(role) {
      this.userRole = role;
      localStorage.setItem('userRole', role);
    },
    setUserName(name) {
      this.userName = name;
      localStorage.setItem('userName', name);
    },
    logout() {
      this.token = '';
      this.userRole = '';
      this.userName = '';
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
    },
  },
});
