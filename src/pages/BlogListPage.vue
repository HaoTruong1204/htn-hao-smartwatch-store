<template>
    <div class="page blog-list-page">
      <h1>Danh Sách Blog</h1>
      <ul>
        <li v-for="blog in blogs" :key="blog.id">
          <router-link :to="`/blog/${blog.id}`">{{ blog.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BlogListPage',
    data() {
      return {
        blogs: [
          { id: 1, title: 'Bài viết đầu tiên' },
          { id: 2, title: 'Bài viết thứ hai' }
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
  li {
    margin-bottom: 10px;
  }
  </style>
  