// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';

// Hàm kiểm tra xác thực người dùng
export function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

/**
 * Kiểm tra xem người dùng có phải là admin hay không.
 * @returns {boolean} Trạng thái quyền admin.
 */
export function isAdmin() {
  return localStorage.getItem('userRole') === 'admin';
}

// Định nghĩa các route của ứng dụng với Lazy Loading
const routes = [
  { 
    path: '/', 
    component: () => import('../pages/HomePage.vue'), 
    name: 'Home' 
  },

  {
    path: '/accessories',
    component: () => import('../pages/Accessories.vue'),
    name: 'Accessories'
  }, 
  { 
    path: '/luxury-watches', 
    component: () => import('../pages/LuxuryWatches.vue'), 
    name: 'Luxury-Watches' 
  },
  { 
    path: '/smartwatches', 
    component: () => import('../pages/Smartwatches.vue'), 
    name: 'Smart-Watches' 
  },  // Trang chủ
  { 
    path: '/products', 
    component: () => import('../pages/ProductListPage.vue'), 
    name: 'ProductList' 
  },  // Danh sách sản phẩm
  { 
    path: '/product/:id', 
    component: () => import('../pages/ProductDetail.vue'), 
    name: 'ProductDetail', 
    props: true 
  },  // Chi tiết sản phẩm
  { 
    path: '/cart', 
    component: () => import('../pages/CartPage.vue'), 
    name: 'Cart' 
  },  // Giỏ hàng
  { 
    path: '/checkout', 
    component: () => import('../pages/CheckoutPage.vue'), 
    name: 'Checkout' 
  },  // Thanh toán
  { 
    path: '/order-history', 
    component: () => import('../pages/OrderHistory.vue'), 
    name: 'OrderHistory',
    meta: { requiresAuth: true },  // Chỉ cho phép người dùng đã đăng nhập truy cập
  },
  { 
    path: '/profile', 
    component: () => import('../pages/UserProfile.vue'), 
    name: 'UserProfile',
    meta: { requiresAuth: true },  // Chỉ cho phép người dùng đã đăng nhập truy cập
  },

  { 
    path: '/login', 
    component: () => import('../pages/LoginPage.vue'), 
    name: 'Login' 
  },  // Trang đăng nhập

  {
    path: "/account",
    component: () => import("../pages/AccountPage.vue"),
    name: "Account",
    meta: { requiresAuth: true },
  },
  
  { 
    path: '/register', 
    component: () => import('../pages/RegisterPage.vue'), 
    name: 'Register' 
  },  // Trang đăng ký
  { 
    path: '/contact', 
    component: () => import('../pages/ContactPage.vue'), 
    name: 'Contact' 
  },  // Trang liên hệ
  { 
    path: '/about', 
    component: () => import('../pages/AboutPage.vue'), 
    name: 'About' 
  },  // Trang giới thiệu
  { 
    path: '/terms', 
    component: () => import('../pages/TermsPage.vue'), 
    name: 'Terms' 
  },  // Điều khoản dịch vụ
  { 
    path: '/privacy-policy', 
    component: () => import('../pages/PrivacyPolicyPage.vue'), 
    name: 'PrivacyPolicy' 
  },  // Chính sách bảo mật
  { 
    path: '/blog', 
    component: () => import('../pages/BlogListPage.vue'), 
    name: 'BlogList' 
  },  // Danh sách blog
  { 
    path: '/blog/:id', 
    component: () => import('../pages/BlogDetailPage.vue'), 
    name: 'BlogDetail', 
    props: true 
  },  // Chi tiết bài viết blog
  { 
    path: '/search', 
    component: () => import('../pages/SearchResultsPage.vue'), 
    name: 'SearchResults' 
  },  // Trang kết quả tìm kiếm
  { 
    path: '/:catchAll(.*)', 
    component: () => import('../pages/NotFoundPage.vue'), 
    name: 'NotFound' 
  }  // Trang 404 cho các đường dẫn không tồn tại
];

// Tạo router với các route đã định nghĩa
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard cho xác thực
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.name);
  console.log('Authenticated:', isAuthenticated());
  console.log('Admin:', isAdmin());

  if (to.meta.requiresAuth && !isAuthenticated()) {
    alert('Bạn cần đăng nhập để truy cập trang này.');
    return next({ name: 'Login' });
  }

  if (to.meta.requiresAdmin && !isAdmin()) {
    alert('Bạn không có quyền truy cập trang này.');
    return next({ name: 'Home' });
  }

  next();
});

export default router;
