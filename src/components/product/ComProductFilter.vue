<template>
  <div class="product-filter">
    <h3>Bộ lọc sản phẩm</h3>
    <div class="filter-group">
      <label for="category">Danh mục:</label>
      <select id="category" v-model="selectedCategory" @change="filterProducts">
        <option value="">Tất cả</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <div class="filter-group">
      <label for="price">Giá:</label>
      <select id="price" v-model="selectedPrice" @change="filterProducts">
        <option value="">Tất cả</option>
        <option value="0-1000000">Dưới 1 triệu</option>
        <option value="1000000-5000000">1-5 triệu</option>
        <option value="5000000">Trên 5 triệu</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: '',
      selectedPrice: '',
      categories: ['Đồng hồ thông minh', 'Phụ kiện', 'Phụ kiện đồng hồ', 'Sản phẩm mới'],
    };
  },
  methods: {
    filterProducts() {
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
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.filter-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 8px;
  font-weight: 500;
}

select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #34495e;
  cursor: pointer;
  transition: border-color 0.3s;
}

select:focus {
  outline: none;
  border-color: #2a9d8f; /* Green color on focus */
}

select option {
  padding: 8px;
}

/* Responsive: Ensures that filters look good on smaller screens */
@media (max-width: 768px) {
  .product-filter {
    padding: 12px;
  }
}
</style>
