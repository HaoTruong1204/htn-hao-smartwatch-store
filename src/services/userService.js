// src/services/userService.js
import apiClient from './apiClient';

export function getUserProfile() {
    return apiClient.get('/user/profile');
}

export function updateUserProfile(profileData) {
    return apiClient.put('/user/profile', profileData);
}

export function changePassword(data) {
    return apiClient.put('/user/change-password', data);
}
