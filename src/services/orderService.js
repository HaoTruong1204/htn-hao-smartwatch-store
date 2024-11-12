// src/services/orderService.js
import apiClient from './apiClient';

export function createOrder(orderData) {
    return apiClient.post('/orders', orderData);
}

export function getOrderHistory() {
    return apiClient.get('/orders/history');
}

export function getOrderById(id) {
    return apiClient.get(`/orders/${id}`);
}
