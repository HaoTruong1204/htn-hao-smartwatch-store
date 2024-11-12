<template>
  <div class="cart-page">
    <h1>Giỏ hàng</h1>
    
    <!-- Hiển thị danh sách các sản phẩm trong giỏ hàng -->
    <div class="cart-items">
      <CartItem v-for="item in cartItems" :key="item.id" :item="item" />
    </div>
    
    <!-- Tóm tắt giỏ hàng (tổng giá trị, phí vận chuyển, vv) -->
    <CartSummary />
  </div>
</template>

<script>
import CartItem from "../components/cart/CartItem.vue";
import CartSummary from "../components/cart/CartSummary.vue";

export default {
  components: { CartItem, CartSummary },
  computed: {
    // Lấy danh sách các sản phẩm trong giỏ hàng từ Vuex store
    cartItems() {
      return this.$store.state.cart.items;
    },
  },
};
</script>

<style scoped>
.cart-page {
  padding: 16px;
  background-color: #f9f9f9;
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

/* Cải thiện hiển thị cho các phần tử trong giỏ hàng */
.cart-items > div {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.cart-items > div:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

/* Tối ưu nút xóa sản phẩm */
button {
  padding: 6px 12px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

/* Kiểu dáng cho phần tóm tắt giỏ hàng */
.cart-summary {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  color: #333;
}

.cart-summary p {
  margin-bottom: 10px;
  font-weight: bold;
}

.cart-summary .total-price {
  color: #2a9d8f;
  font-size: 1.5rem;
}

/* Responsive design cho giỏ hàng */
@media (max-width: 768px) {
  .cart-items {
    gap: 15px;
  }

  .cart-summary {
    font-size: 1rem;
  }
}
</style>
