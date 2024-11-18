// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; // Import Vuex Store
import emitter from '../plugins/eventBus'; // Import Event Bus

const routes = [
  { 
    path: '/', 
    component: () => import('../pages/HomePage.vue'), 
    name: 'Home' 
  },
  {
    path: '/smartwatches',
    component: () => import('../pages/Smartwatches.vue'),
    name: 'Smartwatches'
  },
  { 
    path: '/luxury-watches', 
    component: () => import('../pages/LuxuryWatches.vue'), 
    name: 'LuxuryWatches' 
  },
  { 
    path: '/accessories', 
    component: () => import('../pages/Accessories.vue'), 
    name: 'Accessories' 
  },
  { 
    path: '/new-products', 
    component: () => import('../pages/NewProducts.vue'), 
    name: 'NewProducts' 
  },
  { 
    path: '/product/:id', 
    component: () => import('../pages/ProductDetail.vue'), 
    name: 'ProductDetail', 
    props: true 
  },
  { 
    path: '/cart', 
    component: () => import('../components/cart/ComCartView.vue'), 
    name: 'Cart' 
  },
  { 
    path: '/checkout', 
    component: () => import('../pages/CheckoutPage.vue'), 
    name: 'Checkout' 
  },
  { 
    path: '/order-history', 
    component: () => import('../pages/OrderHistory.vue'), 
    name: 'OrderHistory',
    meta: { requiresAuth: true },  
  },
  { 
    path: '/profile', 
    component: () => import('../pages/UserProfile.vue'), 
    name: 'UserProfile',
    meta: { requiresAuth: true },  
  },
  { 
    path: '/account',
    component: () => import('../pages/AccountPage.vue'),
    name: 'Account',
    meta: { requiresAuth: true },
  },
  { 
    path: '/login', 
    component: () => import('../pages/LoginPage.vue'), 
    name: 'Login' 
  },
  { 
    path: '/register', 
    component: () => import('../pages/RegisterPage.vue'), 
    name: 'Register' 
  },
  { 
    path: '/contact', 
    component: () => import('../pages/ContactPage.vue'), 
    name: 'Contact' 
  },
  { 
    path: '/about', 
    component: () => import('../pages/AboutPage.vue'), 
    name: 'About' 
  },
  { 
    path: '/terms', 
    component: () => import('../pages/TermsPage.vue'), 
    name: 'Terms' 
  },
  { 
    path: '/privacy-policy', 
    component: () => import('../pages/PrivacyPolicyPage.vue'), 
    name: 'PrivacyPolicy' 
  },
  { 
    path: '/blog', 
    component: () => import('../pages/BlogListPage.vue'), 
    name: 'BlogList' 
  },
  { 
    path: '/blog/:id', 
    component: () => import('../pages/BlogDetailPage.vue'), 
    name: 'BlogDetail', 
    props: true 
  },
  { 
    path: '/search', 
    component: () => import('../pages/SearchResultsPage.vue'), 
    name: 'SearchResults' 
  },
  { 
    path: '/all-products', 
    component: () => import('../pages/AllProducts.vue'), 
    name: 'AllProducts' 
  },
  { 
    path: '/order-confirmation/:orderId', 
    component: () => import('../pages/OrderConfirmation.vue'), 
    name: 'OrderConfirmation', 
    props: true,
    meta: { requiresAuth: true }, 
  },
  { 
    path: '/:catchAll(.*)', 
    component: () => import('../pages/NotFoundPage.vue'), 
    name: 'NotFound' 
  }
];

// Tạo router với các route đã định nghĩa
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard để bảo vệ các route yêu cầu xác thực
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.name);

  const isAuthenticated = store.getters.isAuthenticated;

  console.log('Authenticated:', isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Phát thông báo yêu cầu đăng nhập
    emitter.emit('show-notification', { message: 'Bạn cần đăng nhập để truy cập trang này.', type: 'error' });
    return next({ name: 'Login' });
  }

  // Ngăn người dùng đã đăng nhập truy cập trang "Login" và "Register"
  if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    emitter.emit('show-notification', { message: 'Bạn đã đăng nhập rồi!', type: 'info' });
    return next({ name: 'Account' }); // Hoặc trang nào bạn muốn chuyển hướng
  }

  next();
});

export default router;
