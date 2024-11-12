// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, isAdmin } from './auth'; // Import các hàm xác thực và quyền admin

// Định nghĩa các route của ứng dụng với Lazy Loading
const routes = [
  { 
    path: '/', 
    component: () => import('../pages/HomePage.vue'), 
    name: 'Home' 
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
    path: '/admin', 
    component: () => import('../pages/AdminDashboard.vue'), 
    name: 'AdminDashboard',
    meta: { requiresAuth: true, requiresAdmin: true }, // Chỉ cho phép người dùng admin truy cập
  },

  { 
    path: '/login', 
    component: () => import('../pages/LoginPage.vue'), 
    name: 'Login' 
  },  // Trang đăng nhập

  { 
    path: '/:catchAll(.*)', 
    redirect: '/' 
  }  // Điều hướng về trang chủ khi không có route nào trùng khớp
];

// Tạo router với các route đã định nghĩa
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard cho xác thực và quyền admin
router.beforeEach((to, from, next) => {
  // Kiểm tra nếu route yêu cầu xác thực nhưng người dùng chưa đăng nhập
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Nếu cần đăng nhập và chưa đăng nhập, chuyển hướng tới trang Login
    alert('Bạn cần đăng nhập để truy cập trang này.');
    return next({ name: 'Login' });
  }

  // Kiểm tra nếu route yêu cầu quyền admin nhưng người dùng không phải admin
  if (to.meta.requiresAdmin && !isAdmin()) {
    // Nếu cần quyền admin và không phải admin, chuyển hướng tới trang chủ
    alert('Bạn không có quyền truy cập trang này.');
    return next({ name: 'Home' });
  }

  // Tiếp tục đến route nếu không có vấn đề gì
  next();
});

export default router;
