<template>
    <div class="account-page">
      <div class="account-container">
        <h2>Tài Khoản Của Tôi</h2>
  
        <div v-if="user">
          <div class="account-info">
            <h3>Thông Tin Cá Nhân</h3>
            <p><strong>Họ và Tên:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Số Điện Thoại:</strong> {{ user.phone || 'Chưa cập nhật' }}</p>
          </div>
  
          <button @click="handleLogout" class="logout-button">Đăng Xuất</button>
        </div>
  
        <div v-else>
          <p>Bạn cần đăng nhập để xem thông tin tài khoản.</p>
          <router-link to="/login" class="login-link">Đăng Nhập</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AccountPage",
    data() {
      return {
        user: null,
      };
    },
    async created() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Người dùng chưa đăng nhập");
  
        const response = await axios.get("/api/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          this.user = response.data;
        }
      } catch (error) {
        console.error(error);
        this.user = null;
      }
    },
    methods: {
      handleLogout() {
        localStorage.removeItem("authToken");
        this.user = null;
        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>
  .account-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: #f5f7fa;
  }
  
  .account-container {
    background-color: #ffffff;
    padding: 40px 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  h2 {
    text-align: center;
    color: #003366;
  }
  
  .account-info {
    margin-top: 20px;
  }
  
  .account-info p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .logout-button {
    display: block;
    margin: 20px auto 0;
    padding: 10px 20px;
    background-color: #e74c3c;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .logout-button:hover {
    background-color: #c0392b;
  }
  
  .login-link {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #003366;
    text-decoration: none;
    font-weight: bold;
  }
  
  .login-link:hover {
    text-decoration: underline;
  }
  </style>
  