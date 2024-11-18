<template>
    <div class="orders">
      <h2>Danh sách đơn hàng</h2>
      <ul>
        <li v-for="order in orders" :key="order.id">
          Mã đơn hàng: {{ order.id }} - Tổng: {{ formatCurrency(order.total) }} - Trạng thái: {{ order.status }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "OrderList",
    computed: {
      ...mapGetters("orders", ["allOrders"]),
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
      },
    },
  };
  </script>
  
  <style scoped>
  .orders {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h2 {
    color: #003366;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>
  