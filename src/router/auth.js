// src/router/auth.js

/**
 * Kiểm tra xem người dùng đã được xác thực hay chưa.
 * @returns {boolean} Trạng thái xác thực.
 */
export function isAuthenticated() {
    // Kiểm tra nếu có token xác thực trong localStorage
    return !!localStorage.getItem('authToken');
  }
  
  /**
   * Kiểm tra xem người dùng có phải là admin hay không.
   * @returns {boolean} Trạng thái quyền admin.
   */
  export function isAdmin() {
    // Kiểm tra quyền user có phải là admin trong localStorage
    return localStorage.getItem('userRole') === 'admin';
  }
  