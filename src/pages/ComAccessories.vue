<template>
  <div class="accessories-page">
    <!-- Header Section -->
    <header class="accessories-header">
      <h1 class="accessories-title">Phụ Kiện Đồng Hồ</h1>
      <input
        type="text"
        v-model="searchQuery"
        @input="filterProducts"
        placeholder="Tìm kiếm phụ kiện đồng hồ..."
        class="search-input"
        aria-label="Tìm kiếm phụ kiện đồng hồ"
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
      Đang tải phụ kiện đồng hồ...
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // Sử dụng mapActions để kết nối Vuex
import ProductCard from "../components/ComProductCard.vue";
import ProductModal from "../components/product/ComProductModal.vue";

export default {
  name: "Accessories",
  components: { ProductCard, ProductModal },
  data() {
    return {
      products: [
        {
          id: 30,
          name: "Phụ Kiện Bộ Bảo Dưỡng Đồng Hồ",
          description: "Bộ dụng cụ chuyên dụng để bảo dưỡng và vệ sinh đồng hồ, giúp đồng hồ luôn hoạt động tốt.",
          price: 2500000,
          image: "/images/accessories/watch-maintenance-kit.png",
          stock: 12,
        },
        {
          id: 32,
          name: "Phụ Kiện Cáp Sạc Nhanh Apple Watch",
          description: "Cáp sạc nhanh cho Apple Watch, hỗ trợ sạc nhanh và tiện dụng.",
          price: 600000,
          image: "/images/accessories/apple-watch-fast-charger.png",
          stock: 25,
        },
        {
          id: 34,
          name: "Phụ Kiện Miếng Dán Bảo Vệ Màn Hình Apple Watch",
          description: "Miếng dán cường lực bảo vệ màn hình Apple Watch, chống trầy xước.",
          price: 200000,
          image: "/images/accessories/apple-watch-screen-protector.png",
          stock: 40,
        },
        {
          id: 38,
          name: "Phụ Kiện Dây Vải NATO Cho Đồng Hồ",
          description: "Dây vải NATO chắc chắn, nhiều màu sắc và kích cỡ.",
          price: 400000,
          image: "/images/accessories/nato-watch-band.png",
          stock: 35,
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
    ...mapActions(['addToCart']),  // Kết nối Vuex action addToCart

    addToCart(product) {
      this.$store.dispatch('addToCart', product);  // Thêm sản phẩm vào giỏ hàng thông qua Vuex
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    },

    changePage(page) {
      this.currentPage = page;
    },

    openModal(product) {
      this.selectedProduct = product;
    },

    closeModal() {
      this.selectedProduct = null;
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
      this.currentPage = 1; // Reset trang khi lọc
    },
  },
  mounted() {
    this.filteredProducts = this.products; // Gán danh sách ban đầu
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
