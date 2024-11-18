<!-- src/components/UserAccount.vue -->

<template>
    <div class="account-page">
      <h2>Thông Tin Tài Khoản</h2>
      <div class="account-details">
        <p><strong>Tên:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <!-- Thêm các thông tin khác nếu cần -->
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'UserAccount',
    computed: {
      ...mapGetters(['user']),
    },
  };
  </script>
  
  <style scoped>
  .account-page {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    font-family: 'Poppins', sans-serif;
  }
  
  h2 {
    color: #003366;
    margin-bottom: 20px;
  }
  
  .account-details p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  </style>
    