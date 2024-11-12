// src/main.js
import './assets/styles/main.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Đảm bảo router được import chính xác
import store from './store';     // Đảm bảo store được import chính xác
import './assets/styles/main.css';


// Tạo ứng dụng Vue và cài đặt router và store
const app = createApp(App);
app.use(router); // Sử dụng router
app.use(store);  // Sử dụng Vuex store
app.mount('#app'); // Gắn ứng dụng vào #app trong index.html
