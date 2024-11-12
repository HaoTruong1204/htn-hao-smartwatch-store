<template>
    <div class="admin-order-list">
      <h1>Danh sách đơn hàng</h1>
      <table>
        <thead>
          <tr>
            <th>Mã Đơn Hàng</th>
            <th>Khách Hàng</th>
            <th>Ngày Đặt</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.status }}</td>
            <td>
              <button @click="updateStatus(order.id)">Cập nhật trạng thái</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [], // Danh sách đơn hàng sẽ được lấy từ API
      };
    },
    methods: {
      fetchOrders() {
        // Giả lập API, thay thế bằng gọi API thật khi triển khai
        this.orders = [
          { id: 'ORD001', customerName: 'Nguyễn Văn A', date: '2024-01-01', status: 'Đang xử lý' },
          { id: 'ORD002', customerName: 'Trần Thị B', date: '2024-01-02', status: 'Hoàn thành' },
        ];
      },
      updateStatus(orderId) {
        // Hàm cập nhật trạng thái đơn hàng
        console.log(`Cập nhật trạng thái cho đơn hàng ${orderId}`);
      },
    },
    created() {
      this.fetchOrders();
    },
  };
  </script>
  
  <style scoped>
  .admin-order-list {
    padding: 16px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    border: 1px solid #ddd;
  }
  th {
    background-color: #f4f4f9;
  }
  </style>
  