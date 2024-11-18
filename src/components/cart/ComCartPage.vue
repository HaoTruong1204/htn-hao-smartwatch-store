<!-- src/components/cart/CartPage.vue -->
<template>
  <div class="cart-page">
    <h1 class="cart-title">Giỏ Hàng Của Bạn</h1>
    
    <!-- Nếu giỏ hàng trống -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      Giỏ hàng của bạn đang trống.
    </div>
    
    <!-- Nếu giỏ hàng có sản phẩm -->
    <div v-else class="cart-items">
      <CartItem
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
      />
      
      <!-- Cart Summary -->
      <CartSummary />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from './ComCartItem.vue';
import CartSummary from './CartSummary.vue';

export default {
  name: "CartPage",
  components: {
    CartItem,
    CartSummary,
  },
  computed: {
    // Map getters từ module 'cart' với namespace
    ...mapGetters('cart', ['cartItems', 'cartItemCount', 'cartTotalPrice']),
  },
};
</script>

<style scoped>
:root {
  --primary-color: #003366;
  --secondary-color: #ffcc00;
  --hover-color: #ffd54f;
  --text-color: #333333;
  --background-color: #f4f6f9;
  --font-family: 'Roboto', sans-serif;
  --transition-speed: 0.3s;
  --button-background: #2a9d8f;
  --button-hover-background: #21867a;
  --remove-button-background: #e63946;
  --remove-button-hover-background: #c22c36;
}

.cart-page {
  font-family: var(--font-family);
  background-color: var(--background-color);
  padding: 20px;
}

.cart-title {
  text-align: center;
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 30px;
}

.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-color);
}

.cart-items {
  max-width: 1200px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: center;
  }

  .cart-item-image {
    width: 100%;
    max-width: 300px;
  }

  .cart-item-details {
    width: 100%;
    text-align: center;
  }

  .cart-summary {
    text-align: center;
  }

  .checkout-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
