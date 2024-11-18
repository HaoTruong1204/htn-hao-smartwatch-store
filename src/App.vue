<!-- src/App.vue -->

<template>
  <div id="app">
    <!-- Header với nút Giỏ Hàng hiển thị số lượng sản phẩm -->
    <Header :cartItemCount="cartItemCount" @toggle-cart="toggleCartView" />

    <p style="margin-bottom: 50px;"> </p>

    <!-- Nội dung của các route với v-slot để truyền props -->
    <main class="main-content">
    <router-view v-slot="{ Component }">
  <component
    v-if="Component"
    :is="Component"
    @add-to-cart="addToCart"
    @remove-item="removeItemFromCart"
    @clear-cart="clearCart"
    @update-quantity="updateQuantity"
    @navigate="handleNavigate"
  />
</router-view>

    </main>

    <!-- Footer xuất hiện trên tất cả các trang -->
    <Footer />

    <!-- Hiển thị giỏ hàng khi người dùng nhấn vào nút Giỏ Hàng hoặc khi thêm sản phẩm -->
    <div class="cart-overlay" v-if="showCart" @click.self="toggleCartView"></div>
    <ComCartView 
      v-if="showCart" 
      :cart="cartItems" 
      :cartTotal="cartTotal"
      @remove-item="removeItemFromCart" 
      @clear-cart="clearCart" 
      @update-quantity="updateQuantity"
      @close-cart="toggleCartView"
      @navigate="handleNavigate"
      class="com-cart-view"
    />

    <!-- Component Notification -->
    <Notification ref="notification" />
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Header from './components/compo/ComHeader.vue';
import Footer from './components/compo/ComFooter.vue';
import ComCartView from './components/cart/ComCartView.vue';
import Notification from './components/Notification.vue';
import emitter from './plugins/eventBus'; // Giả sử bạn đã cài đặt Event Bus

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ComCartView,
    Notification,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // Quản lý trạng thái hiển thị giỏ hàng
    const showCart = ref(false);

    // Lấy số lượng sản phẩm trong giỏ hàng từ Vuex
    const cartItemCount = computed(() => store.getters.cartItemCount);

    // Lấy danh sách sản phẩm trong giỏ hàng từ Vuex
    const cartItems = computed(() => store.getters.cart);

    // Lấy tổng giá trị giỏ hàng từ Vuex
    const cartTotal = computed(() => store.getters.cartTotal);

    // Thêm sản phẩm vào giỏ hàng thông qua Vuex và hiển thị giỏ hàng
    const addToCart = (product) => {
      store.dispatch('addToCart', product);
      // Hiển thị thông báo (giả sử bạn có Notification component)
      emitter.emit('show-notification', { message: `Đã thêm "${product.name}" vào giỏ hàng!`, type: 'success' });
      // Hiển thị giỏ hàng khi thêm sản phẩm
      showCart.value = true;
    };

    // Xóa sản phẩm khỏi giỏ hàng thông qua Vuex
    const removeItemFromCart = (productId) => {
      store.dispatch('removeFromCart', productId);
      emitter.emit('show-notification', { message: 'Đã xóa sản phẩm khỏi giỏ hàng.', type: 'info' });
    };

    // Xóa toàn bộ giỏ hàng thông qua Vuex
    const clearCart = () => {
      store.dispatch('clearCart');
      emitter.emit('show-notification', { message: 'Giỏ hàng đã được xóa.', type: 'info' });
    };

    // Cập nhật số lượng sản phẩm trong giỏ hàng thông qua Vuex
    const updateQuantity = ({ itemId, quantity }) => {
      if (quantity < 1) {
        quantity = 1;
      }
      store.dispatch('updateCartQuantity', { itemId, quantity });
      const item = store.state.cart.find(item => item.id === itemId);
      const itemName = item ? item.name : '';
      emitter.emit('show-notification', { message: `Đã cập nhật số lượng "${itemName}" thành ${quantity}.`, type: 'info' });
    };

    // Hiển thị hoặc ẩn giỏ hàng
    const toggleCartView = () => {
      showCart.value = !showCart.value;
    };

    // Xử lý điều hướng từ các component con
    const handleNavigate = (route) => {
      router.push(`/${route}`);
    };

    // Quản lý thông báo
    const notification = ref(null);

    const handleNotification = ({ message, type }) => {
      if (notification.value) {
        notification.value.show(message, type);
      }
    };

    onMounted(() => {
      emitter.on('show-notification', handleNotification);
    });

    onUnmounted(() => {
      emitter.off('show-notification', handleNotification);
    });

    return {
      showCart,
      cartItemCount,
      cartItems,
      cartTotal,
      addToCart,
      removeItemFromCart,
      clearCart,
      updateQuantity,
      toggleCartView,
      handleNavigate,
      notification,
    };
  },
};
</script>

<style scoped>
/* CSS Variables for Consistent Styling */
:root {
  --primary-color: #003366;
  --secondary-color: #ffcc00;
  --hover-color: #ffd54f;
  --text-color: #ffffff;
  --background-color: #f5f5f5;
  --overlay-color: rgba(0, 0, 0, 0.5);
  --cart-width: 350px;
  --transition-speed: 0.3s;
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Reset some basic styles */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--font-family);
  background-color: var(--background-color);
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Cart Overlay */
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--overlay-color);
  z-index: 999;
  transition: opacity var(--transition-speed);
}

/* Giỏ hàng sidebar */
.com-cart-view {
  position: fixed;
  top: 0;
  right: 0;
  width: var(--cart-width);
  height: 100%;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;
  transition: transform var(--transition-speed);
}

/* Responsive Design for Cart */
@media (max-width: 768px) {
  .com-cart-view {
    width: 80%;
  }
}

@media (max-width: 576px) {
  .com-cart-view {
    width: 100%;
  }
}

/* Notification Styles */
/* Giả sử bạn có CSS cho Notification component */
</style>
