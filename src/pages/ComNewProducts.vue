<template>
  <div class="new-products-page">
    <!-- Header Section -->
    <header class="new-products-header">
      <h1 class="new-products-title">Sản Phẩm Mới</h1>
      <input
        type="text"
        v-model="searchQuery"
        @input="filterProducts"
        placeholder="Tìm kiếm sản phẩm mới..."
        class="search-input"
        aria-label="Tìm kiếm sản phẩm mới"
      />
    </header>

    <!-- Products List Section -->
    <section class="new-products-section">
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
      Đang tải sản phẩm mới...
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ComProductCard.vue";
import ProductModal from "../components/product/ComProductModal.vue";
import { mapActions } from 'vuex';  // Import mapActions để dùng trong addToCart

export default {
  name: "NewProducts",
  components: { ProductCard, ProductModal },
  data() {
    return {
      products: [
        {
          id: 48,
          name: "Đồng Hồ Apple Watch SE (2024)",
          description: "Phiên bản mới nhất với các tính năng sức khỏe được nâng cấp.",
          price: 7500000,
          image: "/images/watches/apple-watch-se-2024.png",
          stock: 20,
        },
        {
          id: 49,
          name: "Đồng Hồ Samsung Galaxy Watch 6 Classic",
          description: "Thiết kế cổ điển, hiệu năng mạnh mẽ với thời lượng pin dài.",
          price: 10500000,
          image: "/images/watches/galaxy-watch-6-classic.png",
          stock: 15,
        },
        {
          id: 53,
          name: "Đồng Hồ Fitbit Versa 4",
          description: "Phiên bản mới với nhiều tính năng theo dõi sức khỏe hiện đại.",
          price: 6500000,
          image: "/images/watches/fitbit-versa-4.png",
          stock: 25,
        },
        {
          id: 50,
          name: "Phụ Kiện Đế Sạc Không Dây Samsung",
          description: "Đế sạc không dây mới, hỗ trợ sạc nhanh và tiện dụng.",
          price: 1500000,
          image: "/images/accessories/samsung-wireless-charger.png",
          stock: 50,
        },
        // thêm các sản phẩm khác ở đây
      ],
      filteredProducts: [],
      selectedProduct: null,
      currentPage: 1,
      itemsPerPage: 6,
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
    ...mapActions(['addToCart']), // Dùng mapActions để gọi action addToCart từ store

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

.new-products-page {
  font-family: var(--font-family);
  background-color: var(--background-color);
  padding: 20px;
}

.new-products-header {
  text-align: center;
  margin-bottom: 40px;
}

.new-products-title {
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
