<template>
  <div class="luxury-watches-page">
    <!-- Header Section -->
    <header class="luxury-watches-header">
      <h1 class="luxury-watches-title">Đồng Hồ Cao Cấp</h1>
      <input
        type="text"
        v-model="searchQuery"
        @input="filterProducts"
        placeholder="Tìm kiếm đồng hồ cao cấp..."
        class="search-input"
      />
    </header>

    <!-- Products List Section -->
    <section class="luxury-watches-section">
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
      <div class="pagination-controls">
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="pagination-button"
        >
          &laquo;
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{ 'active': currentPage === page }"
          class="pagination-button"
        >
          {{ page }}
        </button>
        <button
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="pagination-button"
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
      Đang tải đồng hồ cao cấp...
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
  name: "LuxuryWatches",
  components: { ProductCard, ProductModal },
  data() {
    return {
      products: [
        {
          id: 29,
          name: "Đồng Hồ Patek Philippe Nautilus",
          description: "Đồng hồ cao cấp với thiết kế độc đáo và tinh xảo, biểu tượng của sự sang trọng.",
          price: 30000000,
          image: "/images/watches/patek-philippe-nautilus.png",
          stock: 2,
        },
        {
          id: 31,
          name: "Đồng Hồ Apple Watch Ultra",
          description: "Phiên bản cao cấp của Apple Watch với nhiều tính năng sức khỏe và thể thao.",
          price: 22000000,
          image: "/images/watches/apple-watch-ultra.png",
          stock: 10,
        },
        {
          id: 33,
          name: "Đồng Hồ Casio Edifice EFR-539",
          description: "Đồng hồ nam với thiết kế mạnh mẽ, nhiều tính năng tiện ích.",
          price: 4200000,
          image: "/images/watches/casio-edifice-efr-539.png",
          stock: 14,
        },
        {
          id: 35,
          name: "Đồng Hồ Orient Bambino Version 5",
          description: "Đồng hồ cơ tự động với thiết kế cổ điển và tinh tế.",
          price: 5000000,
          image: "/images/watches/orient-bambino-v5.png",
          stock: 8,
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

.luxury-watches-page {
  font-family: var(--font-family);
  background-color: var(--background-color);
  padding: 20px;
}

.luxury-watches-header {
  text-align: center;
  margin-bottom: 40px;
}

.luxury-watches-title {
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
