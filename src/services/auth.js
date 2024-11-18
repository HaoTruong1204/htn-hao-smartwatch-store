// src/services/auth.js

/**
 * Kiểm tra xem người dùng đã đăng nhập chưa
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };
  
  /**
   * Kiểm tra xem người dùng có phải là admin không
   * @returns {boolean}
   */
  export const isAdmin = () => {
    return localStorage.getItem('userRole') === 'admin';
  };
  