<template>
  <div class="home-page">
    <h1>Chào mừng đến với cửa hàng HTN HAO</h1>

    <!-- Phần sản phẩm nổi bật -->
    <section class="featured-products">
      <h2>Sản phẩm nổi bật</h2>
      <div class="product-list">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- Tất cả sản phẩm với điều khiển phân trang -->
    <section class="all-products">
      <h2>Tất cả sản phẩm</h2>
      <div class="product-list">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Điều khiển phân trang -->
      <div class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from "../components/product/ProductCard.vue";
import { items } from "../data/item.js";

export default {
  name: "HomePage",
  components: { ProductCard },
  data() {
    return {
      featuredProducts: items.slice(0, 5), // Hiển thị 4 sản phẩm nổi bật đầu tiên
      products: items.slice(4), // Các sản phẩm còn lại để phân trang
      currentPage: 1,
      itemsPerPage: 10, // Số sản phẩm trên mỗi trang
    };
  },
  computed: {
    // Tổng số trang dựa vào số sản phẩm và số sản phẩm trên mỗi trang
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    // Tính toán các sản phẩm hiển thị trên trang hiện tại
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
  },
  methods: {
    // Phương thức thay đổi trang khi người dùng bấm nút phân trang
    changePage(page) {
      this.currentPage = page;
      window.scrollTo(0, 0); // Cuộn về đầu trang khi chuyển trang
    },
  },
};
</script>

<style scoped>
.home-page {
  padding: 20px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  background-color: #f4f6f9;
  margin-top: 60px;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
  text-transform: uppercase;
}

/* Phần sản phẩm nổi bật */
.featured-products, .all-products {
  margin-bottom: 40px;
}

.featured-products h2, .all-products h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Phân trang */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
}

.pagination button {
  padding: 8px 12px;
  font-size: 1rem;
  color: #2c3e50;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination button.active {
  background-color: #2a9d8f;
  color: white;
  font-weight: bold;
}

.pagination button:hover {
  background-color: #d3d3d3;
}

/* Responsive design cho các màn hình nhỏ */
@media (max-width: 768px) {
  .product-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
