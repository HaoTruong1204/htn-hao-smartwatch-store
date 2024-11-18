<template>
  <div class="blog-list-item">
    <img :src="blog.image" :alt="blog.title" class="blog-item-image" />
    <div class="blog-item-content">
      <h2 class="blog-item-title">{{ blog.title }}</h2>
      <p class="blog-item-date">Đăng ngày: {{ formatDate(blog.date) }}</p>
      <p class="blog-item-summary">{{ blog.summary }}</p>
      <!-- Điều hướng đến trang chi tiết bài viết -->
      <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }" class="blog-item-link">
        Đọc tiếp →
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "BlogListItem",
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>
  
  <style scoped>
  .blog-list-item {
    display: flex;
    gap: 20px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .blog-list-item:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .blog-item-image {
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .blog-item-content {
    flex-grow: 1;
  }
  
  .blog-item-title {
    font-size: 1.4rem;
    color: #003366;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .blog-item-date {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
  }
  
  .blog-item-summary {
    font-size: 1rem;
    color: #333;
    margin-bottom: 15px;
  }
  
  .blog-item-link {
    color: #007bff;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .blog-item-link:hover {
    color: #0056b3;
  }
  </style>
  