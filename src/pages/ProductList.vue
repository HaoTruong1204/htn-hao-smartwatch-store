<template>
  <div class="product-list">
    <h1>Danh Sách Sản Phẩm</h1>
    <ul v-if="items.length > 0">
      <li v-for="item in items" :key="item.id" class="product-item">
        <img :src="`http://localhost:3000${item.image}`" :alt="item.name" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p><strong>Giá:</strong> {{ item.price.toLocaleString() }} VND</p>
        <p><strong>Trạng thái:</strong> {{ item.status }}</p>
      </li>
    </ul>
    <p v-else>Không có sản phẩm nào để hiển thị</p>
  </div>
</template>

<script>
import axios from '@/services/axios'; // Import Axios instance

export default {
  data() {
    return {
      items: [], // Dữ liệu sản phẩm
    };
  },
  async created() {
    try {
      const response = await axios.get('/item'); // Gọi API
      this.items = response.data; // Gán dữ liệu vào items
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-item {
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  width: 200px;
  text-align: center;
}

.product-item img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>
