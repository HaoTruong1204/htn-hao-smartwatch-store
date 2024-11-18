<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar">
      <div class="navbar-container">
        <router-link to="/" class="logo">HTN Store</router-link>
        <ul class="nav-list">
          <li><router-link to="/">Trang Chủ</router-link></li>
          <li><router-link to="/new-products">Sản Phẩm Mới</router-link></li>
          <li><router-link to="/smartwatches">Đồng Hồ Thông Minh</router-link></li>
          <li><router-link to="/luxury-watches">Đồng Hồ Cao Cấp</router-link></li>
          <li><router-link to="/accessories">Phụ Kiện</router-link></li>
          <li><router-link to="/all-products">Tất Cả Sản Phẩm</router-link></li>
          <li><router-link to="/blog">Blog</router-link></li>
          <li><router-link to="/contact">Liên Hệ</router-link></li>
          <!-- Thêm các liên kết khác nếu cần -->
        </ul>
        <div class="auth-links">
          <router-link to="/login">Đăng Nhập</router-link>
          <router-link to="/register">Đăng Ký</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
  };
  </script>
  
  <style scoped>
  :root {
    --primary-color: #003366;
    --secondary-color: #ffcc00;
    --text-color: #ffffff;
    --hover-color: #ffd54f;
    --font-family: 'Roboto', sans-serif;
  }
  
  .navbar {
    background-color: var(--primary-color);
    padding: 10px 20px;
  }
  
  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo {
    color: var(--text-color);
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }
  
  .nav-list {
    list-style: none;
    display: flex;
    gap: 20px;
  }
  
  .nav-list li a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .nav-list li a:hover {
    color: var(--hover-color);
  }
  
  .auth-links a {
    color: var(--text-color);
    text-decoration: none;
    margin-left: 15px;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .auth-links a:hover {
    color: var(--hover-color);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .navbar-container {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .nav-list {
      flex-direction: column;
      width: 100%;
    }
  
    .nav-list li {
      width: 100%;
    }
  
    .nav-list li a {
      display: block;
      padding: 10px 0;
    }
  
    .auth-links {
      margin-top: 10px;
    }
  }
  </style>
  