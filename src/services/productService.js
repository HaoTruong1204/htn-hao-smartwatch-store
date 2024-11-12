// src/services/productService.js
import apiClient from './apiClient';

export function getProducts() {
    return apiClient.get('/products');
}

export function getProductById(id) {
    return apiClient.get(`/products/${id}`);
}

export function createProduct(productData) {
    return apiClient.post('/products', productData);
}

export function updateProduct(id, productData) {
    return apiClient.put(`/products/${id}`, productData);
}

export function deleteProduct(id) {
    return apiClient.delete(`/products/${id}`);
}
