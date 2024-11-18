<template>
  <div class="page blog-list-page">
    <h1 class="page-title">Blog</h1>
    <div class="blog-list">
      <div
        v-for="blog in blogs"
        :key="blog.id"
        class="blog-card"
      >
        <img :src="blog.image" :alt="blog.title" class="blog-card-image" />
        <div class="blog-card-content">
          <h2 class="blog-card-title">{{ blog.title }}</h2>
          <p class="blog-card-date">Đăng ngày: {{ formatDate(blog.date) }}</p>
          <p class="blog-card-excerpt">{{ blog.excerpt }}</p>
          <router-link :to="'/blogs/' + blog.id" class="read-more">
            Đọc tiếp →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogListPage",
  data() {
    return {
      blogs: [
        {
          id: "1",
          title: "10 Mẹo Sử Dụng Đồng Hồ Hiệu Quả",
          excerpt: "Khám phá các mẹo bảo quản và sử dụng đồng hồ tốt nhất...",
          content:
            "Đồng hồ không chỉ là công cụ xem giờ mà còn là phụ kiện thể hiện phong cách cá nhân. Dưới đây là 10 mẹo giúp bạn sử dụng và bảo quản đồng hồ hiệu quả...",
          image: "/images/blogs/watch-tips.jpg",
          date: "2024-11-01",
        },
        {
          id: "2",
          title: "Xu Hướng Đồng Hồ 2024",
          excerpt: "Năm 2024 đánh dấu sự trở lại của các thiết kế cổ điển...",
          content:
            "Xu hướng đồng hồ năm 2024 đánh dấu sự trở lại của các thiết kế cổ điển kết hợp hiện đại. Cùng khám phá các mẫu đồng hồ nổi bật...",
          image: "/images/blogs/watch-trends.jpg",
          date: "2024-11-05",
        },
        {
          id: "3",
          title: "Hướng Dẫn Chọn Đồng Hồ Phù Hợp",
          excerpt: "Cách chọn đồng hồ phù hợp với phong cách và nhu cầu của bạn...",
          content:
            "Chọn đồng hồ phù hợp không chỉ giúp bạn tự tin hơn mà còn là một khoản đầu tư lâu dài. Dưới đây là hướng dẫn giúp bạn chọn chiếc đồng hồ lý tưởng...",
          image: "/images/blogs/watch-guide.jpg",
          date: "2024-11-10",
        },
      ],
    };
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
.page {
  padding: 20px;
  background-color: #f9f9f9;
}

.page-title {
  font-size: 2.5rem;
  color: #003366;
  text-align: center;
  margin-bottom: 20px;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.blog-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.blog-card-content {
  padding: 15px;
}

.blog-card-title {
  font-size: 1.5rem;
  color: #333333;
  margin-bottom: 10px;
}

.blog-card-date {
  font-size: 0.9rem;
  color: #777777;
  margin-bottom: 15px;
}

.blog-card-excerpt {
  font-size: 1rem;
  color: #555555;
  margin-bottom: 15px;
}

.read-more {
  color: #003366;
  text-decoration: none;
  font-weight: bold;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
