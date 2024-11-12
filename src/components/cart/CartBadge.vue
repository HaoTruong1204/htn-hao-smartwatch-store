<template>
    <div class="cart-badge">
      <i class="fas fa-shopping-cart"></i>
      <span v-if="itemCount > 0" class="badge">{{ itemCount }}</span>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState({
        itemCount: state => state.cart.items.length, // Đếm số lượng sản phẩm trong giỏ
      }),
    },
  };
  </script>
  
  <style scoped>
  .cart-badge {
    position: relative;
    font-size: 1.5rem;
    color: #333;
  }
  
  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #e63946;
    color: #fff;
    padding: 2px 6px;
    border-radius: 50%;
    font-size: 0.75rem;
  }
  </style>
  