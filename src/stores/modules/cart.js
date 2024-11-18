// src/store/modules/cart.js

import createPersistedState from "vuex-persistedstate";

const cartModule = {
  namespaced: true, // Bật namespacing cho module
  state: {
    // Khởi tạo trạng thái giỏ hàng từ localStorage nếu có, nếu không thì là mảng trống
    items: [],
  },
  mutations: {
    ADD_TO_CART(state, product) {
      // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        // Nếu sản phẩm đã có, tăng số lượng
        existingItem.quantity += product.quantity || 1;
      } else {
        // Nếu chưa có, thêm sản phẩm mới với số lượng mặc định là 1
        state.items.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      // Xóa sản phẩm dựa trên ID
      state.items = state.items.filter((item) => item.id !== productId);
    },
    CLEAR_CART(state) {
      // Xóa toàn bộ giỏ hàng
      state.items = [];
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      // Tìm sản phẩm trong giỏ hàng và cập nhật số lượng
      const item = state.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 1; // Không cho phép số lượng < 1
      }
    },
  },
  actions: {
    addProductToCart({ commit }, product) {
      commit("ADD_TO_CART", product);
      return Promise.resolve();
    },
    removeProductFromCart({ commit }, productId) {
      commit("REMOVE_FROM_CART", productId);
      return Promise.resolve();
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
      return Promise.resolve();
    },
    updateProductQuantity({ commit }, payload) {
      commit("UPDATE_QUANTITY", payload);
      return Promise.resolve();
    },
    checkout({ commit, state }) {
      return new Promise((resolve, reject) => {
        // Giả lập quá trình checkout, bạn có thể thay thế bằng API call thực tế
        setTimeout(() => {
          if (state.items.length > 0) {
            commit("CLEAR_CART");
            resolve();
          } else {
            reject(new Error("Giỏ hàng đang trống."));
          }
        }, 1000);
      });
    },
  },
  getters: {
    // Lấy toàn bộ sản phẩm trong giỏ hàng
    cartItems: (state) => state.items,
    // Tính tổng số tiền trong giỏ hàng
    cartTotalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    // Tính tổng số lượng sản phẩm trong giỏ hàng
    cartItemCount: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
  },
  plugins: [
    createPersistedState({
      key: "cart",
      paths: ["items"],
      storage: window.localStorage,
    }),
  ],
};

export default cartModule;
    