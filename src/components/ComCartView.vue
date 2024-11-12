<template>
  <div class="cart-view">
    <div class="cart-view__header">
      <h2>Giỏ hàng</h2>
      <button @click="$emit('close-cart')" class="cart-view__close-button" aria-label="Đóng giỏ hàng">✖️</button>
    </div>
    <div v-if="cart.length > 0" class="cart-view__items">
      <div v-for="item in cart" :key="item.id" class="cart-view__item">
        <img :src="item.image" :alt="item.name" class="cart-view__item-image" />
        <div class="cart-view__item-details">
          <h3 class="cart-view__item-name">{{ item.name }}</h3>
          <p class="cart-view__item-price">Giá: {{ formatPrice(item.price) }}</p>
          <p class="cart-view__item-quantity">Số lượng: {{ item.quantity }}</p>
          <button @click="$emit('remove-item', item)" class="cart-view__remove-button">Xóa</button>
        </div>
      </div>
      <div class="cart-view__total">
        <h3>Tổng cộng: {{ formatPrice(totalPrice) }}</h3>
      </div>
      <div class="cart-view__actions">
        <button @click="$emit('clear-cart')" class="cart-view__clear-button">Xóa toàn bộ</button>
        <button @click="checkout" class="cart-view__checkout-button">Thanh toán</button>
      </div>
    </div>
    <div v-else class="cart-view__empty">
      <p>Giỏ hàng của bạn đang trống.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComCartView",
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    },
    checkout() {
      // Logic thanh toán, ví dụ điều hướng tới trang thanh toán
      this.$emit('close-cart');
      this.$emit('navigate', 'checkout');
    },
  },
};
</script>

<style scoped>
.cart-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cart-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.cart-view__close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--primary-color);
  transition: color var(--transition-speed);
}

.cart-view__close-button:hover,
.cart-view__close-button:focus {
  color: var(--secondary-color);
  outline: none;
}

.cart-view__items {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
}

.cart-view__item {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.cart-view__item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.cart-view__item-details {
  flex: 1;
}

.cart-view__item-name {
  font-size: 16px;
  margin-bottom: 5px;
  color: var(--primary-color);
}

.cart-view__item-price,
.cart-view__item-quantity {
  font-size: 14px;
  margin-bottom: 5px;
}

.cart-view__remove-button {
  background-color: #ff5722;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color var(--transition-speed);
}

.cart-view__remove-button:hover,
.cart-view__remove-button:focus {
  background-color: #e64a19;
  outline: none;
}

.cart-view__total {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 10px;
}

.cart-view__actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cart-view__clear-button,
.cart-view__checkout-button {
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color var(--transition-speed);
}

.cart-view__clear-button:hover,
.cart-view__clear-button:focus,
.cart-view__checkout-button:hover,
.cart-view__checkout-button:focus {
  background-color: var(--secondary-color);
  outline: none;
}

.cart-view__empty {
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
  color: #555;
}
</style>
