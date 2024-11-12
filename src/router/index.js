// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';

// Import các component của các trang
import Home from '../pages/HomePage.vue';
import ProductList from '../pages/ProductListPage.vue';
import ProductDetail from '../pages/ProductDetail.vue';
import Cart from '../pages/CartPage.vue';
import Checkout from '../pages/CheckoutPage.vue';
import OrderHistory from '../pages/OrderHistory.vue';
import UserProfile from '../pages/UserProfile.vue';
import AdminDashboard from '../pages/AdminDashboard.vue';
import Login from '../pages/LoginPage.vue';

// Hàm kiểm tra xác thực người dùng
function isAuthenticated() {
  // Kiểm tra nếu có token xác thực trong localStorage
  return !!localStorage.getItem('authToken');
}

// Hàm kiểm tra quyền admin
function isAdmin() {
  // Kiểm tra quyền user có phải là admin trong localStorage
  return localStorage.getItem('userRole') === 'admin';
}

// Định nghĩa các route của ứng dụng
const routes = [
  { path: '/', component: Home, name: 'Home' },  // Trang chủ
  { path: '/products', component: ProductList, name: 'ProductList' },  // Danh sách sản phẩm
  { path: '/product/:id', component: ProductDetail, name: 'ProductDetail', props: true },  // Chi tiết sản phẩm
  { path: '/cart', component: Cart, name: 'Cart' },  // Giỏ hàng
  { path: '/checkout', component: Checkout, name: 'Checkout' },  // Thanh toán
  { 
    path: '/order-history', 
    component: OrderHistory, 
    name: 'OrderHistory',
    meta: { requiresAuth: true },  // Chỉ cho phép người dùng đã đăng nhập truy cập
  },
  { 
    path: '/profile', 
    component: UserProfile, 
    name: 'UserProfile',
    meta: { requiresAuth: true },  // Chỉ cho phép người dùng đã đăng nhập truy cập
  },
  { 
    path: '/admin', 
    component: AdminDashboard, 
    name: 'AdminDashboard',
    meta: { requiresAuth: true, requiresAdmin: true }, // Chỉ cho phép người dùng admin truy cập
  },
  { path: '/login', component: Login, name: 'Login' },  // Trang đăng nhập
  { path: '/:catchAll(.*)', redirect: '/' }  // Điều hướng về trang chủ khi không có route nào trùng khớp
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
    return next({ name: 'Login' });
  }

  // Kiểm tra nếu route yêu cầu quyền admin nhưng người dùng không phải admin
  if (to.meta.requiresAdmin && !isAdmin()) {
    // Nếu cần quyền admin và không phải admin, chuyển hướng tới trang chủ
    return next({ name: 'Home' });
  }

  // Tiếp tục đến route nếu không có vấn đề gì
  next();
});

export default router;
