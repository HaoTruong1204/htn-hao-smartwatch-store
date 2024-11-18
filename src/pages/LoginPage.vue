<!-- src/pages/LoginPage.vue -->

<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Đăng Nhập</h2>
      <form @submit.prevent="handleLogin" novalidate>
        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <i class="fas fa-envelope"></i>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Nhập email"
              required
              @input="validateEmail"
              :class="{ 'is-invalid': emailError }"
            />
          </div>
          <transition name="fade">
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </transition>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <div class="input-wrapper">
            <i class="fas fa-lock"></i>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Nhập mật khẩu"
              required
              @input="validatePassword"
              :class="{ 'is-invalid': passwordError }"
            />
            <i
              class="toggle-password fas"
              :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              @click="togglePasswordVisibility"
              title="Hiển thị/Ẩn mật khẩu"
            ></i>
          </div>
          <transition name="fade">
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </transition>
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading">
            <i class="fas fa-spinner fa-spin"></i> Đang đăng nhập...
          </span>
          <span v-else>Đăng Nhập</span>
        </button>

        <!-- Register Link -->
        <p class="register-link">
          Chưa có tài khoản? <router-link to="/register">Đăng Ký Ngay</router-link>
        </p>

        <!-- Error Message -->
        <transition name="fade">
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </transition>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import emitter from '../plugins/eventBus'; // Import Event Bus nếu cần

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      errorMessage: "",
      emailError: "",
      passwordError: "",
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['login', 'showNotification']),
    validateEmail() {
      if (!this.email) {
        this.emailError = "Email là bắt buộc.";
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.emailError = "Email không hợp lệ.";
      } else {
        this.emailError = "";
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = "Mật khẩu là bắt buộc.";
      } else if (this.password.length < 6) {
        this.passwordError = "Mật khẩu tối thiểu 6 ký tự.";
      } else {
        this.passwordError = "";
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleLogin() {
      this.validateEmail();
      this.validatePassword();

      if (this.emailError || this.passwordError) {
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      // Giả định thời gian xử lý đăng nhập
      setTimeout(() => {
        try {
          // Lấy danh sách người dùng từ localStorage
          const users = JSON.parse(localStorage.getItem("users")) || [];

          // Tìm người dùng theo email
          const user = users.find(
            (u) => u.email.toLowerCase() === this.email.toLowerCase()
          );

          if (user && user.password === this.password) {
            // Gọi action login từ Vuex Store
            this.login(user);

            localStorage.setItem('currentUser', JSON.stringify(user));

            // Phát thông báo thành công
            this.showNotification({ message: `Chào mừng, ${user.name}!`, type: 'success' });

            // Chuyển hướng người dùng đến trang chủ
            // this.$router.push({ name: "Home" });
            window.location.href = '/';
          } else {
            this.errorMessage = "Email hoặc mật khẩu không chính xác.";
            // Phát thông báo lỗi
            this.showNotification({ message: "Email hoặc mật khẩu không chính xác.", type: 'error' });
          }
        } catch (error) {
          this.errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
          console.error("Login Error:", error);
          // Phát thông báo lỗi
          this.showNotification({ message: "Đã xảy ra lỗi. Vui lòng thử lại.", type: 'error' });
        } finally {
          this.isLoading = false;
        }
      }, 1000); // Giả lập thời gian xử lý 1 giây
    },
  },
  mounted() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (this.isAuthenticated) {
      this.$router.push({ name: "Home" });
      this.showNotification({ message: "Bạn đã đăng nhập rồi!", type: 'info' });
    }
  },
};
</script>
<style scoped>
/* Tổng thể trang đăng nhập */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #74ebd5, #acb6e5); /* Gradient màu xanh dương nhẹ nhàng */
  font-family: 'Poppins', sans-serif; /* Font chữ sang trọng */
  padding: 20px;
}

/* Container chính */
.login-container {
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Đổ bóng nhẹ */
  max-width: 450px;
  width: 100%;
  text-align: center;
  animation: fadeInUp 0.8s ease;
}

/* Hiệu ứng xuất hiện */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tiêu đề */
h2 {
  font-size: 28px;
  font-weight: 700;
  color: #003366; /* Màu xanh đậm sang trọng */
  margin-bottom: 25px;
}

/* Form group */
.form-group {
  margin-bottom: 20px;
  position: relative;
  text-align: left;
}

/* Label */
label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

/* Input */
input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: 0.3s;
  background-color: #f8fafc; /* Nền trắng nhẹ */
  color: #333;
}

/* Hiệu ứng khi focus */
input:focus {
  border-color: #74ebd5; /* Màu xanh gradient */
  box-shadow: 0 4px 12px rgba(116, 235, 213, 0.3); /* Đổ bóng tinh tế */
  outline: none;
}

/* Input khi có lỗi */
input.is-invalid {
  border-color: #e74c3c; /* Màu đỏ lỗi */
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
}

/* Toggle mật khẩu */
.toggle-password {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #bbb;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #555;
}

/* Lỗi */
.error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  animation: fadeIn 0.3s ease;
}

/* Nút đăng nhập */
button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #74ebd5, #acb6e5); /* Màu gradient nút */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

/* Hiệu ứng hover nút */
button:hover {
  background: linear-gradient(135deg, #6bd2c1, #a5b6e0); /* Gradient đậm hơn */
  transform: translateY(-2px);
}

/* Nút khi disabled */
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Link đến trang đăng ký */
.register-link {
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}

.register-link a {
  color: #74ebd5;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #acb6e5;
  text-decoration: underline;
}

/* Thông báo lỗi */
.error-message {
  margin-top: 15px;
  padding: 12px 16px;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid #e74c3c;
  color: #e74c3c;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}

/* Hiệu ứng cho thông báo */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
