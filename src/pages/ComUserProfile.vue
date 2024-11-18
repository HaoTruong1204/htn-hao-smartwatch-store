<template>
  <div class="user-profile">
    <h1>Hồ sơ cá nhân</h1>
    <form @submit.prevent="updateProfile">
      <label for="name">Họ tên</label>
      <input type="text" id="name" v-model="name" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <button type="submit">Cập nhật</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Nguyễn Văn A",  // Mặc định tên người dùng
      email: "nguyenvana@example.com",  // Mặc định email
    };
  },
  methods: {
    updateProfile() {
      // Xử lý cập nhật thông tin
      alert("Cập nhật thông tin thành công!");
    },
  },
};
</script>

<style scoped>
.user-profile {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

form label {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

input:focus {
  outline: none;
  border-color: #2a9d8f;
}

button {
  background-color: #2a9d8f;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #218c7a;
}

button:active {
  background-color: #1e7461;
}
</style>
