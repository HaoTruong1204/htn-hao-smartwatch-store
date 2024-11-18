<template>
  <div class="contact-page">
    <div class="contact-header">
      <div class="header-content">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.</p>
      </div>
      <!-- Phần hình ảnh đã được loại bỏ -->
    </div>

    <div class="contact-body">
      <div class="contact-info">
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <div>
            <h3>Địa chỉ</h3>
            <p>371 Nguyễn Kiệm, Trường Đại Học Gia Định, Gò Vấp, TP. HCM</p>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-phone-alt"></i>
          <div>
            <h3>Điện thoại</h3>
            <p>+84 337 639 500</p>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-envelope"></i>
          <div>
            <h3>Email</h3>
            <p>support@htnhaostore.com</p>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-clock"></i>
          <div>
            <h3>Giờ làm việc</h3>
            <p>Thứ Hai - Thứ Sáu: 8:00 - 18:00</p>
          </div>
        </div>
      </div>

      <div class="contact-form-section">
        <form @submit.prevent="sendMessage" novalidate>
          <div class="form-group">
            <label for="name">Họ và tên</label>
            <div class="input-wrapper">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="name"
                v-model="name"
                required
                placeholder="Nhập họ và tên"
              />
            </div>
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <i class="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                placeholder="Nhập email"
              />
            </div>
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="subject">Chủ đề</label>
            <div class="input-wrapper">
              <i class="fas fa-tag"></i>
              <input
                type="text"
                id="subject"
                v-model="subject"
                required
                placeholder="Nhập chủ đề"
              />
            </div>
            <span v-if="errors.subject" class="error">{{ errors.subject }}</span>
          </div>

          <div class="form-group">
            <label for="message">Nội dung</label>
            <div class="input-wrapper">
              <i class="fas fa-comment-dots"></i>
              <textarea
                id="message"
                v-model="message"
                required
                placeholder="Nhập nội dung"
                rows="5"
              ></textarea>
            </div>
            <span v-if="errors.message" class="error">{{ errors.message }}</span>
          </div>

          <button type="submit" :disabled="isLoading">
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin"></i> Đang gửi...
            </span>
            <span v-else>
              Gửi
            </span>
          </button>

          <div v-if="success" class="success-message">
            Thông điệp đã được gửi thành công!
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>

    <div class="contact-map">
      <iframe
        :src="mapSrc"
        width="100%"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    <div class="social-media">
      <a href="https://facebook.com" target="_blank" rel="noopener">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener">
        <i class="fab fa-instagram"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      errors: {},
      success: false,
      errorMessage: '',
      isLoading: false,
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1234567890123!2d106.123456789!3d10.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175294100a1c3d7%3A0x8b1a58e577a57d35!2zMzcxIE5ndXnhu4duIEtpw6puLCBUcsOibiDEkOG7kWMgR2lhIFTDom4gVGjDtG5n!5e0!3m2!1sen!2s!4v1610000000000!5m2!1sen!2s',
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.name.trim()) {
        this.errors.name = 'Vui lòng nhập họ và tên.';
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.trim()) {
        this.errors.email = 'Vui lòng nhập email.';
      } else if (!emailPattern.test(this.email)) {
        this.errors.email = 'Email không hợp lệ.';
      }

      if (!this.subject.trim()) {
        this.errors.subject = 'Vui lòng nhập chủ đề.';
      }

      if (!this.message.trim()) {
        this.errors.message = 'Vui lòng nhập nội dung.';
      }

      return Object.keys(this.errors).length === 0;
    },
    async sendMessage() {
      if (this.validateForm()) {
        this.isLoading = true;
        this.errorMessage = '';
        try {
          // Thực hiện gửi dữ liệu đến backend
          // Sử dụng Axios hoặc Fetch API
          // Ví dụ sử dụng Axios:
          // const response = await axios.post('/api/contact', {
          //   name: this.name,
          //   email: this.email,
          //   subject: this.subject,
          //   message: this.message,
          // });

          // Giả sử gửi thành công
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả lập gửi dữ liệu

          this.success = true;
          this.resetForm();

          // Tự động ẩn thông báo thành công sau 5 giây
          setTimeout(() => {
            this.success = false;
          }, 5000);
        } catch (error) {
          this.errorMessage = 'Đã xảy ra lỗi khi gửi thông điệp. Vui lòng thử lại sau.';
        } finally {
          this.isLoading = false;
        }
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    },
  },
};
</script>

<style scoped>
/* Không cần import Font Awesome ở đây vì đã import trong main.js */
/* @import "~@fortawesome/fontawesome-free/css/all.min.css"; */

.contact-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  padding: 40px 20px;
  color: #333333;
}

.contact-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.header-content {
  flex: 1 1 300px;
  padding: 20px;
}

.header-content h1 {
  color: #003366;
  font-size: 36px;
  margin-bottom: 10px;
  text-align: center;
}

.header-content p {
  color: #555555;
  font-size: 18px;
  text-align: center;
}

/* Nếu bạn không sử dụng hình ảnh, hãy ẩn phần này */
.header-image {
  display: none;
}

.contact-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
}

.contact-info {
  flex: 1 1 300px;
  max-width: 400px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  background: #ffffff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-item i {
  color: #ffcc00;
  font-size: 24px;
  margin-right: 15px;
  margin-top: 5px;
}

.info-item h3 {
  margin: 0;
  font-size: 18px;
  color: #003366;
}

.info-item p {
  margin: 5px 0 0 0;
  color: #555555;
}

.contact-form-section {
  flex: 1 1 500px;
  max-width: 600px;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-form-section form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333333;
  font-weight: 600;
}

.input-wrapper {
  position: relative;
}

.input-wrapper i {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #999999;
}

.input-wrapper input,
.input-wrapper textarea {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-size: 16px;
  background-color: #fdfdfd;
}

.input-wrapper input:focus,
.input-wrapper textarea:focus {
  border-color: #ffcc00;
  box-shadow: 0 0 5px rgba(255, 204, 0, 0.5);
  outline: none;
}

.input-wrapper textarea {
  resize: vertical;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 15px;
  background-color: #ffcc00;
  color: #003366;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background-color: #ffd54f;
  transform: translateY(-2px);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

.error-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

.contact-map {
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.social-media {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.social-media a {
  color: #003366;
  font-size: 24px;
  transition: color 0.3s, transform 0.3s;
}

.social-media a:hover {
  color: #ffcc00;
  transform: scale(1.2);
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 992px) {
  .contact-header {
    flex-direction: column;
  }

  .contact-body {
    flex-direction: column;
    align-items: center;
  }

  .contact-info,
  .contact-form-section {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .header-content h1 {
    font-size: 28px;
  }

  .header-content p {
    font-size: 16px;
  }

  .info-item h3 {
    font-size: 16px;
  }

  .info-item p {
    font-size: 14px;
  }

  .contact-form-section {
    padding: 20px;
  }

  button {
    font-size: 16px;
  }

  .social-media a {
    font-size: 20px;
  }
}
</style>
