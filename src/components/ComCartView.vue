<template>
  <div class="cart-view">
    <h2>Giỏ Hàng</h2>
    <ul class="cart-list">
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <span class="item-name">{{ item.name }} (x{{ item.quantity }})</span>
        <button @click="$emit('remove-item', item)" class="remove-button">Xóa</button>
      </li>
    </ul>
    <button @click="$emit('clear-cart')" class="clear-cart-button">Xóa toàn bộ giỏ hàng</button>
  </div>
</template>

<script>
export default {
  name: 'ComCartView',
  props: {
    cart: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
/* Container cho giỏ hàng */
.cart-view {
  background-color: #ecf0f1;
  padding: 20px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Tiêu đề */
.cart-view h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
}

/* Danh sách sản phẩm trong giỏ hàng */
.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Sản phẩm trong giỏ hàng */
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #bdc3c7;
}

.item-name {
  font-size: 1rem;
  color: #34495e;
}

/* Nút xóa sản phẩm */
.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c0392b;
}

/* Nút xóa toàn bộ giỏ hàng */
.clear-cart-button {
  display: block;
  width: 100%;
  background-color: #e74c3c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.clear-cart-button:hover {
  background-color: #c0392b;
}
</style>
