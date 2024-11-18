<template>
    <div class="order-history">
      <h1>Lịch sử đơn hàng</h1>
      
      <!-- Hiển thị các đơn hàng -->
      <div v-for="order in orders" :key="order.id" class="order">
        <h3>Đơn hàng #{{ order.id }}</h3>
        <p><strong>Ngày đặt:</strong> {{ order.date }}</p>
        <p><strong>Trạng thái:</strong> {{ order.status }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [
          { id: 1, date: "2023-10-01", status: "Đang xử lý" },
          { id: 2, date: "2023-10-15", status: "Đã giao" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .order-history {
    padding: 20px;
    background-color: #f4f6f9;
    font-family: 'Roboto', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 20px;
    font-weight: 700;
    text-align: center;
  }
  
  .order {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 12px;
    transition: box-shadow 0.3s ease;
  }
  
  .order:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .order h3 {
    font-size: 1.5rem;
    color: #2a9d8f;
  }
  
  .order p {
    font-size: 1rem;
    color: #333;
  }
  
  strong {
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    .order-history {
      padding: 16px;
    }
  
    h1 {
      font-size: 1.75rem;
    }
    
    .order h3 {
      font-size: 1.25rem;
    }
  }
  </style>
  