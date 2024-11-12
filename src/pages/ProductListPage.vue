<template>
  <div class="product-list-page">
    <h1>Chào mừng đến với cửa hàng HTN HAO</h1>
    
    <!-- Component lọc sản phẩm -->
    <ProductFilter @filter="applyFilter" />

    <!-- Hiển thị danh sách sản phẩm sau khi lọc -->
    <div class="products">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script>
// Import các component con
import ProductCard from "../components/product/ProductCard.vue";
import ProductFilter from "../components/product/ProductFilter.vue";
// Import dữ liệu sản phẩm từ item.js
import { items } from "../data/item.js";

export default {
  name: "ProductListPage",
  components: { ProductCard, ProductFilter },
  data() {
    return {
      products: items, // Danh sách sản phẩm ban đầu từ items.js
      filteredProducts: items, // Sản phẩm sau khi lọc
    };
  },
  methods: {
    // Phương thức thêm sản phẩm vào giỏ hàng
    addToCart(product) {
      this.$emit("add-to-cart", product); // Truyền sự kiện lên component cha (App.vue)
    },

    // Phương thức áp dụng bộ lọc
    applyFilter(filters) {
      this.filteredProducts = this.products.filter((product) => {
        // Kiểm tra theo danh mục
        const categoryMatch =
          !filters.category || product.category === filters.category;

        // Kiểm tra theo giá
        const priceMatch =
          !filters.price ||
          (filters.price === "0-1000000" && product.price < 1000000) ||
          (filters.price === "1000000-5000000" &&
            product.price >= 1000000 &&
            product.price <= 5000000) ||
          (filters.price === "5000000" && product.price > 5000000);

        // Trả về true nếu cả hai điều kiện đều thỏa mãn
        return categoryMatch && priceMatch;
      });
    },
  },
};
</script>

<style scoped>
.product-list-page {
  padding: 16px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
}

.products {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding-top: 20px;
}

/* Điều chỉnh cho các màn hình nhỏ hơn */
@media (max-width: 768px) {
  .products {
    grid-template-columns: 1fr 1fr; /* 2 cột trên màn hình nhỏ */
  }
}
</style>
