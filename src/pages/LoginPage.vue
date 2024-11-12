<template>
  <div class="login-page">
    <h1>Đăng nhập</h1>
    
    <form @submit.prevent="login">
      <!-- Trường nhập Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Nhập email của bạn"
          required
        />
      </div>

      <!-- Trường nhập Mật khẩu -->
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Nhập mật khẩu"
          required
        />
      </div>

      <!-- Nút đăng nhập -->
      <button type="submit" class="submit-btn">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Giả lập đăng nhập thành công
      alert("Đăng nhập thành công!");
      // Thực hiện logic gửi yêu cầu đăng nhập tới server tại đây
    },
  },
};
</script>

<style scoped>
.login-page {
  padding: 20px;
  background-color: #f4f6f9;
  font-family: 'Roboto', sans-serif;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
}

.form-group {
  margin-bottom: 20px;
}

form label {
  font-size: 1rem;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  margin-bottom: 10px;
}

input:focus {
  border-color: #2a9d8f;
  box-shadow: 0 0 5px rgba(42, 157, 143, 0.3);
}

button {
  background-color: #2a9d8f;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #21867a;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .login-page {
    padding: 16px;
  }

  button {
    font-size: 1rem;
  }
}
</style>
