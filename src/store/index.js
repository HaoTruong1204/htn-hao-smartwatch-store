// src/store/index.js
import { reactive } from 'vue';

const store = reactive({
  // Global state
  user: null, // Thông tin người dùng
  isLoggedIn: false, // Trạng thái đăng nhập

  // Actions
  login(user) {
    this.user = user;
    this.isLoggedIn = true;
    localStorage.setItem('authToken', 'example-token'); // Giả lập token
  },
  logout() {
    this.user = null;
    this.isLoggedIn = false;
    localStorage.removeItem('authToken');
  },
});

export default store;
