<template>
  <div class="product-list">
    <h1>Cửa Hàng Đồng Hồ</h1>
    <div v-if="loading">Đang tải dữ liệu...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else class="products">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p><strong>Giá:</strong> {{ formatPrice(product.price) }}</p>
          <p><strong>Tình trạng:</strong> {{ product.status }}</p>
          <p><strong>Thêm:</strong> {{ product.additionalInfo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      loading: true,
      error: null
    };
  },
  methods: {
    // Hàm định dạng giá thành VNĐ
    formatPrice(value) {
      return value.toLocaleString('vi-VN') + ' VNĐ';
    },
    // Hàm lấy dữ liệu sản phẩm
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/item');
        this.products = response.data;
      } catch (err) {
        this.error = 'Không thể tải dữ liệu sản phẩm.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.product-list {
  padding: 20px;
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 250px;
  margin: 10px;
  padding: 15px;
  box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

h2 {
  font-size: 1.2em;
  margin: 10px 0;
}

p {
  font-size: 0.9em;
  color: #555;
}
</style>
