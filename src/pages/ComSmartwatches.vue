<template>
  <div class="smartwatches-page">
    <!-- Header Section -->
    <header class="smartwatches-header">
      <h1 class="smartwatches-title">Đồng Hồ Thông Minh</h1>
      <input
        type="text"
        v-model="searchQuery"
        @input="filterProducts"
        placeholder="Tìm kiếm đồng hồ thông minh..."
        class="search-input"
        aria-label="Tìm kiếm đồng hồ thông minh"
      />
    </header>

    <!-- Products List Section -->
    <section class="smartwatches-section">
      <div class="products-list">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
          @product-clicked="openModal"
        />
      </div>

      <!-- Pagination Controls -->
      <div class="pagination-controls" aria-label="Phân trang">
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
          :class="{ 'active': currentPage === page }"
          class="pagination-button"
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

    <!-- Modal sản phẩm -->
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="addToCart"
    />

    <!-- Loading and Error Messages -->
    <div v-if="loading" class="loading-message">
      Đang tải đồng hồ thông minh...
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // Sử dụng mapActions từ Vuex
import ProductCard from "../components/ComProductCard.vue";
import ProductModal from "../components/product/ComProductModal.vue";

export default {
  name: "Smartwatches",
  components: { ProductCard, ProductModal },
  data() {
    return {
      products: [
        {
          id: 44,
          name: "Đồng Hồ Gucci Dive 45mm",
          description: "Đồng hồ sang trọng và bền bỉ, phù hợp cho các dịp đặc biệt.",
          price: 35000000,
          image: "/images/watches/gucci-dive-45mm.png",
          stock: 8,
        },
        {
          id: 45,
          name: "Đồng Hồ Fossil Gen 6",
          description: "Đồng hồ thông minh với các tính năng sức khỏe hiện đại.",
          price: 7500000,
          image: "/images/watches/fossil-gen6.png",
          stock: 15,
        },
        {
          id: 46,
          name: "Apple Watch Series 9",
          description: "Thiết kế hiện đại và hiệu năng vượt trội với chip S9.",
          price: 10990000,
          image: "/images/watches/apple-watch-series-9.png",
          stock: 25,
        },
        {
          id: 47,
          name: "Samsung Galaxy Watch 6",
          description: "Thiết kế đột phá với thời lượng pin kéo dài.",
          price: 8990000,
          image: "/images/watches/samsung-galaxy-watch-6.png",
          stock: 20,
        },
      ],
      filteredProducts: [],
      selectedProduct: null,
      currentPage: 1,
      itemsPerPage: 8,
      searchQuery: "",
      loading: false,
      error: null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
  },
  methods: {
    ...mapActions(['addToCart']),  // Kết nối action 'addToCart' từ Vuex

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$nextTick(() => {
          this.scrollToTop();
        });
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);  // Thêm sản phẩm vào giỏ hàng thông qua Vuex
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`); // Thông báo cho người dùng
    },
    openModal(product) {
      this.selectedProduct = product;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.selectedProduct = null;
      document.body.classList.remove("modal-open");
    },
    filterProducts() {
      if (!this.searchQuery.trim()) {
        this.filteredProducts = this.products;
      } else {
        const query = this.searchQuery.trim().toLowerCase();
        this.filteredProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(query)
        );
      }
      this.currentPage = 1;
    },
  },
  mounted() {
    this.filteredProducts = this.products;
  },
};
</script>

<style scoped>
:root {
  --primary-color: #003366;
  --secondary-color: #ffcc00;
  --background-color: #f4f6f9;
  --text-color: #333333;
  --font-family: "Roboto", sans-serif;
  --transition-speed: 0.3s;
}

.smartwatches-page {
  font-family: var(--font-family);
  background-color: var(--background-color);
  padding: 20px;
}

.smartwatches-header {
  text-align: center;
  margin-bottom: 40px;
}

.smartwatches-title {
  font-size: 2.5rem;
  color: var(--primary-color);
  font-weight: 700;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  margin-top: 20px;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 6px;
  transition: border-color var(--transition-speed);
}

.search-input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 8px;
}

.pagination-button {
  padding: 8px 12px;
  font-size: 1rem;
  color: var(--primary-color);
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color var(--transition-speed), color var(--transition-speed);
}

.pagination-button.active {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
}

.pagination-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-color);
  margin-top: 20px;
}
</style>
