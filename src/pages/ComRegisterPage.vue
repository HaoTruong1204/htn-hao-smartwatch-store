<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Đăng Ký</h2>
      <form @submit.prevent="handleRegister" novalidate>
        <!-- Name Field -->
        <div class="form-group">
          <label for="name">Họ và Tên</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Nhập họ và tên"
            :class="{ 'is-invalid': nameError }"
          />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Nhập email"
            :class="{ 'is-invalid': emailError }"
          />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Nhập mật khẩu"
            :class="{ 'is-invalid': passwordError }"
          />
          <i
            class="toggle-password fas"
            :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
            @click="togglePasswordVisibility"
          ></i>
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <!-- Confirm Password Field -->
        <div class="form-group">
          <label for="confirmPassword">Xác Nhận Mật Khẩu</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Nhập lại mật khẩu"
            :class="{ 'is-invalid': confirmPasswordError }"
          />
          <i
            class="toggle-password fas"
            :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"
            @click="toggleConfirmPasswordVisibility"
          ></i>
          <span v-if="confirmPasswordError" class="error">
            {{ confirmPasswordError }}
          </span>
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="isLoading" class="btn-submit">
          <span v-if="isLoading">
            <i class="fas fa-spinner fa-spin"></i> Đang đăng ký...
          </span>
          <span v-else>Đăng Ký</span>
        </button>

        <!-- Login Link -->
        <p class="login-link">
          Đã có tài khoản? <router-link to="/login">Đăng Nhập Ngay</router-link>
        </p>

        <!-- Error Message -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
      errorMessage: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    validateForm() {
      // Reset errors
      this.nameError = "";
      this.emailError = "";
      this.passwordError = "";
      this.confirmPasswordError = "";

      let isValid = true;

      // Name validation
      if (!this.name.trim()) {
        this.nameError = "Họ và tên là bắt buộc.";
        isValid = false;
      } else if (this.name.length < 3) {
        this.nameError = "Họ và tên tối thiểu 3 ký tự.";
        isValid = false;
      }

      // Email validation
      const emailPattern = /\S+@\S+\.\S+/;
      if (!this.email.trim()) {
        this.emailError = "Email là bắt buộc.";
        isValid = false;
      } else if (!emailPattern.test(this.email)) {
        this.emailError = "Email không hợp lệ.";
        isValid = false;
      }

      // Password validation
      if (!this.password.trim()) {
        this.passwordError = "Mật khẩu là bắt buộc.";
        isValid = false;
      } else if (this.password.length < 6) {
        this.passwordError = "Mật khẩu tối thiểu 6 ký tự.";
        isValid = false;
      }

      // Confirm password validation
      if (!this.confirmPassword.trim()) {
        this.confirmPasswordError = "Xác nhận mật khẩu là bắt buộc.";
        isValid = false;
      } else if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = "Mật khẩu không khớp.";
        isValid = false;
      }

      return isValid;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    handleRegister() {
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";

      try {
        // Simulate saving user data in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find((user) => user.email === this.email);

        if (existingUser) {
          this.errorMessage = "Email đã tồn tại. Vui lòng sử dụng email khác.";
          this.isLoading = false;
          return;
        }

        const newUser = {
          name: this.name,
          email: this.email,
          password: this.password,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Đăng ký thành công! Hãy đăng nhập.");
        this.$router.push({ name: "Login" });
      } catch (error) {
        this.errorMessage = "Đã xảy ra lỗi khi đăng ký.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.register-container {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.is-invalid {
  border-color: #e74c3c;
}

.error {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 5px;
}

.btn-submit {
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.btn-submit:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 20px;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
