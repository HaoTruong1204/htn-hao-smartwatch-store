<template>
    <nav class="navbar">
      <div class="logo">
        <router-link to="/">HTN HAO Store</router-link>
      </div>
      <ul class="nav-links">
        <li><router-link to="/">Trang chủ</router-link></li>
        <li><router-link to="/products">Sản phẩm</router-link></li>
        <li><router-link to="/cart">Giỏ hàng</router-link></li>
        <li><router-link to="/profile">Tài khoản</router-link></li>
      </ul>
      <CartBadge />
    </nav>
  </template>
  
  <script>
  import CartBadge from './CartBadge.vue';
  
  export default {
    components: { CartBadge },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #264653;
    color: #fff;
  }
  
  .logo a {
    color: #fff;
    font-size: 1.25rem;
    font-weight: 700;
    text-decoration: none;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 16px;
  }
  
  .nav-links a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
  }
  
  .nav-links a:hover {
    text-decoration: underline;
  }
  </style>
  