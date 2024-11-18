<!-- src/components/cart/ComCartView.vue -->

<template>
  <div class="cart-overlay" @click.self="closeCart">
    <div class="cart-view">
      <!-- Nút đóng giỏ hàng -->
      <button
        @click="closeCart"
        class="cart-view__close-button"
        aria-label="Đóng giỏ hàng"
      >
        &times;
      </button>
      
      <!-- Tiêu đề giỏ hàng -->
      <h2 class="cart-view__title">Giỏ hàng của bạn</h2>
      
      <!-- Nếu có sản phẩm trong giỏ hàng -->
      <div v-if="cartItems.length > 0">
        <ul class="cart-item-list">
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <img
              :src="formattedImageUrl(item.image)"
              :alt="item.name"
              class="cart-item__image"
            />
            <div class="cart-item__details">
              <h3 class="cart-item__name">{{ item.name }}</h3>
              <p class="cart-item__price">{{ formatCurrency(item.price) }}</p>
              <div class="cart-item__quantity">
                <label for="quantity">Số lượng:</label>
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  @change="updateQuantity(item)"
                  class="quantity-input"
                  aria-label="Số lượng sản phẩm"
                />
              </div>
              <button
                @click="removeFromCart(item.id)"
                class="remove-btn"
                aria-label="Xóa sản phẩm"
              >
                Xóa
              </button>
            </div>
          </li>
        </ul>
        
        <!-- Tổng tiền và các hành động -->
        <div class="cart-summary">
          <p class="cart-summary__total">
            Tổng cộng: <span>{{ formatCurrency(cartTotal) }}</span>
          </p>
          <div class="cart-summary__actions">
            <button @click="checkout" class="checkout-btn">Thanh toán</button>
            <button @click="clearCart" class="clear-cart-btn">Xóa giỏ hàng</button>
          </div>
        </div>
      </div>
      
      <!-- Nếu giỏ hàng trống -->
      <p v-else class="empty-cart">Giỏ hàng của bạn đang trống.</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'ComCartView',
  emits: ['close-cart'],
  setup(_, { emit }) {
    const store = useStore();
    const router = useRouter();

    // Computed properties để lấy dữ liệu từ Vuex Store
    const cartItems = computed(() => store.getters.cartItems || []);
    const cartTotal = computed(() => store.getters.cartTotal || 0);

    // Phương thức định dạng tiền tệ
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value);
    };

    // Phương thức xử lý hình ảnh
    const formattedImageUrl = (image) => {
      if (!image) {
        return '/images/placeholder.png'; // Đường dẫn tới hình ảnh placeholder
      }
      try {
        const url = new URL(image, window.location.origin);
        return url.href;
      } catch (e) {
        return '/images/placeholder.png'; // Nếu URL không hợp lệ
      }
    };

    // Phương thức xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
      if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        store.dispatch('removeFromCart', productId)
          .then(() => {
            alert('Sản phẩm đã được xóa khỏi giỏ hàng.');
          })
          .catch((error) => {
            console.error('Xóa sản phẩm thất bại:', error);
          });
      }
    };

    // Phương thức xóa toàn bộ giỏ hàng
    const clearCart = () => {
      if (
        confirm('Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng?')
      ) {
        store.dispatch('clearCart')
          .then(() => {
            alert('Toàn bộ giỏ hàng đã được xóa.');
          })
          .catch((error) => {
            console.error('Xóa giỏ hàng thất bại:', error);
          });
      }
    };

    // Phương thức cập nhật số lượng sản phẩm trong giỏ hàng
    const updateQuantity = (item) => {
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        alert('Số lượng sản phẩm không hợp lệ. Vui lòng nhập số nguyên lớn hơn 0.');
        item.quantity = 1;
        return;
      }

      store.dispatch('updateCartQuantity', {
        id: item.id,
        quantity: item.quantity,
      })
        .then(() => {
          console.log(`Cập nhật số lượng cho sản phẩm ID: ${item.id}`);
        })
        .catch((error) => {
          console.error('Cập nhật số lượng thất bại:', error);
        });
    };

    // Phương thức chuyển hướng đến trang thanh toán
    const checkout = () => {
      if (cartItems.value.length === 0) {
        alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm.');
        return;
      }

      // Kiểm tra trạng thái đăng nhập
      if (!store.getters.isAuthenticated) {
        alert('Bạn cần đăng nhập để tiến hành thanh toán.');
        router.push({ name: 'Login' });
        return;
      }

      router.push({ name: 'Checkout' }) // Chuyển hướng đến trang Checkout
        .then(() => {
          console.log('Chuyển đến trang thanh toán.');
        })
        .catch((error) => {
          console.error('Lỗi khi chuyển đến trang thanh toán:', error);
        });
    };

    // Phương thức đóng giỏ hàng
    const closeCart = () => {
      emit('close-cart');
    };

    return {
      cartItems,
      cartTotal,
      formatCurrency,
      formattedImageUrl,
      removeFromCart,
      clearCart,
      updateQuantity,
      checkout,
      closeCart,
    };
  },
};
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.cart-view {
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

.cart-view__close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #003366;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s;
}

.cart-view__close-button:hover {
  color: #f44336;
  transform: scale(1.2);
}

.cart-view__title {
  font-size: 1.8rem;
  color: #003366;
  text-align: center;
  margin-bottom: 30px;
}

.cart-item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s ease;
}

.cart-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item__image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.cart-item__details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cart-item__name {
  font-size: 1.2rem;
  color: #003366;
  font-weight: bold;
}

.cart-item__price {
  font-size: 1rem;
  color: #0055a5;
  margin-bottom: 10px;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  margin-right: 10px;
}

.remove-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

.cart-summary {
  margin-top: 30px;
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

.cart-summary__total {
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: bold;
  color: #003366;
}

.cart-summary__actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.checkout-btn {
  background: linear-gradient(45deg, #003366, #0055a5);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s ease;
}

.checkout-btn:hover {
  background: linear-gradient(45deg, #0055a5, #003366);
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.clear-cart-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.clear-cart-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-3px);
}

.empty-cart {
  text-align: center;
  font-size: 1.4rem;
  color: #777;
  margin-top: 50px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
