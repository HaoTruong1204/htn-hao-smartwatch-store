<template>
    <div :class="$style.pageContainer">
      <h1 :class="$style.title">Đồng Hồ Thông Minh</h1>
      <div :class="$style.productGrid">
        <div
          v-for="product in products"
          :key="product.id"
          :class="$style.productCard"
        >
          <img :src="product.image" :alt="product.name" :class="$style.productImage" />
          <h2 :class="$style.productName">{{ product.name }}</h2>
          <p :class="$style.productPrice">{{ formatCurrency(product.price) }}</p>
          <button
            @click="addToCart(product)"
            :class="$style.addToCartButton"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Smart-watches",
    data() {
      return {
        products: [
          {
            id: 1,
            name: "Apple Watch Series 8",
            price: 2000000,
            image: "https://example.com/apple-watch-series-8.jpg",
          },
          {
            id: 2,
            name: "Samsung Galaxy Watch 5",
            price: 7990000,
            image: "https://example.com/galaxy-watch-5.jpg",
          },
          {
            id: 3,
            name: "Garmin Venu 2",
            price: 12990000,
            image: "https://example.com/garmin-venu-2.jpg",
          },
          {
            id: 4,
            name: "Fitbit Versa 4",
            price: 5490000,
            image: "https://example.com/fitbit-versa-4.jpg",
          },
        ],
      };
    },
    methods: {
      formatCurrency(amount) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount);
      },
      addToCart(product) {
        alert(`Đã thêm "${product.name}" vào giỏ hàng.`);
        // Logic thêm vào giỏ hàng
        this.$emit("add-to-cart", product);
      },
    },
  };
  </script>
  
  <style module>
  .pageContainer {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }
  
  .productGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .productCard {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .productCard:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  .productImage {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
  }
  
  .productName {
    font-size: 1.2rem;
    font-weight: bold;
    color: #555;
    margin: 10px;
    text-align: center;
  }
  
  .productPrice {
    font-size: 1rem;
    color: #ff5722;
    margin: 0 10px 10px;
    text-align: center;
  }
  
  .addToCartButton {
    display: block;
    margin: 10px auto 15px;
    padding: 10px 15px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .addToCartButton:hover {
    background-color: #0056b3;
  }
  </style>
  