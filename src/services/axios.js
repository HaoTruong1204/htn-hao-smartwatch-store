// src/services/api.js

import axios from 'axios';

// Tạo một instance của axios với các cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Đảm bảo cổng đúng với JSON Server
  timeout: 5000, // Thời gian chờ tối đa 5 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để xử lý các request hoặc response nếu cần
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token xác thực vào header nếu cần
    const token = localStorage.getItem('authToken'); // Giả sử bạn lưu token trong localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý lỗi chung cho tất cả các response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bạn có thể thêm xử lý lỗi chung ở đây, ví dụ như redirect tới trang login nếu token hết hạn
    return Promise.reject(error);
  }
);

export default axiosInstance;
