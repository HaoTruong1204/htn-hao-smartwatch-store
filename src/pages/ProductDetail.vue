<!-- src/pages/ProductDetail.vue -->

<template>
  <div class="product-detail-page">
    <div v-if="loading" class="loading-message">
      Đang tải thông tin sản phẩm...
    </div>
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else class="product-detail-container">
      <div class="product-image-container">
        <img :src="imageUrl" :alt="product.name" class="product-image" />
      </div>
      <div class="product-info">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-price">{{ formatPrice(product.price) }} ₫</p>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-stock"><strong>Tình trạng:</strong> {{ product.status }}</p>
        <p class="product-additional"><strong>Thông tin thêm:</strong> {{ product.additionalInfo }}</p>
        <button
          class="add-to-cart-button"
          @click="addToCart"
          :disabled="product.stock === 0"
          aria-label="Thêm sản phẩm vào giỏ hàng"
        >
          {{ product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchItemById } from '../services/api'; // Sửa lại import từ api.js
import { mapActions } from 'vuex'; // Sử dụng đúng action name

export default {
  name: "ProductDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    // Xử lý URL hình ảnh
    imageUrl() {
      return this.product && this.product.image
        ? this.product.image.startsWith('http')
          ? this.product.image
          : `http://localhost:3000${this.product.image}`
        : 'https://via.placeholder.com/300x300.png?text=No+Image';
    },
  },
  methods: {
    ...mapActions(['addToCart']), // Sử dụng đúng action name từ Vuex store
    async fetchProduct() {
      try {
        const data = await fetchItemById(this.id); // Gọi hàm dịch vụ để lấy dữ liệu sản phẩm
        this.product = data;
      } catch (error) {
        this.error = 'Không thể tải thông tin sản phẩm.';
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      } finally {
        this.loading = false;
      }
    },
    formatPrice(price) {
      // Định dạng giá với dấu phân cách hàng nghìn và thêm đơn vị VNĐ
      return price.toLocaleString('vi-VN');
    },
    addToCart() {
      if (this.product && this.product.stock > 0) {
        this.addToCart(this.product);
        alert(`Đã thêm "${this.product.name}" vào giỏ hàng!`);
      }
    },
  },
  mounted() {
    this.fetchProduct(); // Gọi API khi trang được tải
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

.product-detail-page {
  font-family: var(--font-family);
  background-color: var(--background-color);
  padding: 20px;
}

.product-detail-container {
  display: flex;
  flex-direction: row;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.product-image-container {
  flex: 1;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-name {
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
}

.product-price {
  font-size: 1.5rem;
  color: var(--secondary-color);
  margin: 0;
}

.product-description {
  font-size: 1rem;
  color: var(--text-color);
}

.product-stock,
.product-additional {
  font-size: 1rem;
  color: var(--text-color);
}

.add-to-cart-button {
  padding: 12px 20px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color var(--transition-speed);
}

.add-to-cart-button:hover {
  background-color: var(--hover-color);
}

.add-to-cart-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-detail-container {
    flex-direction: column;
    align-items: center;
  }

  .product-info {
    width: 100%;
  }
}
</style>
