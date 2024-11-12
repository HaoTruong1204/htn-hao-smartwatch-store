<template>
    <div class="product-card">
      <!-- Hình ảnh sản phẩm -->
      <img :src="product.image" alt="Product Image" class="product-image" />
  
      <!-- Tên sản phẩm -->
      <h2 class="product-name">{{ product.name }}</h2>
  
      <!-- Giá sản phẩm -->
      <p class="product-price">{{ formatPrice(product.price) }} ₫</p>
  
      <!-- Nút thêm vào giỏ hàng -->
      <button class="add-to-cart-button" @click="addToCart">Thêm vào giỏ hàng</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductCard",
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    methods: {
      addToCart() {
        // Truyền sự kiện "add-to-cart" kèm theo dữ liệu sản phẩm lên component cha
        this.$emit("add-to-cart", this.product);
      },
      formatPrice(price) {
        // Định dạng giá với dấu phân cách hàng nghìn
        return price.toLocaleString();  // Ví dụ: 1,000,000
      },
    },
  };
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .product-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .product-name {
    font-size: 18px;
    margin: 10px 0;
    color: #333;
    font-weight: 600;
  }
  
  .product-price {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }
  
  .add-to-cart-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    font-size: 16px;
    font-weight: 600;
  }
  
  .add-to-cart-button:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
  
  .add-to-cart-button:active {
    background-color: #1e7e34;
    transform: scale(0.95);
  }
  </style>
  