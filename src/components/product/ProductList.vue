<template>
  <div class="product-list">
    <div v-for="item in items" :key="item.id" class="product-card">
      <img :src="item.image" :alt="item.name" class="product-image" />
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p><strong>Giá:</strong> {{ item.price.toLocaleString() }} VND</p>
      <p><strong>Tình trạng:</strong> {{ item.status }}</p>
    </div>
  </div>
</template>

<script>
import axios from './axios';

export default {
  data() {
    return {
      items: [], // Danh sách sản phẩm
    };
  },
  mounted() {
    this.fetchItems(); // Lấy dữ liệu khi component được gắn vào DOM
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('/item'); // Lấy dữ liệu từ API
        this.items = response.data; // Lưu dữ liệu vào `items`
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      }
    },
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
