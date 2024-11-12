<template>
  <div class="checkout-page">
    <h1>Thanh toán</h1>
    <form @submit.prevent="processCheckout">
      <div class="form-group">
        <label for="name">Họ tên</label>
        <input
          id="name"
          type="text"
          v-model="name"
          placeholder="Nhập họ tên"
          required
        />
      </div>

      <div class="form-group">
        <label for="address">Địa chỉ giao hàng</label>
        <input
          id="address"
          type="text"
          v-model="address"
          placeholder="Nhập địa chỉ giao hàng"
          required
        />
      </div>

      <div class="form-group">
        <label for="phone">Số điện thoại</label>
        <input
          id="phone"
          type="tel"
          v-model="phone"
          placeholder="Nhập số điện thoại"
          required
        />
      </div>

      <button type="submit" class="submit-btn">Hoàn tất đơn hàng</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      address: "",
      phone: "",
    };
  },
  methods: {
    processCheckout() {
      alert("Đơn hàng của bạn đã được đặt!");
      // Thực hiện xử lý đơn hàng ở đây (gửi dữ liệu đến API, v.v.)
    },
  },
};
</script>

<style scoped>
.checkout-page {
  padding: 20px;
  background-color: #f4f6f9;
  font-family: 'Roboto', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}

.form-group {
  margin-bottom: 16px;
}

form label {
  font-size: 1rem;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  margin-bottom: 10px;
}

input:focus {
  border-color: #2a9d8f;
  box-shadow: 0 0 5px rgba(42, 157, 143, 0.3);
}

button {
  background-color: #2a9d8f;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #21867a;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .checkout-page {
    padding: 16px;
  }

  button {
    font-size: 1rem;
  }
}
</style>
