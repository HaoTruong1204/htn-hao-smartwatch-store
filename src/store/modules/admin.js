// src/store/modules/admin.js
export default {
    state: {
      admin: false,
    },
    mutations: {
      setAdmin(state, isAdmin) {
        state.admin = isAdmin;
      },
    },
    actions: {
      setAdminStatus({ commit }, status) {
        commit('setAdmin', status);
      },
    },
    getters: {
      isAdmin: (state) => state.admin,
    },
  };
  