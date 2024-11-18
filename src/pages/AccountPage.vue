<template>
  <div class="account-page">
    <h2>Thông Tin Tài Khoản</h2>

    <!-- Hiển thị thông tin người dùng nếu đã đăng nhập -->
    <div v-if="user" class="account-details">
      <p><strong>Tên:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <!-- Thêm thông tin khác nếu cần -->
      <p><strong>Số điện thoại:</strong> {{ user.phone || "Chưa cập nhật" }}</p>
      <p><strong>Ngày đăng ký:</strong> {{ formatDate(user.createdAt) }}</p>
      <button @click="logoutUser" class="logout-button">Đăng Xuất</button>
    </div>

    <!-- Nếu không tìm thấy thông tin người dùng -->
    <div v-else class="not-logged-in">
      <p>Bạn chưa đăng nhập. Vui lòng <router-link to="/login">Đăng Nhập</router-link>.</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "AccountPage",
  data() {
    return {
      user: null, // Lưu thông tin người dùng đăng nhập
    };
  },
  created() {
    // Lấy thông tin người dùng từ localStorage
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    } else {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      this.$router.push("/login");
    }
  },
  methods: {
    // Định dạng ngày tháng
    formatDate(dateString) {
      if (!dateString) return "Không xác định";
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    // Xử lý đăng xuất
    logoutUser() {
      localStorage.removeItem("currentUser");
      this.user = null;
      this.$router.push("/login");
      alert("Bạn đã đăng xuất thành công!");
    },
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
  text-align: center;
}

h2 {
  color: #003366;
  margin-bottom: 20px;
}

.account-details p {
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 1.5;
}

.logout-button {
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #c0392b;
}

.not-logged-in {
  font-size: 16px;
  line-height: 1.5;
  margin-top: 20px;
}
</style>
