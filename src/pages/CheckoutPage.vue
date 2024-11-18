<template>
  <div class="checkout-page">
    <h1>Thanh Toán</h1>
    <form @submit.prevent="processCheckout" novalidate>
      <!-- Họ tên -->
      <div class="form-group">
        <label for="name">Họ và Tên</label>
        <input
          id="name"
          type="text"
          v-model="customer.name"
          placeholder="Nhập họ và tên"
          :class="{ 'input-error': errors.name }"
          required
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <!-- Địa chỉ giao hàng -->
      <div class="form-group">
        <label for="address">Địa chỉ giao hàng</label>
        <input
          id="address"
          type="text"
          v-model="customer.address"
          placeholder="Nhập địa chỉ giao hàng"
          :class="{ 'input-error': errors.address }"
          required
        />
        <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
      </div>

      <!-- Số điện thoại -->
      <div class="form-group">
        <label for="phone">Số điện thoại</label>
        <input
          id="phone"
          type="tel"
          v-model="customer.phone"
          placeholder="Nhập số điện thoại"
          :class="{ 'input-error': errors.phone }"
          required
          pattern="^\d{10,15}$"
        />
        <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="customer.email"
          placeholder="Nhập email"
          :class="{ 'input-error': errors.email }"
          required
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <!-- Danh sách sản phẩm -->
      <div class="product-summary">
        <h2>Danh Sách Sản Phẩm</h2>
        <ul class="product-list">
          <li v-for="item in cartItems" :key="item.id">
            <span>{{ item.name }} - {{ item.quantity }} x {{ formatCurrency(item.price) }}</span>
          </li>
        </ul>
        <p class="total">Tổng tiền: {{ formatCurrency(cartTotal) }}</p>
      </div>

      <!-- Nút hoàn tất đơn hàng -->
      <button type="submit" class="submit-btn" :disabled="isProcessing">
        <span v-if="isProcessing">
          <i class="fas fa-spinner fa-spin"></i> Đang xử lý...
        </span>
        <span v-else>Hoàn Tất Đơn Hàng</span>
      </button>
    </form>
  </div>
</template>


<script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import emitter from '../plugins/eventBus'; // Event Bus for notifications

export default {
  name: 'CheckoutPage',
  setup() {
    const store = useStore();
    const router = useRouter();

    // Form Data
    const customer = reactive({
      name: '',
      address: '',
      phone: '',
      email: '',
    });
    const isProcessing = ref(false);

    // Error Handling
    const errors = reactive({
      name: '',
      address: '',
      phone: '',
      email: '',
    });

    // Cart Data
    const cartItems = computed(() => store.getters.cartItems || []);
    const cartTotal = computed(() => store.getters.cartTotal || 0);

    // Currency Formatter
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // Validate Form
    const validateForm = () => {
      let valid = true;
      errors.name = '';
      errors.address = '';
      errors.phone = '';
      errors.email = '';

      if (!customer.name.trim()) {
        errors.name = 'Họ tên không được để trống.';
        valid = false;
      }
      if (!customer.address.trim()) {
        errors.address = 'Địa chỉ không được để trống.';
        valid = false;
      }
      const phonePattern = /^\d{10,15}$/;
      if (!customer.phone.trim() || !phonePattern.test(customer.phone.trim())) {
        errors.phone = 'Vui lòng nhập số điện thoại hợp lệ (10-15 số).';
        valid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!customer.email.trim() || !emailPattern.test(customer.email.trim())) {
        errors.email = 'Vui lòng nhập email hợp lệ.';
        valid = false;
      }

      return valid;
    };

    // Process Checkout
    const processCheckout = () => {
      if (!validateForm()) return;

      if (cartItems.value.length === 0) {
        emitter.emit('show-notification', { message: 'Giỏ hàng của bạn đang trống.', type: 'error' });
        return;
      }

      isProcessing.value = true;

      try {
        // Prepare Order Data
        const orderData = {
          customer: { ...customer },
          items: cartItems.value.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: cartTotal.value,
          createdAt: new Date().toISOString(),
        };

        // Save to Local Storage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear Cart
        store.dispatch('clearCart');

        // Redirect and Notify
        emitter.emit('show-notification', { message: 'Đơn hàng của bạn đã được đặt thành công!', type: 'success' });
        router.push({ name: 'OrderConfirmation', params: { orderId: orders.length } });
      } catch (error) {
        console.error('Checkout Error:', error);
        emitter.emit('show-notification', { message: 'Có lỗi xảy ra. Vui lòng thử lại.', type: 'error' });
      } finally {
        isProcessing.value = false;
      }
    };

    return {
      customer,
      cartItems,
      cartTotal,
      errors,
      isProcessing,
      formatCurrency,
      processCheckout,
    };
  },
};
</script>

