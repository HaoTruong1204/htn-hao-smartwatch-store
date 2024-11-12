<template>
  <footer class="footer">
    <p>&copy; 2024 HTN HAO Store. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: "ComFooter",
};
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 15px 20px;
  background-color: #1e2a38; /* Màu nền xanh đậm nhất quán */
  color: white; /* Màu chữ trắng cho độ tương phản tốt */
  font-size: 14px;
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.2); /* Hiệu ứng bóng để nổi bật footer */
  margin-top: 20px;
  font-weight: 500;
}

/* Hiệu ứng cho hover - để tăng tính tương tác và thân thiện */
.footer p:hover {
  color: #f1c40f; /* Đổi màu chữ khi hover để tạo hiệu ứng thị giác */
  transition: color 0.3s ease; /* Chuyển động mượt mà khi hover */
}
</style>
