<template>
  <div class="order-confirmation">
    <h1>🎉 Cảm ơn bạn đã đặt hàng!</h1>
    <p>Đơn hàng của bạn đã được xác nhận.</p>

    <div class="order-details">
      <h2>Thông tin đơn hàng</h2>
      <p><strong>Mã đơn hàng:</strong> {{ orderId }}</p>
      <ul>
        <li v-for="item in order.items" :key="item.id">
          {{ item.name }} - {{ item.quantity }} x {{ formatCurrency(item.price) }}
        </li>
      </ul>
      <p><strong>Tổng tiền:</strong> {{ formatCurrency(order.total) }}</p>
    </div>

    <div class="shipping-info">
      <h2>Thông tin giao hàng</h2>
      <p><strong>Tên:</strong> {{ order.customer.name }}</p>
      <p><strong>Địa chỉ:</strong> {{ order.customer.address }}</p>
      <p><strong>Số điện thoại:</strong> {{ order.customer.phone }}</p>
    </div>

    <button @click="navigateToHome" class="btn-home">Về Trang Chủ</button>
  </div>
</template>
<script>
export default {
  name: "OrderConfirmationPage",
  data() {
    return {
      orderId: "", // Mã đơn hàng (giả sử từ API hoặc localStorage)
      order: {
        customer: {
          name: "",
          address: "",
          phone: "",
        },
        items: [],
        total: 0,
      },
    };
  },
  created() {
    // Lấy thông tin đơn hàng từ API hoặc localStorage
    const savedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    if (savedOrder) {
      this.order = savedOrder;
      this.orderId = savedOrder.id;
    } else {
      // alert("Không tìm thấy thông tin đơn hàng.");
      this.$router.push("/");
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    navigateToHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.order-confirmation {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Poppins", sans-serif;
}

h1 {
  font-size: 24px;
  color: #2ecc71;
  margin-bottom: 20px;
}

.order-details, .shipping-info {
  margin-bottom: 20px;
  text-align: left;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

p, ul, li {
  font-size: 14px;
  margin-bottom: 5px;
}

.btn-home {
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-home:hover {
  background-color: #2980b9;
}
</style>
