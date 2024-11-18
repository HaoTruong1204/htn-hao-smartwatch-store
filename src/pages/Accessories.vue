<template>
  <div class="accessories-page">
    <!-- Header Section -->
    <header class="accessories-header">
      <h1 class="accessories-title">Phụ Kiện</h1>
      <input
        type="text"
        v-model="searchQuery"
        @input="filterProducts"
        placeholder="Tìm kiếm phụ kiện..."
        class="search-input"
        aria-label="Tìm kiếm phụ kiện"
      />
    </header>

    <!-- Products List Section -->
    <section class="accessories-section">
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
      Đang tải phụ kiện...
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import ProductModal from "../components/product/ProductModal.vue";
import { fetchAccessories } from '../services/productService'; // Import hàm dịch vụ
import { mapActions } from 'vuex'; // Nếu bạn sử dụng Vuex

export default {
  name: "Accessories",
  components: { ProductCard, ProductModal },
  data() {
    return {
      products: [],
      filteredProducts: [],
      selectedProduct: null, // Sản phẩm được chọn để hiển thị trong modal
      currentPage: 1,
      itemsPerPage: 8,
      searchQuery: '',
      loading: true,
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
    ...mapActions(['addProductToCart']), // Nếu bạn sử dụng Vuex
    async fetchAccessoriesData() {
      try {
        const data = await fetchAccessories(); // Gọi hàm dịch vụ để lấy dữ liệu
        this.products = data;
        this.filteredProducts = data;
      } catch (error) {
        this.error = 'Không thể tải dữ liệu phụ kiện.';
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      } finally {
        this.loading = false;
      }
    },
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
        behavior: 'smooth',
      });
    },
    addToCart(product) {
      // Sử dụng Vuex để thêm sản phẩm vào giỏ hàng
      this.addProductToCart(product);
      // Hiển thị thông báo cho người dùng (có thể sử dụng Toast hoặc Snackbar)
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    },
    openModal(product) {
      this.selectedProduct = product;
      document.body.classList.add('modal-open'); // Thêm lớp khi modal mở
    },
    closeModal() {
      this.selectedProduct = null;
      document.body.classList.remove('modal-open'); // Loại bỏ lớp khi modal đóng
    },
    filterProducts() {
      if (this.searchQuery.trim() === '') {
        this.filteredProducts = this.products;
      } else {
        const query = this.searchQuery.trim().toLowerCase();
        this.filteredProducts = this.products.filter(product =>
          product.name.toLowerCase().includes(query)
        );
      }
      this.currentPage = 1; // Reset trang khi lọc
    },
  },
  mounted() {
    this.fetchAccessoriesData(); // Gọi API khi trang được tải
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

.accessories-page {
  font-family: var(--font-family);
  background-color: var(--background-color);
  padding: 20px;
}

.accessories-header {
  text-align: center;
  margin-bottom: 40px;
}

.accessories-title {
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

.accessories-section {
  max-width: 1200px;
  margin: 0 auto;
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

.pagination-button:hover:not(:disabled),
.pagination-button:focus:not(:disabled) {
  background-color: #d3d3d3;
  outline: none;
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-color);
  margin-top: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .accessories-title {
    font-size: 2rem;
  }

  .products-list {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  .pagination-button {
    padding: 6px 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .accessories-title {
    font-size: 1.8rem;
  }

  .products-list {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }

  .pagination-button {
    padding: 5px 8px;
    font-size: 0.8rem;
  }
}

/* Prevent Body Scroll When Modal is Open */
body.modal-open {
  overflow: hidden;
}
</style>
