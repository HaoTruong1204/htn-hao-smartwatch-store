<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal" aria-label="Đóng modal">&times;</button>
      <div class="modal-body">
        <!-- Hình ảnh sản phẩm -->
        <div class="modal-image-container">
          <img :src="imageUrl" :alt="product.name" class="modal-image" />
        </div>

        <!-- Thông tin chi tiết sản phẩm -->
        <div class="modal-info">
          <h2 class="modal-product-name">{{ product.name }}</h2>
          <p class="modal-product-description">{{ product.description }}</p>
          <p class="modal-product-price">{{ formatPrice(product.price) }} ₫</p>
          <p class="modal-product-stock">
            <strong>Tình trạng:</strong> {{ product.status }}
          </p>
          <p class="modal-product-additional">
            <strong>Thông tin thêm:</strong> {{ product.additionalInfo }}
          </p>
          <button class="modal-add-to-cart-button" @click="addToCart">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductModal",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return this.product.image.startsWith('http')
        ? this.product.image
        : this.product.image.startsWith('/')
          ? this.product.image
          : '/' + this.product.image;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    addToCart() {
      this.$emit("add-to-cart", this.product);
      this.closeModal();
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    },
  },
};
</script>
<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* Đảm bảo z-index cao hơn footer và các thành phần khác */
  overflow-y: auto; /* Cho phép cuộn nội dung nếu modal quá lớn */
}

/* Modal Content */
.modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  position: relative;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
  max-height: 90vh; /* Đảm bảo modal không vượt quá chiều cao của viewport */
  overflow-y: auto; /* Cho phép cuộn nội dung trong modal nếu cần */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Close Button */
.close-button {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999999;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #333333;
}

/* Modal Body */
.modal-body {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
}

.modal-image-container {
  flex: 1 1 300px;
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.modal-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.modal-info {
  flex: 2 1 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-product-name {
  font-size: 1.8rem;
  color: #333333;
  margin-bottom: 10px;
  font-weight: 700;
}

.modal-product-description {
  font-size: 1rem;
  color: #555555;
  margin-bottom: 15px;
}

.modal-product-price {
  font-size: 1.2rem;
  color: #ff5722;
  margin-bottom: 10px;
  font-weight: 600;
}

.modal-product-stock,
.modal-product-additional {
  font-size: 1rem;
  color: #333333;
  margin-bottom: 10px;
}

.modal-add-to-cart-button {
  background-color: #28a745;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  align-self: flex-start;
}

.modal-add-to-cart-button:hover {
  background-color: #218838;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-body {
    flex-direction: column;
    align-items: center;
  }

  .modal-image-container {
    max-width: 100%;
  }

  .modal-info {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-product-name {
    font-size: 1.5rem;
  }

  .modal-product-description,
  .modal-product-price,
  .modal-product-stock,
  .modal-product-additional {
    font-size: 0.95rem;
  }

  .modal-add-to-cart-button {
    width: 100%;
    text-align: center;
  }
}
</style>
