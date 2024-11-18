<template>
    <div class="orders-page">
      <h1>Đơn hàng của tôi</h1>
      <div v-if="orders.length > 0">
        <ul class="orders-list">
          <li v-for="order in orders" :key="order.id" class="order-item">
            <h3>Mã đơn hàng: {{ order.id }}</h3>
            <p>Tổng tiền: {{ formatCurrency(order.total) }}</p>
            <p>Trạng thái: <span :class="statusClass(order.status)">{{ order.status }}</span></p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Bạn chưa có đơn hàng nào.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    computed: {
      ...mapGetters("orders", ["allOrders"]),
      orders() {
        return this.allOrders;
      },
    },
    mounted() {
      this.$store.dispatch("orders/fetchOrders");
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
      },
      statusClass(status) {
        switch (status) {
          case "Đang xử lý":
            return "status-pending";
          case "Đã giao":
            return "status-completed";
          case "Hủy":
            return "status-cancelled";
          default:
            return "";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .orders-page {
    padding: 20px;
  }
  
  .orders-list {
    list-style: none;
    padding: 0;
  }
  
  .order-item {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }
  
  .order-item h3 {
    margin: 0 0 5px;
    color: #003366;
  }
  
  .order-item p {
    margin: 5px 0;
  }
  
  .status-pending {
    color: orange;
  }
  
  .status-completed {
    color: green;
  }
  
  .status-cancelled {
    color: red;
  }
  </style>
  