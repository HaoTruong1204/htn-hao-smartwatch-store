<template>
    <div class="page search-results-page">
      <h1>Kết Quả Tìm Kiếm</h1>
      <p>Kết quả tìm kiếm cho từ khóa "{{ searchQuery }}":</p>
      <ul>
        <li v-for="result in results" :key="result.id">{{ result.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchResultsPage',
    props: ['searchQuery'],
    data() {
      return {
        results: [
          { id: 1, name: 'Sản phẩm 1' },
          { id: 2, name: 'Sản phẩm 2' }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .page {
    padding: 20px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  </style>
  