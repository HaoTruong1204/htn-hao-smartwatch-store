<template>
  <div class="about-page">
    <div class="about-header">
      <h1>Về Chúng Tôi</h1>
      <p>Chào mừng bạn đến với HTN HAO STORE!</p>
    </div>

    <div class="about-content">
      <p>
        HTN HAO STORE là nơi bạn tìm thấy các sản phẩm đồng hồ thông minh và phụ kiện chính hãng, được chọn lọc kỹ càng để đảm bảo chất lượng và đáp ứng nhu cầu của khách hàng. Chúng tôi cam kết cung cấp những sản phẩm hiện đại, thiết kế sang trọng và đầy đủ tính năng hữu ích cho cuộc sống của bạn.
      </p>
      <p>
        Với đội ngũ nhân viên tận tâm và dịch vụ chăm sóc khách hàng chuyên nghiệp, HTN HAO STORE luôn hướng đến mục tiêu làm hài lòng khách hàng, mang đến những trải nghiệm tuyệt vời nhất khi mua sắm tại cửa hàng của chúng tôi.
      </p>
      <p>
        Chúng tôi không chỉ cung cấp sản phẩm chất lượng, mà còn đảm bảo mỗi khách hàng sẽ nhận được sự hỗ trợ nhanh chóng và tận tình trong suốt quá trình mua sắm.
      </p>
    </div>

    <div class="about-team">
  <h2>Đội ngũ của chúng tôi</h2>
  <div class="team-members">
    <div class="team-member">
      <img src="/images/about/team-member1.jpg" alt="Nhân viên 1" class="team-img" />
      <p class="team-name">Trương Ngọc Hào</p>
      <p class="team-role">Giám đốc điều hành</p>
    </div>
  </div>
</div>
  
    <div class="about-footer">
      <p>Chúng tôi luôn sẵn sàng phục vụ bạn. Hãy liên hệ với chúng tôi nếu có bất kỳ câu hỏi nào!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
}
</script>

<style scoped>
.about-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 30px;
  background-color: #f9f9f9;
}

.about-header {
  text-align: center;
  margin-bottom: 30px;
}

.about-header h1 {
  font-size: 2.5rem;
  color: #003366;
  margin-bottom: 10px;
}

.about-header p {
  font-size: 1.2rem;
  color: #777;
}

.about-content {
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.8;
  margin-bottom: 40px;
}

.about-content p {
  margin-bottom: 20px;
}

.about-team {
  text-align: center;
}

.about-team h2 {
  font-size: 2rem;
  color: #003366;
  margin-bottom: 30px;
}

.team-members {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.team-member {
  text-align: center;
}

.team-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.team-name {
  font-weight: bold;
  color: #003366;
  font-size: 1.1rem;
}

.team-role {
  font-size: 1rem;
  color: #777;
}

.about-footer {
  text-align: center;
  margin-top: 40px;
}

.about-footer p {
  font-size: 1rem;
  color: #333;
}
</style>
