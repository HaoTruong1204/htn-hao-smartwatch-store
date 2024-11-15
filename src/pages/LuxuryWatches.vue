<template>
    <div :class="$style.pageContainer">
      <h1 :class="$style.title">Đồng Hồ Cao Cấp</h1>
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
    name: "LuxuryWatchesPage",
    data() {
      return {
        products: [
          {
            id: 1,
            name: "Rolex Submariner",
            price: 220000000,
            image: "https://example.com/rolex-submariner.jpg",
          },
          {
            id: 2,
            name: "Omega Seamaster",
            price: 180000000,
            image: "https://example.com/omega-seamaster.jpg",
          },
          {
            id: 3,
            name: "Audemars Piguet Royal Oak",
            price: 550000000,
            image: "https://example.com/audemars-piguet-royal-oak.jpg",
          },
          {
            id: 4,
            name: "Patek Philippe Nautilus",
            price: 780000000,
            image: "https://example.com/patek-philippe-nautilus.jpg",
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
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
  }
  
  .productGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .productCard {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .productCard:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
  
  .productImage {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  
  .productName {
    font-size: 1.2rem;
    font-weight: bold;
    color: #444;
    margin: 15px 10px 5px;
    text-align: center;
  }
  
  .productPrice {
    font-size: 1.1rem;
    color: #d9534f;
    margin: 0 10px 15px;
    text-align: center;
  }
  
  .addToCartButton {
    display: block;
    width: 80%;
    margin: 0 auto 15px;
    padding: 10px;
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
  