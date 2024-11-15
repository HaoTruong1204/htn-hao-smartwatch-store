<template>
    <div :class="$style.pageContainer">
      <h1 :class="$style.title">Phụ Kiện Đồng Hồ</h1>
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
    name: "Accessories-page",
    data() {
      return {
        products: [
          {
            id: 1,
            name: "Dây da đồng hồ",
            price: 250000,
            image: "https://example.com/watch-strap.jpg",
          },
          {
            id: 2,
            name: "Hộp đựng đồng hồ",
            price: 500000,
            image: "https://example.com/watch-box.jpg",
          },
          {
            id: 3,
            name: "Sạc không dây",
            price: 800000,
            image: "https://example.com/wireless-charger.jpg",
          },
          {
            id: 4,
            name: "Kính bảo vệ màn hình",
            price: 150000,
            image: "https://example.com/screen-protector.jpg",
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
  