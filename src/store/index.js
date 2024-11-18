// src/store/index.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('authUser')) || null, // Lấy người dùng từ localStorage nếu có
    cart: [], // Giỏ hàng
    notification: {
      visible: false,
      message: '',
      type: 'success', // 'success', 'error', 'info'
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    user: (state) => state.user,
    cartItemCount: (state) => state.cart.reduce((count, item) => count + item.quantity, 0),
    cartItems: (state) => state.cart,
    cartTotal: (state) =>
      state.cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0),
    notification: (state) => state.notification,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('authUser', JSON.stringify(user));
    },
    CLEAR_USER(state) {
      state.user = null;
      localStorage.removeItem('authUser');
    },
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    UPDATE_CART_QUANTITY(state, updatedItem) {
      const product = state.cart.find(item => item.id === updatedItem.id);
      if (product) {
        product.quantity = updatedItem.quantity;
      }
    },
    SHOW_NOTIFICATION(state, { message, type }) {
      state.notification.message = message;
      state.notification.type = type;
      state.notification.visible = true;
    },
    HIDE_NOTIFICATION(state) {
      state.notification.visible = false;
      state.notification.message = '';
      state.notification.type = 'success';
    },
  },
  actions: {
    login({ commit }, user) {
      commit('SET_USER', user);
      commit('SHOW_NOTIFICATION', { message: `Chào mừng ${user.name}!`, type: 'success' });
    },
    logout({ commit }) {
      commit('CLEAR_USER');
      commit('SHOW_NOTIFICATION', { message: 'Đã đăng xuất thành công.', type: 'info' });
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
      commit('SHOW_NOTIFICATION', { message: `Đã thêm "${product.name}" vào giỏ hàng!`, type: 'success' });
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
      commit('SHOW_NOTIFICATION', { message: 'Đã xóa sản phẩm khỏi giỏ hàng.', type: 'info' });
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
      commit('SHOW_NOTIFICATION', { message: 'Giỏ hàng đã được xóa.', type: 'info' });
    },
    updateCartQuantity({ commit }, updatedItem) {
      commit('UPDATE_CART_QUANTITY', updatedItem);
      commit('SHOW_NOTIFICATION', { message: `Đã cập nhật số lượng "${updatedItem.name}" thành ${updatedItem.quantity}.`, type: 'info' });
    },
    showNotification({ commit }, payload) {
      commit('SHOW_NOTIFICATION', payload);
      setTimeout(() => {
        commit('HIDE_NOTIFICATION');
      }, 3000);
    },
    hideNotification({ commit }) {
      commit('HIDE_NOTIFICATION');
    },
  },
  modules: {},
});
