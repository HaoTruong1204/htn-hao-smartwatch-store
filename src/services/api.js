// src/services/api.js

import axios from './axios'; // Sử dụng axios được cấu hình trước đó

// Lấy danh sách tất cả các sản phẩm
export const fetchItems = async () => {
  try {
    const response = await axios.get('/items'); // Sửa '/item' thành '/items'
    return response.data; // Trả về dữ liệu JSON từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    throw error; // Ném lỗi ra ngoài để component xử lý
  }
};

// Lấy thông tin chi tiết của một sản phẩm dựa trên ID
export const fetchItemById = async (id) => {
  try {
    const response = await axios.get(`/items/${id}`); // Sửa '/item' thành '/items'
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy sản phẩm với id ${id}:`, error);
    throw error;
  }
};

// Thêm một sản phẩm mới
export const addItem = async (item) => {
  try {
    const response = await axios.post('/items', item); // Sửa '/item' thành '/items'
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm mới:', error);
    throw error;
  }
};

// Cập nhật một sản phẩm dựa trên ID
export const updateItem = async (id, updatedItem) => {
  try {
    const response = await axios.put(`/items/${id}`, updatedItem); // Sửa '/item' thành '/items'
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật sản phẩm với id ${id}:`, error);
    throw error;
  }
};

// Xóa một sản phẩm dựa trên ID
export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`/items/${id}`); // Sửa '/item' thành '/items'
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa sản phẩm với id ${id}:`, error);
    throw error;
  }
};
