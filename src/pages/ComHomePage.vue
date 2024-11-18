<template>
  <div class="home-page">
    <!-- Carousel Banner Section -->
    <section class="home-page__carousel-section">
      <CarouselBanner @navigate="handleNavigate" />
    </section>

    <!-- Featured Products Section -->
    <section class="home-page__featured-products">
      <h2 class="home-page__section-title">Sản phẩm nổi bật</h2>
      <div class="home-page__product-list">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
          @product-clicked="openModal"
        />
      </div>
    </section>

    <!-- All Products Section with Pagination -->
    <section class="home-page__all-products" ref="allProductsSection">
      <h2 class="home-page__section-title">Tất cả sản phẩm</h2>
      <div class="home-page__product-list">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
          @product-clicked="openModal"
        />
      </div>

      <!-- Pagination Controls -->
      <div class="home-page__pagination" aria-label="Phân trang">
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="pagination-button"
          aria-label="Trang trước"
        >
          &laquo;
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="['pagination-button', { 'pagination-button--active': currentPage === page }]"
          :aria-current="currentPage === page ? 'page' : false"
        >
          {{ page }}
        </button>
        <button
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="pagination-button"
          aria-label="Trang sau"
        >
          &raquo;
        </button>
      </div>
    </section>

    <!-- Product Modal -->
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="addToCart"
    />

    <!-- Cart View -->
    <ComCartView
      v-if="isCartVisible"
      :cart="cart"
      :cartTotal="cartTotal"
      @remove-item="removeFromCart"
      @clear-cart="clearCart"
      @close-cart="toggleCart"
    />

    <!-- Loading and Error Messages -->
    <div v-if="loading" class="home-page__loading">
      <span class="loader"></span> Đang tải dữ liệu...
    </div>
    <div v-if="error" class="home-page__error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from "@/services/axios";
import ProductCard from '../components/product/ComProductCard.vue';
import ProductModal from '../components/product/ComProductModal.vue';
import CarouselBanner from '../components/compo/ComCarouselBanner.vue';
import ComCartView from "@/components/cart/ComCartView.vue";

import { useStore } from "vuex";
import { computed, ref, nextTick } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "HomePage",
  components: {
    ProductCard,
    CarouselBanner,
    ProductModal,
    ComCartView,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const featuredProducts = ref([]);
    const products = ref([]);
    const selectedProduct = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = 8;
    const loading = ref(true);
    const error = ref(null);
    const isCartVisible = ref(false);
    const allProductsSection = ref(null);

    const cart = computed(() => store.state.cart);
    const cartTotal = computed(() => store.getters.cartTotal);
    const cartItemCount = computed(() => store.getters.cartItemCount);

    const totalPages = computed(() =>
      Math.ceil(products.value.length / itemsPerPage)
    );

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return products.value.slice(start, end);
    });

    const fetchProducts = async () => {
      try {
        const response = await axios.get("/items");
        products.value = response.data;
        featuredProducts.value = products.value.slice(0, 4);
      } catch (err) {
        error.value = "Không thể tải dữ liệu sản phẩm.";
        console.error("Lỗi khi lấy dữ liệu từ API:", err);
      } finally {
        loading.value = false;
      }
    };

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        nextTick(() => {
          scrollToSection();
        });
      }
    };

    const scrollToSection = () => {
      if (allProductsSection.value) {
        allProductsSection.value.scrollIntoView({ behavior: "smooth" });
      }
    };

    const addToCart = (product) => {
      store.dispatch("addToCart", product);
    };

    const removeFromCart = (productId) => {
      store.dispatch("removeFromCart", productId);
    };

    const clearCart = () => {
      store.dispatch("clearCart");
    };

    const handleNavigate = (route) => {
      router.push(route);
    };

    const openModal = (product) => {
      selectedProduct.value = product;
      document.body.classList.add("modal-open");
    };

    const closeModal = () => {
      selectedProduct.value = null;
      document.body.classList.remove("modal-open");
    };

    const toggleCart = () => {
      isCartVisible.value = !isCartVisible.value;
    };

    fetchProducts();

    return {
      featuredProducts,
      products,
      selectedProduct,
      currentPage,
      totalPages,
      paginatedProducts,
      loading,
      error,
      changePage,
      scrollToSection,
      addToCart,
      removeFromCart,
      clearCart,
      handleNavigate,
      openModal,
      closeModal,
      isCartVisible,
      cart,
      cartTotal,
      cartItemCount,
      toggleCart,
      allProductsSection,
    };
  },
};
</script>

<style scoped>
:root {
  --primary-color: #003366;
  --secondary-color: #ffcc00;
  --hover-color: #ffd54f;
  --text-color: #333333;
  --background-color: #f4f6f9;
  --font-family: 'Roboto', sans-serif;
  --transition-speed: 0.3s;
}

/* Main Layout Adjustments */
.home-page {
  margin-top: 80px; /* Đẩy nội dung xuống dưới header */
  padding: 20px;
  background-color: var(--background-color);
}

/* Carousel Section */
.home-page__carousel-section {
  margin: 20px 0;
  padding: 10px 0;
  text-align: center;
}

.home-page__carousel-section img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Section Titles */
.home-page__section-title {
  font-size: 2.5rem;
  color: var(--primary-color);
  text-align: center;
  margin: 40px 0 20px;
  font-weight: bold;
  text-transform: uppercase;
}

/* Product List */
.home-page__product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Loading and Error Messages */
.home-page__loading,
.home-page__error {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-color);
  margin-top: 20px;
}

.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid var(--primary-color);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Pagination Styling */
.home-page__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 0 20px;
}

.pagination-button {
  padding: 10px 15px;
  background-color: #e0e0e0;
  color: var(--primary-color);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color var(--transition-speed), transform var(--transition-speed);
}

.pagination-button:hover:not(:disabled) {
  background-color: var(--hover-color);
  transform: translateY(-3px);
}

.pagination-button--active {
  background-color: var(--primary-color);
  color: #fff;
  font-weight: bold;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 992px) {
  .home-page__product-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .home-page__section-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .home-page__product-list {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .home-page__section-title {
    font-size: 1.8rem;
  }
}

@media (max-width: 576px) {
  .home-page__product-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .home-page__section-title {
    font-size: 1.5rem;
  }
}
</style>
