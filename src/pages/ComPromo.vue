<template>
  <div class="promo-page">
    <!-- Header Section -->
    <header class="promo-header">
      <h1 class="promo-title">Sản Phẩm Khuyến Mãi</h1>
      <input
        type="text"
        v-model="searchQuery"
        @input="filterProducts"
        placeholder="Tìm kiếm sản phẩm khuyến mãi..."
        class="search-input"
        aria-label="Tìm kiếm sản phẩm khuyến mãi"
      />
    </header>

    <!-- Products List Section -->
    <section class="promo-section">
      <div class="products-list">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="product-card"
          @click="openModal(product)"
        >
          <!-- Discount Badge -->
          <div class="discount-badge">-{{ product.discount }}%</div>
          <!-- Product Image -->
          <img :src="product.image" :alt="product.name" class="product-image" />
          <!-- Product Info -->
          <div class="product-info">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">
              <span class="original-price">{{ formatCurrency(product.originalPrice) }}</span>
              <span class="discounted-price">{{ formatCurrency(product.discountedPrice) }}</span>
            </p>
            <button @click.stop="addToCart(product)" class="add-to-cart-button">Thêm vào giỏ hàng</button>
          </div>
        </div>
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
      Đang tải sản phẩm khuyến mãi...
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ProductModal from "../components/product/ComProductModal.vue";

export default {
  name: "PromoPage",
  components: { ProductModal },
  data() {
    return {
      products: [
        {
          id: 48,
          name: "Đồng Hồ Apple Watch SE (2024)",
          description: "Phiên bản mới nhất với các tính năng sức khỏe được nâng cấp.",
          originalPrice: 8500000,
          discountedPrice: 7500000,
          discount: 12,
          image: "/images/watches/apple-watch-se-2024.png",
          stock: 20,
        },
        
        {
          id: 49,
          name: "Đồng Hồ Samsung Galaxy Watch 6 Classic",
          description: "Thiết kế cổ điển, hiệu năng mạnh mẽ với thời lượng pin dài.",
          originalPrice: 11500000,
          discountedPrice: 10500000,
          discount: 9,
          image: "/images/watches/galaxy-watch-6-classic.png",
          stock: 15,
        },
        {
          id: 50,
          name: "Phụ Kiện Đế Sạc Không Dây Samsung",
          description: "Đế sạc không dây mới, hỗ trợ sạc nhanh và tiện dụng.",
          originalPrice: 1800000,
          discountedPrice: 1500000,
          discount: 17,
          image: "/images/accessories/samsung-wireless-charger.png",
          stock: 50,
        },
        // Các sản phẩm khác ở đây
      ],
      searchQuery: "",
      filteredProducts: [],
      selectedProduct: null,
      currentPage: 1,
      itemsPerPage: 6,
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
      return this.filteredProducts.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions(['addToCart']),  // Sử dụng mapActions để gọi action từ store

    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    filterProducts() {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.currentPage = 1;
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
    addToCart(product) {
      // Gọi action của Vuex để thêm sản phẩm vào giỏ hàng
      this.$store.dispatch('addToCart', product);
    },
  },
  mounted() {
    this.filteredProducts = this.products;
  },
};
</script>



<style scoped>
.promo-page {
  font-family: "Roboto", sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
}

.promo-header {
  text-align: center;
  margin-bottom: 30px;
}

.promo-title {
  font-size: 2.5rem;
  color: #2c3e50;
  font-weight: bold;
}

.search-input {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  position: relative;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff3b3b;
  color: white;
  padding: 5px 10px;
  font-size: 0.9rem;
  border-radius: 50px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
  text-align: center;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.1rem;
  font-weight: bold;
}

.original-price {
  text-decoration: line-through;
  margin-right: 10px;
  color: #999;
}

.discounted-price {
  color: #007bff;
}

.add-to-cart-button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #218838;
}

.pagination-controls {
  text-align: center;
  margin-top: 20px;
}

.pagination-button {
  padding: 10px 15px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}

.pagination-button.active {
  font-weight: bold;
}

.pagination-button:disabled {
  background: #ddd;
  cursor: not-allowed;
}
</style>

