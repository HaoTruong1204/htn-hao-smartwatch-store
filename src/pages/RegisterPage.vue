<template>
    <div class="page register-page">
      <h1>Đăng Ký</h1>
      <form @submit.prevent="register">
        <input type="text" placeholder="Tên đăng nhập" v-model="username" required />
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Mật khẩu" v-model="password" required />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    data() {
      return {
        username: '',
        email: '',
        password: ''
      };
    },
    methods: {
      register() {
        alert("Đăng ký thành công!");
      }
    }
  }
  </script>
  
  <style scoped>
  .page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  input, button {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
  }
  button {
    background-color: #003366;
    color: #fff;
    cursor: pointer;
  }
  button:hover {
    background-color: #002244;
  }
  </style>
  