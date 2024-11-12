<template>
    <div class="cart-summary">
      <div class="summary-details">
        <p>Tổng tiền: <strong>{{ formatCurrency(totalAmount) }}</strong></p>
      </div>
      <button class="checkout-btn" @click="checkout">Thanh toán</button>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState({
        cartItems: state => state.cart.items,
      }),
      totalAmount() {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
      },
      checkout() {
        this.$store.dispatch('cart/checkout');
        alert("Đơn hàng của bạn đã được đặt thành công!");
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-summary {
    padding: 16px;
    border-top: 1px solid #ddd;
    text-align: right;
  }
  
  .summary-details {
    font-size: 1.25rem;
    margin-bottom: 16px;
  }
  
  .checkout-btn {
    padding: 8px 16px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    background-color: #2a9d8f;
    color: #fff;
    cursor: pointer;
  }
  </style>
  