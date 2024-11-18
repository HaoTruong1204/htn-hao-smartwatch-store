<template>
    <div class="page not-found-page">
      <h1>404 - Không Tìm Thấy Trang</h1>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <router-link to="/">Quay về trang chủ</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundPage'
  }
  </script>
  
  <style scoped>
  .page {
    padding: 20px;
    text-align: center;
  }
  </style>
  