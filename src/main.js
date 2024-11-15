// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Đảm bảo router được import chính xác

// Tạo ứng dụng Vue và cài đặt router
const app = createApp(App);
app.use(router); // Sử dụng router
app.mount('#app'); // Gắn ứng dụng vào #app trong index.html
