<template>
  <div class="product-detail">
    <img :src="product.image" alt="Product Image" class="product-image" />
    <div class="product-info">
      <h1 class="product-name">{{ product.name }}</h1>
      <p class="product-price">{{ formatCurrency(product.price) }}</p>
      <p class="product-description">{{ product.description }}</p>
      <button @click="addToCart(product)" class="add-to-cart-button">Thêm vào giỏ hàng</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', product);
    },
  },
};
</script>

<style scoped>
/* Container for the product details */
.product-detail {
  display: flex;
  gap: 24px;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Product image styling */
.product-image {
  width: 300px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

/* Product info container */
.product-info {
  max-width: 600px;
  flex: 1;
}

/* Product name styling */
.product-name {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 12px;
  font-weight: 700;
}

/* Product price styling */
.product-price {
  font-size: 1.25rem;
  color: #27ae60;
  margin-bottom: 12px;
  font-weight: 600;
}

/* Product description styling */
.product-description {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* Add to cart button styling */
.add-to-cart-button {
  padding: 10px 20px;
  background-color: #2a9d8f; /* Teal color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.3s;
}

.add-to-cart-button:hover {
  background-color: #21867a; /* Darker teal */
  transform: scale(1.05);
}

.add-to-cart-button:active {
  transform: scale(0.95);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .product-detail {
    flex-direction: column;
    padding: 16px;
  }
  .product-image {
    width: 100%;
    height: 250px;
  }
  .product-info {
    margin-top: 20px;
  }
}
</style>
