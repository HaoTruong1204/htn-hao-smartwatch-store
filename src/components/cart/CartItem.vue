<template>
    <div class="cart-item">
      <img :src="item.image" alt="Product Image" class="product-image" />
      <div class="product-details">
        <h3>{{ item.name }}</h3>
        <p>Giá: {{ formatCurrency(item.price) }}</p>
        <div class="quantity">
          <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
        </div>
      </div>
      <button class="remove-btn" @click="removeFromCart(item.id)">Xóa</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
      },
      updateQuantity(productId, quantity) {
        this.$store.dispatch('cart/updateQuantity', { productId, quantity });
      },
      removeFromCart(productId) {
        this.$store.dispatch('cart/removeFromCart', productId);
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ddd;
  }
  
  .product-image {
    width: 80px;
    height: 80px;
    margin-right: 16px;
  }
  
  .product-details {
    flex-grow: 1;
  }
  
  .quantity {
    display: flex;
    align-items: center;
  }
  
  .quantity button {
    width: 24px;
    height: 24px;
    margin: 0 8px;
    border: none;
    background-color: #2a9d8f;
    color: #fff;
    cursor: pointer;
  }
  
  .remove-btn {
    border: none;
    background-color: #e63946;
    color: #fff;
    padding: 8px;
    cursor: pointer;
  }
  </style>
  