<template>
  <div class="product-detail-page">
    <!-- Hiển thị chi tiết sản phẩm -->
    <ProductDetail :product="product" v-if="product" />
    <!-- Nếu không tìm thấy sản phẩm, hiển thị thông báo -->
    <p v-else>Sản phẩm không tồn tại.</p>
  </div>
</template>

<script>
// Import component hiển thị chi tiết sản phẩm
import ProductDetail from "../components/product/ProductDetail.vue";
// Import hàm để lấy sản phẩm từ danh sách
import { getItemById } from "../data/item.js";

export default {
  name: "ProductDetailPage",  // Đặt tên cho component
  components: { ProductDetail },
  data() {
    return {
      // Lấy sản phẩm theo ID từ URL tham số
      product: null, // Mặc định là null
    };
  },
  created() {
    // Gọi hàm lấy sản phẩm khi component được tạo ra
    const productId = this.$route.params.id;
    this.product = getItemById(Number(productId)); // Đảm bảo ID là số
  },
};
</script>

<style scoped>
.product-detail-page {
  padding: 20px;
  background-color: #f9f9f9;
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Điều chỉnh padding cho các màn hình nhỏ */
@media (max-width: 768px) {
  .product-detail-page {
    padding: 16px;
  }
}
</style>
