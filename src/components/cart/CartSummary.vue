<!-- src/components/cart/CartSummary.vue -->
<template>
  <div class="cart-summary" aria-labelledby="cart-summary-title">
    <!-- Tổng tiền hiển thị -->
    <div class="summary-details">
      <h3 id="cart-summary-title" class="summary-title">Tóm tắt giỏ hàng</h3>
      <p>
        Tổng sản phẩm: <strong>{{ cartItemCount }}</strong>
      </p>
      <p>
        Tổng tiền: <strong>{{ formatCurrency(cartTotalPrice) }}</strong>
      </p>
    </div>
    <!-- Nút Thanh toán và Xóa toàn bộ -->
    <div class="summary-actions">
      <button
        type="button"
        class="clear-cart-btn"
        @click="handleClearCart"
        aria-label="Xóa toàn bộ giỏ hàng"
      >
        Xóa toàn bộ
      </button>
      <button
        type="button"
        class="checkout-btn"
        @click="handleCheckout"
        aria-label="Thanh toán"
      >
        Thanh toán
      </button>
    </div>
  </div>
</template>

<script>
export default {
  // ...
  methods: {
    async handleCheckout() {
      if (this.cartItemCount === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
      }
      try {
        await this.checkout(); // Dispatch Vuex action
        alert('Đơn hàng của bạn đã được đặt thành công!');
        this.$router.push({ name: 'CheckoutPage' });
      } catch (error) {
        console.error('Checkout Error:', error);
        alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.');
      }
    },
    handleClearCart() {
      if (this.cartItemCount === 0) {
        alert('Giỏ hàng của bạn đã trống.');
        return;
      }
      if (confirm('Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng?')) {
        this.clearCart()
          .then(() => {
            alert('Giỏ hàng đã được xóa thành công!');
          })
          .catch((error) => {
            console.error('Clear Cart Error:', error);
            alert('Có lỗi xảy ra khi xóa giỏ hàng. Vui lòng thử lại.');
          });
      }
    },
  },
};
</script>
<style scoped>
/* Sử dụng biến CSS cho dễ quản lý chủ đề */
:root {
  --primary-color: #2a9d8f;
  --secondary-color: #e9c46a;
  --error-color: #e63946;
  --success-color: #2a9d8f;
  --info-color: #264653;
  --text-color: #333;
  --background-color: #f9f9f9;
  --border-color: #ddd;
  --button-hover-transform: scale(1.05);
}

/* General Cart Summary Styling */
.cart-summary {
  padding: 20px;
  border-top: 1px solid var(--border-color);
  background-color: var(--background-color);
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.cart-summary:hover {
  background-color: #fff;
}

/* Summary Details */
.summary-details {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: var(--text-color);
  line-height: 1.6;
}

.summary-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--primary-color);
}

/* Summary Actions */
.summary-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.checkout-btn,
.clear-cart-btn {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  min-width: 120px;
}

.checkout-btn {
  background-color: var(--primary-color);
  color: white;
}

.checkout-btn:hover {
  background-color: #21867a; /* Màu tối hơn của primary-color */
  transform: var(--button-hover-transform);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.clear-cart-btn {
  background-color: var(--error-color);
  color: white;
}

.clear-cart-btn:hover {
  background-color: #c22c36; /* Màu tối hơn của error-color */
  transform: var(--button-hover-transform);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 480px) {
  .summary-actions {
    flex-direction: column;
    gap: 10px;
  }

  .checkout-btn,
  .clear-cart-btn {
    width: 100%;
    max-width: 100%;
  }

  .summary-details {
    font-size: 1rem;
  }

  .summary-title {
    font-size: 1.3rem;
  }
}
</style>
