// src/services/authService.js
import apiClient from './apiClient';

export function login(credentials) {
    return apiClient.post('/auth/login', credentials);
}

export function register(data) {
    return apiClient.post('/auth/register', data);
}

export function logout() {
    localStorage.removeItem('authToken');
    // Có thể thêm các thao tác liên quan đến đăng xuất khác tại đây
}
