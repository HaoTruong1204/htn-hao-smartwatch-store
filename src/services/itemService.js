// src/services/itemService.js

import axios from './axios'; // Import instance axios đã cấu hình

/**
 * Lấy danh sách tất cả các sản phẩm
 * @returns {Promise<Array>} - Trả về một mảng sản phẩm
 */
export const fetchItems = async () => {
  try {
    const response = await axios.get('/items'); // Gọi API tới endpoint /items
    return response.data; // Trả về dữ liệu JSON từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    throw error; // Ném lỗi ra ngoài để component xử lý
  }
};

/**
 * Lấy thông tin chi tiết của một sản phẩm dựa trên ID
 * @param {number|string} id - ID của sản phẩm
 * @returns {Promise<Object>} - Trả về đối tượng sản phẩm
 */
export const fetchItemById = async (id) => {
  try {
    const response = await axios.get(`/items/${id}`); // Gọi API tới endpoint /items/:id
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy sản phẩm với id ${id}:`, error);
    throw error;
  }
};

/**
 * Thêm một sản phẩm mới
 * @param {Object} item - Dữ liệu sản phẩm mới
 * @returns {Promise<Object>} - Trả về đối tượng sản phẩm đã được thêm
 */
export const addItem = async (item) => {
  try {
    const response = await axios.post('/items', item); // Gửi dữ liệu sản phẩm mới tới API
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm mới:', error);
    throw error;
  }
};

/**
 * Cập nhật một sản phẩm dựa trên ID
 * @param {number|string} id - ID của sản phẩm cần cập nhật
 * @param {Object} updatedItem - Dữ liệu cập nhật của sản phẩm
 * @returns {Promise<Object>} - Trả về đối tượng sản phẩm đã được cập nhật
 */
export const updateItem = async (id, updatedItem) => {
  try {
    const response = await axios.put(`/items/${id}`, updatedItem); // Cập nhật dữ liệu sản phẩm
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật sản phẩm với id ${id}:`, error);
    throw error;
  }
};

/**
 * Xóa một sản phẩm dựa trên ID
 * @param {number|string} id - ID của sản phẩm cần xóa
 * @returns {Promise<Object>} - Trả về kết quả sau khi xóa
 */
export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`/items/${id}`); // Xóa sản phẩm
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa sản phẩm với id ${id}:`, error);
    throw error;
  }
};
