<template>
  <div id="app">
    <!-- Header với nút Giỏ Hàng hiển thị số lượng sản phẩm -->
    <Header :cartItemCount="cartItemCount" @toggle-cart="toggleCartView" />

    <!-- Nội dung của các route với v-slot để truyền props -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          @add-to-cart="addToCart"
          @remove-item="removeItemFromCart"
          @clear-cart="clearCart"
          
        />
      </router-view>
    </main>

    <!-- Footer xuất hiện trên tất cả các trang -->
    <Footer />

    <!-- Hiển thị giỏ hàng khi người dùng nhấn vào nút Giỏ Hàng -->
    <div class="cart-overlay" v-if="showCart" @click="toggleCartView"></div>
    <ComCartView 
      v-if="showCart" 
      :cart="cart" 
      @remove-item="removeItemFromCart" 
      @clear-cart="clearCart" 
      @close-cart="toggleCartView"
      class="com-cart-view"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Header from './components/compo/ComHeader.vue';
import Footer from './components/compo/ComFooter.vue';
import ComCartView from './components/compo/ComCartView.vue';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    ComCartView,
    
  },

  setup() {
    // Quản lý trạng thái giỏ hàng cục bộ
    const cart = ref([]);
    const showCart = ref(false);

    // Tính toán số lượng sản phẩm trong giỏ hàng
    const cartItemCount = computed(() => cart.value.length);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = (product) => {
      cart.value.push(product);
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeItemFromCart = (product) => {
      const index = cart.value.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        cart.value.splice(index, 1);
      }
    };

    // Xóa toàn bộ giỏ hàng
    const clearCart = () => {
      cart.value = [];
    };

    // Hiển thị hoặc ẩn giỏ hàng
    const toggleCartView = () => {
      showCart.value = !showCart.value;
    };

    return {
      cart,
      cartItemCount,
      showCart,
      toggleCartView,
      addToCart,
      removeItemFromCart,
      clearCart,
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
</style>
