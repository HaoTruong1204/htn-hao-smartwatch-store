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

      <!-- Các phương thức thanh toán -->
      <div class="payment-method">
        <label>Chọn phương thức thanh toán:</label>
        <div class="payment-options">
          <label>
            <input type="radio" v-model="paymentMethod" value="creditCard" /> Thẻ tín dụng
          </label>
          <label>
            <input type="radio" v-model="paymentMethod" value="eWallet" /> Ví điện tử
          </label>
          <label>
            <input type="radio" v-model="paymentMethod" value="cashOnDelivery" /> Thanh toán khi nhận hàng
          </label>
        </div>
        <span v-if="errors.paymentMethod" class="error-message">{{ errors.paymentMethod }}</span>
      </div>

      <!-- Danh sách sản phẩm -->
      <div class="product-summary">
        <h2>Danh Sách Sản Phẩm</h2>
        <ul class="product-list">
          <li v-for="item in cartItems" :key="item.id">
            <span>{{ item.name }} - {{ item.quantity }} x {{ formatCurrency(item.price) }}</span>
          </li>
        </ul>
        <p v-if="cartItems.length === 0" class="no-items">Giỏ hàng của bạn đang trống.</p>
        <p v-else class="total">Tổng tiền: {{ formatCurrency(cartTotal) }}</p>
      </div>

      <!-- Nút hoàn tất đơn hàng -->
      <button type="submit" class="submit-btn" :disabled="isProcessing || cartItems.length === 0">
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

    const customer = reactive({
      name: '',
      address: '',
      phone: '',
      email: '',
    });

    const isProcessing = ref(false);
    const paymentMethod = ref('');
    const errors = reactive({
      name: '',
      address: '',
      phone: '',
      email: '',
      paymentMethod: '',
    });

    const cartItems = computed(() => store.getters.cartItems || []);
    const cartTotal = computed(() => store.getters.cartTotal || 0);

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const validateForm = () => {
      let valid = true;
      errors.name = '';
      errors.address = '';
      errors.phone = '';
      errors.email = '';
      errors.paymentMethod = '';

      if (!customer.name.trim()) {
        errors.name = 'Họ tên   được để trống.';
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
      if (!paymentMethod.value) {
        errors.paymentMethod = 'Vui lòng chọn phương thức thanh toán.';
        valid = false;
      }

      return valid;
    };

    const processCheckout = () => {
  // Kiểm tra nếu form không hợp lệ
  if (!validateForm()) {
    return; // Dừng xử lý nếu form không hợp lệ
  }

  // Kiểm tra nếu giỏ hàng trống
  if (cartItems.value.length === 0) {
    // Thông báo lỗi cho người dùng
    emitter.emit('show-notification', {
      message: 'Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán!',
      type: 'error',
    });
    return; // Ngăn không cho xử lý tiếp
  }

  // Xác nhận đang xử lý để tránh gửi nhiều lần
  isProcessing.value = true;

  try {
    // Chuẩn bị dữ liệu đơn hàng
    const orderData = {
      customer: { ...customer },
      items: cartItems.value.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cartTotal.value,
      paymentMethod: paymentMethod.value,
      createdAt: new Date().toISOString(),
    };

    // Lưu đơn hàng vào localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Xóa giỏ hàng sau khi đặt hàng thành công
    store.dispatch('clearCart');

    // Hiển thị thông báo thành công và chuyển hướng
    emitter.emit('show-notification', {
      message: 'Đơn hàng của bạn đã được đặt thành công!',
      type: 'success',
    });
    router.push({ name: 'OrderConfirmation', params: { orderId: orders.length } });
  } catch (error) {
    // Xử lý lỗi không mong muốn
    console.error('Lỗi đặt hàng:', error);
    emitter.emit('show-notification', {
      message: 'Có lỗi xảy ra trong quá trình đặt hàng. Vui lòng thử lại sau!',
      type: 'error',
    });
  } finally {
    // Kết thúc trạng thái xử lý
    isProcessing.value = false;
  }
};

    return {
      customer,
      cartItems,
      cartTotal,
      errors,
      isProcessing,
      paymentMethod,
      formatCurrency,
      processCheckout,
    };
  },
};
</script>



<style scoped>
.checkout-page {
  padding: 40px 20px;
  font-family: "Roboto", sans-serif;
  background-color: #f9f9f9;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;
}

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

h1 {
  text-align: center;
  font-size: 2.4rem;
  color: #003366;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
}

.input-error {
  border-color: #e74c3c;
}

.error-message {
  font-size: 0.85rem;
  color: #e74c3c;
  margin-top: 5px;
}

.payment-method {
  margin: 20px 0;
}

.payment-method label {
  font-weight: normal;
  margin-right: 15px;
  font-size: 1rem;
  cursor: pointer;
}

.payment-options {
  margin-top: 10px;
}

.payment-options label {
  display: inline-block;
  margin-right: 15px;
}

.product-summary {
  margin-top: 30px;
}

.product-summary h2 {
  font-size: 1.5rem;
  color: #003366;
  margin-bottom: 10px;
}

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-list li {
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  text-align: right;
  margin-top: 10px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 12px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
}

.submit-btn:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.fas {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .checkout-page {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .submit-btn {
    font-size: 1rem;
  }
}
</style>
