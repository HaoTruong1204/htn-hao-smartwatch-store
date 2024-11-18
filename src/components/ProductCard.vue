<!-- src/components/product/ProductCard.vue -->

<template>
  <div class="product-card" @click="handleCardClick">
    <div class="product-image-container">
      <img
        :src="formattedImageUrl"
        :alt="product.name"
        class="product-image"
        @error="handleImageError"
      />
    </div>
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">{{ formatCurrency(product.price) }}</p>
    <button 
      @click.stop="addToCart" 
      class="add-to-cart-button" 
      aria-label="Thêm sản phẩm vào giỏ hàng"
    >
      Thêm vào giỏ hàng
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      validator(value) {
        return (
          (typeof value.id === 'string' || typeof value.id === 'number') &&
          typeof value.name === 'string' &&
          typeof value.price === 'number' &&
          typeof value.image === 'string'
        );
      },
    },
  },
  data() {
    return {
      imageError: false,
    };
  },
  computed: {
    /**
     * Đảm bảo rằng URL hình ảnh hợp lệ.
     * Nếu hình ảnh không tải được, sử dụng hình ảnh placeholder.
     */
    formattedImageUrl() {
      if (this.imageError) {
        // Sử dụng hình ảnh placeholder nếu có lỗi
        return '/images/placeholder.png'; // Đảm bảo bạn có tệp placeholder.png trong public/images/
      }

      if (this.product.image.startsWith('http')) {
        // Nếu URL bắt đầu bằng 'http', sử dụng trực tiếp
        return this.product.image;
      }

      if (this.product.image.startsWith('/')) {
        // Nếu đã bắt đầu bằng '/', sử dụng trực tiếp
        return this.product.image;
      }

      // Nếu không bắt đầu bằng '/' hoặc 'http', thêm '/' vào trước
      return '/' + this.product.image;
    },
  },
  watch: {
    product() {
      this.imageError = false; // Reset khi product thay đổi
    },
  },
  methods: {
    /**
     * Định dạng giá tiền theo chuẩn Việt Nam
     * @param {number} value
     * @returns {string}
     */
    formatCurrency(value) {
      if (typeof value !== 'number') return 'Liên hệ';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value);
    },
    /**
     * Phát sự kiện 'add-to-cart' với sản phẩm hiện tại
     */
    addToCart() {
      console.log('addToCart called');
      this.$emit('add-to-cart', this.product);
    },
    /**
     * Xử lý lỗi khi tải hình ảnh
     */
    handleImageError() {
      this.imageError = true;
    },
    /**
     * Phát sự kiện 'product-clicked' khi người dùng nhấn vào card sản phẩm
     */
    handleCardClick() {
      this.$emit('product-clicked', this.product);
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: box-shadow 0.3s ease;
  background-color: #fff;
  cursor: pointer; /* Thêm con trỏ để chỉ rõ có thể nhấn */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image-container:hover .product-image {
  transform: scale(1.05);
}

.product-name {
  font-size: 1.2rem;
  margin: 12px 0 8px 0;
  color: #333;
  cursor: pointer;
}

.product-price {
  font-size: 1rem;
  color: #ff5722;
  margin-bottom: 16px;
}

.add-to-cart-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 1rem;
}

.add-to-cart-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.add-to-cart-button:focus {
  outline: 2px solid var(--hover-color);
  outline-offset: 2px;
}

@media (max-width: 576px) {
  .product-image-container {
    height: 150px;
  }

  .product-name {
    font-size: 1rem;
  }

  .product-price {
    font-size: 0.9rem;
  }

  .add-to-cart-button {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
}
</style>
