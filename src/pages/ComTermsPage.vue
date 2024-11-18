<template>
  <div class="terms-page">
    <div class="terms-container">
      <h1 class="terms-title">Điều Khoản Dịch Vụ</h1>
      <p class="terms-introduction">
        Chào mừng bạn đến với cửa hàng HTN HAO Store. Trước khi sử dụng dịch vụ của chúng tôi, vui lòng đọc kỹ các điều khoản dịch vụ dưới đây.
      </p>

      <section class="terms-section">
        <h2 class="terms-section-title">1. Điều Khoản Chung</h2>
        <p class="terms-text">
          Khi bạn truy cập vào website và sử dụng dịch vụ của HTN HAO Store, bạn đồng ý tuân theo tất cả các điều khoản và điều kiện của chúng tôi.
        </p>
      </section>

      <section class="terms-section">
        <h2 class="terms-section-title">2. Sử Dụng Dịch Vụ</h2>
        <p class="terms-text">
          Bạn chỉ được sử dụng dịch vụ của chúng tôi cho mục đích hợp pháp và không vi phạm các điều khoản của chúng tôi.
        </p>
        <p class="terms-text">
          Bạn không được sử dụng dịch vụ của chúng tôi để thực hiện các hành động trái phép hoặc có hại đối với hệ thống của chúng tôi hoặc của bất kỳ bên thứ ba nào.
        </p>
      </section>

      <section class="terms-section">
        <h2 class="terms-section-title">3. Quyền Sở Hữu Nội Dung</h2>
        <p class="terms-text">
          Tất cả nội dung trên website của HTN HAO Store, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, logo, thương hiệu, và dữ liệu khác đều thuộc quyền sở hữu của chúng tôi hoặc các bên cấp phép.
        </p>
      </section>

      <section class="terms-section">
        <h2 class="terms-section-title">4. Chính Sách Thanh Toán</h2>
        <p class="terms-text">
          Mọi giao dịch trên HTN HAO Store phải tuân theo các chính sách thanh toán của chúng tôi. Bạn có thể thanh toán qua các phương thức đã được xác định và chỉ áp dụng trong khu vực chúng tôi hỗ trợ.
        </p>
      </section>

      <section class="terms-section">
        <h2 class="terms-section-title">5. Giới Hạn Trách Nhiệm</h2>
        <p class="terms-text">
          HTN HAO Store không chịu trách nhiệm đối với bất kỳ thiệt hại, mất mát hoặc tổn thất nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.
        </p>
      </section>

      <section class="terms-section">
        <h2 class="terms-section-title">6. Chính Sách Bảo Mật</h2>
        <p class="terms-text">
          Chúng tôi cam kết bảo mật thông tin cá nhân của bạn và chỉ sử dụng nó theo các mục đích đã được thông báo trong Chính Sách Bảo Mật của chúng tôi.
        </p>
      </section>

      <section class="terms-section">
        <h2 class="terms-section-title">7. Điều Khoản Chấm Dứt</h2>
        <p class="terms-text">
          Chúng tôi có quyền chấm dứt hoặc tạm ngừng dịch vụ của bạn nếu bạn vi phạm bất kỳ điều khoản nào trong các điều khoản dịch vụ này.
        </p>
      </section>

      <p class="terms-footer">
        Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi qua các phương thức liên lạc trên website.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsPage"
};
</script>

<style scoped>
/* Styling the page */
.terms-page {
  padding: 40px 20px;
  background-color: #f7f7f7;
}

.terms-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.terms-title {
  font-size: 2rem;
  color: #003366;
  text-align: center;
  margin-bottom: 20px;
}

.terms-introduction {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 30px;
}

.terms-section {
  margin-bottom: 25px;
}

.terms-section-title {
  font-size: 1.5rem;
  color: #003366;
  margin-bottom: 10px;
}

.terms-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

.terms-footer {
  font-size: 1rem;
  text-align: center;
  color: #777;
  margin-top: 40px;
}
</style>
