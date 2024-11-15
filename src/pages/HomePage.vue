
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
        />
      </div>
    </section>

    <!-- All Products Section with Pagination -->
    <section class="home-page__all-products">
      <h2 class="home-page__section-title">Tất cả sản phẩm</h2>
      <div class="home-page__product-list">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
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
          :class="{ 'pagination-button--active': currentPage === page }"
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
  </div>
</template>

<script>
import ProductCard from "../components/product/ProductCard.vue";
import CarouselBanner from "../components/compo/CarouselBanner.vue";
// import items from "../data/item.js";
import { items } from "../data/item.js";



export default {
  name: "HomePage",
  components: { ProductCard, CarouselBanner },
  data() {
    return {
      featuredProducts: [],
      products: [],
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    addToCart(product) {
      this.$emit("add-to-cart", product);
    },
    handleNavigate(route) {
      this.$router.push({ name: route });
    },
  },
  created() {
    this.featuredProducts = items.slice(0, 4);
    this.products = items.slice(4);
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

/* Home Page Styling */
.home-page {
  font-family: var(--font-family);
  background-color: var(--background-color);
  padding: 20px 0;
}

/* Carousel Banner Styling */
.home-page__carousel-section {
  margin-bottom: 40px;
}

/* Section Styling */
.home-page__featured-products,
.home-page__all-products {
  margin: 40px 0;
  text-align: center;
}

.home-page__section-title {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 20px;
  font-weight: 700;
}

/* Product List */
.home-page__product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Pagination Styling */
.home-page__pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

.pagination-button--active {
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

/* Responsive Design for Smaller Screens */
@media (max-width: 768px) {
  .home-page__product-list {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .home-page__section-title {
    font-size: 1.5rem;
  }

  .pagination-button {
    padding: 6px 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .home-page__section-title {
    font-size: 1.3rem;
  }

  .pagination-button {
    padding: 5px 8px;
    font-size: 0.8rem;
  }
}
</style>
