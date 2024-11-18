<!-- src/components/ProfilePage.vue -->

<template>
    <div class="profile-page">
      <h2>Hồ Sơ Cá Nhân</h2>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="name">Tên</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Nhập tên của bạn"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Nhập email của bạn"
            required
            disabled
          />
        </div>
  
        <!-- Thêm các trường khác nếu cần -->
  
        <button type="submit">Cập Nhật</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'ProfilePage',
    data() {
      return {
        name: '',
        email: '',
      };
    },
    computed: {
      ...mapGetters(['user']),
    },
    methods: {
      ...mapActions(['login', 'showNotification']),
      updateProfile() {
        // Trong thực tế, bạn nên cập nhật thông tin người dùng thông qua API
        // Ở đây, chúng ta sẽ cập nhật trực tiếp trong Vuex Store
  
        const updatedUser = {
          ...this.user,
          name: this.name,
          // Cập nhật các trường khác nếu cần
        };
  
        this.login(updatedUser); // Cập nhật thông tin người dùng trong Vuex Store
  
        this.showNotification({ message: 'Cập nhật hồ sơ thành công!', type: 'success' });
      },
    },
    mounted() {
      if (this.user) {
        this.name = this.user.name;
        this.email = this.user.email;
      }
    },
  };
  </script>
  
  <style scoped>
  .profile-page {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    font-family: 'Poppins', sans-serif;
  }
  
  h2 {
    color: #003366;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  input:focus {
    border-color: #74ebd5;
    box-shadow: 0 0 5px rgba(116, 235, 213, 0.3);
    outline: none;
  }
  
  button {
    padding: 12px 20px;
    background-color: #74ebd5;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #6bd2c1;
  }
  </style>
  