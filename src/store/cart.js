// src/stores/cart.js

import { defineStore } from 'pinia';

/**
 * Store quản lý giỏ hàng
 */
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    /**
     * Tổng số lượng sản phẩm trong giỏ
     */
    cartItemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
  },
  actions: {
    /**
     * Thêm sản phẩm vào giỏ
     * @param {Object} product - Sản phẩm cần thêm
     */
    addToCart(product) {
      const existingProduct = this.items.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    /**
     * Xoá sản phẩm khỏi giỏ
     * @param {Object} product - Sản phẩm cần xoá
     */
    removeItemFromCart(product) {
      this.items = this.items.filter(item => item.id !== product.id);
    },
    /**
     * Xoá toàn bộ giỏ hàng
     */
    clearCart() {
      this.items = [];
    },
  },
});
