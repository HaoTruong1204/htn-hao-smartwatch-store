<template>
  <div class="product-list">
    <!-- Bộ lọc sản phẩm -->
    <ProductFilter @filter="applyFilter" />
    
    <!-- Lưới sản phẩm -->
    <div class="products-grid">
      <!-- Hiển thị từng sản phẩm với ProductCard -->
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import ProductFilter from './ProductFilter.vue';

export default {
  components: {
    ProductCard,
    ProductFilter,
  },
  data() {
    return {
      products: [], // Mảng sản phẩm sẽ được lấy từ API hoặc dữ liệu giả lập
      filteredProducts: [],
      filters: {
        category: '',
        price: '',
      },
    };
  },
  methods: {
    // Giả lập dữ liệu sản phẩm hoặc lấy từ API
    fetchProducts() {
      this.products = [
        { id: 1, name: 'Đồng hồ thông minh A', price: 2000000, category: 'Đồng hồ thông minh', image: 'product1.jpg' },
        { id: 2, name: 'Phụ kiện B', price: 500000, category: 'Phụ kiện', image: 'product2.jpg' },
        { id: 3, name: 'Đồng hồ thông minh C', price: 3500000, category: 'Đồng hồ thông minh', image: 'product3.jpg' },
        { id: 4, name: 'Phụ kiện đồng hồ D', price: 700000, category: 'Phụ kiện đồng hồ', image: 'product4.jpg' },
      ];
      this.filteredProducts = this.products; // Ban đầu hiển thị tất cả sản phẩm
    },

    // Áp dụng bộ lọc
    applyFilter(filter) {
      this.filters = filter;
      this.filteredProducts = this.products.filter((product) => {
        return (
          (!this.filters.category || product.category === this.filters.category) &&
          (!this.filters.price ||
            (this.filters.price === '0-1000000' && product.price < 1000000) ||
            (this.filters.price === '1000000-5000000' && product.price >= 1000000 && product.price <= 5000000) ||
            (this.filters.price === '5000000' && product.price > 5000000))
        );
      });
    },
  },

  // Khi component được tạo, tải danh sách sản phẩm
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Tạo lưới tự động */
  gap: 24px;
  margin-top: 20px;
}

/* Tối ưu giao diện cho các thẻ */
.product-card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

/* Điều chỉnh chiều rộng của hình ảnh sản phẩm */
.product-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

/* Phong cách cho nút "Thêm vào giỏ hàng" */
button {
  padding: 10px 20px;
  background-color: #2a9d8f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin-top: 16px;
}

button:hover {
  background-color: #21867a;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

/* Các bộ lọc */
.product-filter {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.filter-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 8px;
  font-weight: 500;
}

select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #34495e;
  cursor: pointer;
  transition: border-color 0.3s;
}

select:focus {
  outline: none;
  border-color: #2a9d8f;
}

@media (max-width: 768px) {
  .product-list {
    padding: 16px;
  }

  .products-grid {
    grid-template-columns: 1fr 1fr; /* Điều chỉnh cho màn hình nhỏ */
  }
}
</style>
