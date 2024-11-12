// src/services/cartService.js
import apiClient from './apiClient';

export function getCartItems() {
    return apiClient.get('/cart');
}

export function addToCart(productId, quantity = 1) {
    return apiClient.post('/cart', { productId, quantity });
}

export function updateCartItem(productId, quantity) {
    return apiClient.put(`/cart/${productId}`, { quantity });
}

export function removeCartItem(productId) {
    return apiClient.delete(`/cart/${productId}`);
}

export function clearCart() {
    return apiClient.delete('/cart/clear');
}
