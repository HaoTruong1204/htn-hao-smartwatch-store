<template>
  <div class="product-filter">
    <!-- Lọc theo danh mục -->
    <div class="filter-group">
      <label for="category">Danh mục:</label>
      <select id="category" v-model="selectedCategory" @change="applyFilter">
        <option value="">Tất cả danh mục</option>
        <option value="Đồng hồ thông minh">Đồng hồ thông minh</option>
        <option value="Phụ kiện">Phụ kiện</option>
        <option value="Đồng hồ thể thao">Đồng hồ thể thao</option>
        <option value="Đồng hồ cao cấp">Đồng hồ cao cấp</option>
      </select>
    </div>
  
    <!-- Lọc theo mức giá -->
    <div class="filter-group">
      <label for="price">Mức giá:</label>
      <select id="price" v-model="selectedPrice" @change="applyFilter">
        <option value="">Tất cả mức giá</option>
        <option value="0-1000000">0 - 1.000.000 VND</option>
        <option value="1000000-5000000">1.000.000 - 5.000.000 VND</option>
        <option value="5000000">Trên 5.000.000 VND</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: '',  // Danh mục sản phẩm được chọn
      selectedPrice: '',  // Mức giá sản phẩm được chọn
    };
  },
  methods: {
    // Phát ra sự kiện khi người dùng thay đổi bộ lọc
    applyFilter() {
      // Gửi sự kiện 'filter' với các tham số danh mục và mức giá
      this.$emit('filter', {
        category: this.selectedCategory,
        price: this.selectedPrice,
      });
    },
  },
};
</script>

<style scoped>
.product-filter {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: flex-start;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

select {
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

select:focus {
  border-color: #2a9d8f;
  outline: none;
}

@media (max-width: 768px) {
  .product-filter {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
