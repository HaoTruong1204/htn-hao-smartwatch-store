// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; // Import Vuex Store
import emitter from '../plugins/eventBus'; // Import Event Bus

const routes = [
  { 
    path: '/', 
    component: () => import('../pages/ComHomePage.vue'), 
    name: 'Home' 
  },
  {
    path: '/smartwatches',
    component: () => import('../pages/ComSmartwatches.vue'),
    name: 'Smartwatches'
  },
  { 
    path: '/luxury-watches', 
    component: () => import('../pages/ComLuxuryWatches.vue'), 
    name: 'LuxuryWatches' 
  },
  { 
    path: '/accessories', 
    component: () => import('../pages/ComAccessories.vue'), 
    name: 'Accessories' 
  },
  { 
    path: '/new-products', 
    component: () => import('../pages/ComNewProducts.vue'), 
    name: 'NewProducts' 
  },
  { 
    path: '/product/:id', 
    component: () => import('../pages/ComProductDetail.vue'), 
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
    component: () => import('../pages/ComCheckoutPage.vue'), 
    name: 'Checkout' 
  },
  { 
    path: '/order-history', 
    component: () => import('../pages/ComOrderHistory.vue'), 
    name: 'OrderHistory',
    meta: { requiresAuth: true },  
  },
  { 
    path: '/profile', 
    component: () => import('../pages/ComUserProfile.vue'), 
    name: 'UserProfile',
    meta: { requiresAuth: true },  
  },
  { 
    path: '/account',
    component: () => import('../pages/ComAccountPage.vue'),
    name: 'Account',
    meta: { requiresAuth: true },
  },
  { 
    path: '/login', 
    component: () => import('../pages/ComLoginPage.vue'), 
    name: 'Login' 
  },
  { 
    path: '/register', 
    component: () => import('../pages/ComRegisterPage.vue'), 
    name: 'Register' 
  },
  { 
    path: '/contact', 
    component: () => import('../pages/ComContactPage.vue'), 
    name: 'Contact' 
  },
  { 
    path: '/about', 
    component: () => import('../pages/ComAboutPage.vue'), 
    name: 'About' 
  },
  { 
    path: '/terms', 
    component: () => import('../pages/ComTermsPage.vue'), 
    name: 'Terms' 
  },
  {
    path: '/privacy-policy',  // Đảm bảo URL đúng
    component: () => import('../pages/ComPrivacyPolicyPage.vue'),  // Đảm bảo đường dẫn đúng với file
    name: 'PrivacyPolicy'  // Đảm bảo tên route đúng
  },
  
  { 
    path: '/blog', 
    component: () => import('../pages/ComBlogListPage.vue'), 
    name: 'BlogList' 
  },
  { 
    path: '/blog/:id', 
    component: () => import('../pages/ComBlogDetailPage.vue'), 
    name: 'BlogDetail', 
    props: true 
  },
  {
    path: '/blogs/:id', // Đường dẫn động với tham số id
    name: 'BlogDetail',
    component: () => import('../pages/ComBlogDetailPage.vue'),
    props: true, // Kích hoạt truyền tham số qua props
  },
  { 
    path: '/search', 
    component: () => import('../pages/ComSearchResultsPage.vue'), 
    name: 'SearchResults' 
  },
  { 
    path: '/all-products', 
    component: () => import('../pages/ComAllProducts.vue'), 
    name: 'AllProducts' 
  },
  { 
    path: '/order-confirmation/:orderId', 
    component: () => import('../pages/ComOrderConfirmation.vue'), 
    name: 'OrderConfirmation', 
    props: true,
    meta: { requiresAuth: true }, 
  },

  {
    path: '/promo',
    name: 'Promo',
    component: () => import('@/pages/ComPromo.vue'),
  },
  
  { 
    path: '/:catchAll(.*)', 
    component: () => import('../pages/ComNotFoundPage.vue'), 
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
