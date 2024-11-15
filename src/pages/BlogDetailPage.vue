<template>
    <div class="page blog-detail-page">
      <h1>{{ blogTitle }}</h1>
      <p>Đây là nội dung chi tiết của bài viết.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BlogDetailPage',
    props: ['id'],
    computed: {
      blogTitle() {
        return `Bài viết #${this.id}`;
      }
    }
  }
  </script>
  
  <style scoped>
  .page {
    padding: 20px;
  }
  </style>
  