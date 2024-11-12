// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.yourdomain.com/api', // URL API chính của backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để thêm token vào header nếu có
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