<style scoped>
/* Checkout Page Container */
.checkout-page {
  padding: 40px;
  background-color: #f4f6f9;
  font-family: 'Roboto', sans-serif;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.4s ease;
}

/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Main Heading */
h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Form Group */
.form-group {
  margin-bottom: 20px;
  position: relative;
}

/* Label Styling */
form label {
  font-size: 1.1rem;
  color: #333;
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

/* Input Styling */
input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #fff;
  color: #333;
}

/* Input Focus Effect */
input:focus {
  border-color: #2a9d8f;
  box-shadow: 0 0 6px rgba(42, 157, 143, 0.4);
  outline: none;
}

/* Error Input Styling */
.input-error {
  border-color: #f44336 !important;
  background-color: #ffecec;
}

/* Error Message Styling */
.error-message {
  color: #f44336;
  font-size: 0.9rem;
  position: absolute;
  bottom: -18px;
  left: 0;
  font-style: italic;
}

/* Submit Button */
.submit-btn {
  background-color: #2a9d8f;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1.3rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s ease, box-shadow 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
}

/* Submit Button Hover */
.submit-btn:hover {
  background-color: #21867a;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Submit Button Active */
.submit-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Disabled Submit Button */
.submit-btn:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
  box-shadow: none;
}

/* Loading Spinner Icon in Button */
.submit-btn .fa-spinner {
  margin-right: 8px;
  animation: spin 1s linear infinite;
}

/* Spinner Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Styles for Tablet (Max Width: 768px) */
@media (max-width: 768px) {
  .checkout-page {
    padding: 30px;
    margin: 20px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 25px;
  }

  .submit-btn {
    font-size: 1.1rem;
    padding: 12px 16px;
  }
}

/* Responsive Styles for Mobile (Max Width: 480px) */
@media (max-width: 480px) {
  .checkout-page {
    padding: 20px;
    margin: 10px;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  .submit-btn {
    font-size: 1rem;
    padding: 10px 14px;
  }
}
</style>
<style scoped>
/* Checkout Page Container */
.checkout-page {
  padding: 40px;
  background-color: #f4f6f9;
  font-family: 'Roboto', sans-serif;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.4s ease;
}

/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Main Heading */
h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Form Group */
.form-group {
  margin-bottom: 20px;
  position: relative;
}

/* Label Styling */
form label {
  font-size: 1.1rem;
  color: #333;
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

/* Input Styling */
input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #fff;
  color: #333;
}

/* Input Focus Effect */
input:focus {
  border-color: #2a9d8f;
  box-shadow: 0 0 6px rgba(42, 157, 143, 0.4);
  outline: none;
}

/* Error Input Styling */
.input-error {
  border-color: #f44336 !important;
  background-color: #ffecec;
}

/* Error Message Styling */
.error-message {
  color: #f44336;
  font-size: 0.9rem;
  position: absolute;
  bottom: -18px;
  left: 0;
  font-style: italic;
}

/* Submit Button */
.submit-btn {
  background-color: #2a9d8f;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1.3rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s ease, box-shadow 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
}

/* Submit Button Hover */
.submit-btn:hover {
  background-color: #21867a;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Submit Button Active */
.submit-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Disabled Submit Button */
.submit-btn:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
  box-shadow: none;
}

/* Loading Spinner Icon in Button */
.submit-btn .fa-spinner {
  margin-right: 8px;
  animation: spin 1s linear infinite;
}

/* Spinner Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Styles for Tablet (Max Width: 768px) */
@media (max-width: 768px) {
  .checkout-page {
    padding: 30px;
    margin: 20px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 25px;
  }

  .submit-btn {
    font-size: 1.1rem;
    padding: 12px 16px;
  }
}

/* Responsive Styles for Mobile (Max Width: 480px) */
@media (max-width: 480px) {
  .checkout-page {
    padding: 20px;
    margin: 10px;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  .submit-btn {
    font-size: 1rem;
    padding: 10px 14px;
  }
}
</style>
