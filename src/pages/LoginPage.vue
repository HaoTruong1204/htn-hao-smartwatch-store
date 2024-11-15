<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Đăng Nhập</h2>
      <form @submit.prevent="handleLogin" novalidate>
        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
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
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <div class="input-wrapper">
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
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
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
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

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
      showPassword: false, // Toggle mật khẩu
    };
  },
  methods: {
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
    async handleLogin() {
      this.validateEmail();
      this.validatePassword();

      if (this.emailError || this.passwordError) {
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      try {
        const response = await axios.post("/api/login", {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          // Lưu token vào localStorage (nếu cần)
          localStorage.setItem("authToken", response.data.token);

          // Điều hướng về trang chủ
          this.$router.push("/");
        } else {
          this.errorMessage = "Email hoặc mật khẩu không chính xác.";
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f5f7fa;
}

.login-container {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-container h2 {
  text-align: center;
  color: #003366;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333333;
  font-weight: 600;
}

.input-wrapper {
  position: relative;
}

.input-wrapper i {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #999999;
}

.form-group input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-size: 16px;
  background-color: #fdfdfd;
}

.form-group input:focus {
  border-color: #ffcc00;
  box-shadow: 0 0 5px rgba(255, 204, 0, 0.5);
  outline: none;
}

.form-group input.is-invalid {
  border-color: #e74c3c;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #999999;
  cursor: pointer;
}

.toggle-password:hover {
  color: #333333;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #ffcc00;
  color: #003366;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #ffd54f;
  transform: translateY(-2px);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  color: #555555;
}

.register-link a {
  color: #ffcc00;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

.error-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  text-align: center;
}
</style>
