// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Notification from './components/ComNotification.vue'; // Component Notification

const app = createApp(App);

app.use(store);
app.use(router);

app.component('Notification', Notification); // Đăng ký component Notification

app.mount('#app');
