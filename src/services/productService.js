// src/services/productService.js

import axios from './axios'; // Sử dụng axios được cấu hình trước đó

/**
 * Lấy danh sách tất cả sản phẩm
 * @returns {Promise<Array>} - Trả về mảng sản phẩm
 */
export const fetchAllProducts = async () => {
  try {
    const response = await axios.get('/all-products'); // Gọi API tới endpoint /all-products
    return response.data; // Trả về dữ liệu JSON từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tất cả sản phẩm:', error);
    throw error; // Ném lỗi ra ngoài để component xử lý
  }
};

/**
 * Lấy danh sách đồng hồ thông minh
 * @returns {Promise<Array>} - Trả về mảng đồng hồ thông minh
 */
export const fetchSmartwatches = async () => {
  try {
    const response = await axios.get('/smartwatches'); // Gọi API tới endpoint /smartwatches
    return response.data; // Trả về dữ liệu JSON từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đồng hồ thông minh:', error);
    throw error; // Ném lỗi ra ngoài để component xử lý
  }
};

/**
 * Lấy danh sách đồng hồ cao cấp
 * @returns {Promise<Array>} - Trả về mảng đồng hồ cao cấp
 */
export const fetchLuxuryWatches = async () => {
  try {
    const response = await axios.get('/luxury-watches'); // Gọi API tới endpoint /luxury-watches
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đồng hồ cao cấp:', error);
    throw error;
  }
};

/**
 * Lấy danh sách phụ kiện
 * @returns {Promise<Array>} - Trả về mảng phụ kiện
 */
export const fetchAccessories = async () => {
  try {
    const response = await axios.get('/accessories'); // Gọi API tới endpoint /accessories
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phụ kiện:', error);
    throw error;
  }
};

/**
 * Lấy danh sách sản phẩm mới
 * @returns {Promise<Array>} - Trả về mảng sản phẩm mới
 */
export const fetchNewProducts = async () => {
  try {
    const response = await axios.get('/new-products'); // Gọi API tới endpoint /new-products
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm mới:', error);
    throw error;
  }
};

/**
 * Lấy thông tin chi tiết của một sản phẩm dựa trên ID
 * @param {number} id - ID của sản phẩm
 * @returns {Promise<Object>} - Trả về đối tượng sản phẩm
 */
export const fetchProductById = async (id) => {
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
 * @param {Object} product - Dữ liệu sản phẩm mới
 * @returns {Promise<Object>} - Trả về đối tượng sản phẩm đã được thêm
 */
export const addProduct = async (product) => {
  try {
    const response = await axios.post('/items', product); // Gửi dữ liệu sản phẩm mới tới API
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm mới:', error);
    throw error;
  }
};

/**
 * Cập nhật một sản phẩm dựa trên ID
 * @param {number} id - ID của sản phẩm cần cập nhật
 * @param {Object} updatedProduct - Dữ liệu cập nhật của sản phẩm
 * @returns {Promise<Object>} - Trả về đối tượng sản phẩm đã được cập nhật
 */
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`/items/${id}`, updatedProduct); // Cập nhật dữ liệu sản phẩm
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật sản phẩm với id ${id}:`, error);
    throw error;
  }
};

/**
 * Xóa một sản phẩm dựa trên ID
 * @param {number} id - ID của sản phẩm cần xóa
 * @returns {Promise<Object>} - Trả về kết quả sau khi xóa
 */
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/items/${id}`); // Xóa sản phẩm
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa sản phẩm với id ${id}:`, error);
    throw error;
  }
};
