<template>
  <div class="admin-dashboard">
    <h1>Bảng điều khiển Admin</h1>
    
    <!-- Các phần trong bảng điều khiển admin -->
    <div class="dashboard-sections">
      <!-- Quản lý sản phẩm -->
      <section class="dashboard-section">
        <h2>Quản lý sản phẩm</h2>
        <router-link to="/admin/products" class="link-btn">Đi đến quản lý sản phẩm</router-link>
      </section>
      
      <!-- Quản lý đơn hàng -->
      <section class="dashboard-section">
        <h2>Quản lý đơn hàng</h2>
        <router-link to="/admin/orders" class="link-btn">Đi đến quản lý đơn hàng</router-link>
      </section>
      
      <!-- Quản lý người dùng -->
      <section class="dashboard-section">
        <h2>Quản lý người dùng</h2>
        <router-link to="/admin/users" class="link-btn">Đi đến quản lý người dùng</router-link>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  background-color: #f4f6f9;
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
}

.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  padding: 0 20px;
}

.dashboard-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.dashboard-section:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 20px;
}

.link-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #2a9d8f;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;
}

.link-btn:hover {
  background-color: #21867a;
  transform: scale(1.05);
}

.link-btn:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .dashboard-sections {
    grid-template-columns: 1fr;
  }
}
</style>
