<template>
  <div id="app">
    <!-- Header với nút Giỏ Hàng hiển thị số lượng sản phẩm -->
    <Header :cartItemCount="cartItemCount" @toggle-cart="toggleCartView" />

    <!-- Nội dung của các route -->
    <div class="main-content">
      <router-view 
        :cart="cart" 
        @add-to-cart="addToCart" 
        @remove-item="removeItemFromCart" 
        @clear-cart="clearCart" 
      />
    </div>

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
    />
  </div>
</template>

<script>
import Header from './components/ComHeader.vue';
import Footer from './components/ComFooter.vue';
import ComCartView from './components/ComCartView.vue';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    ComCartView,
  },

  data() {
    return {
      cart: [],
      showCart: false,
    };
  },

  computed: {
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },

  methods: {
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeItemFromCart(product) {
      this.cart = this.cart.filter(item => item.id !== product.id);
    },
    clearCart() {
      this.cart = [];
    },
    toggleCartView() {
      this.showCart = !this.showCart;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-content {
  padding-bottom: 80px;
}

/* Footer Fixed */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}

/* Overlay cho giỏ hàng */
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
}

/* Giỏ hàng sidebar */
.cart-view {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  z-index: 10;
}
</style>
