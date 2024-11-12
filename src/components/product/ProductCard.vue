<template>
  <div class="product-card">
    <img :src="product.image" alt="Product Image" class="product-image" />
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">{{ formatCurrency(product.price) }}</p>
    <button @click="addToCart(product)" class="add-to-cart-button">Thêm vào giỏ hàng</button>
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
      this.$emit('add-to-cart', product);
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 16px;
  text-align: center;
  border-radius: 8px;
  background-color: #fff;
  transition: box-shadow 0.3s, transform 0.3s;
  max-width: 300px;
  margin: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 12px;
}

.product-name {
  font-size: 1.25rem;
  color: #34495e;
  margin: 8px 0;
}

.product-price {
  font-size: 1.1rem;
  color: #27ae60;
  margin-bottom: 12px;
}

.add-to-cart-button {
  padding: 10px 16px;
  background-color: #2a9d8f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.3s;
}

.add-to-cart-button:hover {
  background-color: #21867a;
  transform: scale(1.05);
}

.add-to-cart-button:active {
  transform: scale(0.95);
}
</style>
