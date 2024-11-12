<template>
  <footer class="footer">
    <div class="footer__content">
      <!-- Section: Store Information -->
      <div class="footer__section footer__store-info">
        <h3 class="footer__title">HTN HAO Store</h3>
        <p class="footer__description">
          Nơi cung cấp các sản phẩm đồng hồ thông minh và phụ kiện chính hãng, đảm bảo chất lượng.
        </p>
      </div>

      <!-- Section: Quick Links -->
      <div class="footer__section footer__quick-links">
        <h4 class="footer__subtitle">Liên kết nhanh</h4>
        <ul class="footer__links">
          <li class="footer__link-item">
            <a @click.prevent="$emit('navigate', 'home')" href="#" class="footer__link">Trang chủ</a>
          </li>
          <li class="footer__link-item">
            <a @click.prevent="$emit('navigate', 'about')" href="#" class="footer__link">Về chúng tôi</a>
          </li>
          <li class="footer__link-item">
            <a @click.prevent="$emit('navigate', 'contact')" href="#" class="footer__link">Liên hệ</a>
          </li>
          <li class="footer__link-item">
            <a @click.prevent="$emit('navigate', 'policy')" href="#" class="footer__link">Chính sách bảo mật</a>
          </li>
          <li class="footer__link-item">
            <a @click.prevent="$emit('navigate', 'terms')" href="#" class="footer__link">Điều khoản sử dụng</a>
          </li>
        </ul>
      </div>

      <!-- Section: Contact Information -->
      <div class="footer__section footer__contact-info">
        <h4 class="footer__subtitle">Liên hệ</h4>
        <ul class="footer__contact-list">
          <li class="footer__contact-item">
            <i class="fas fa-phone-alt footer__contact-icon"></i>
            <span>+84 123 456 789</span>
          </li>
          <li class="footer__contact-item">
            <i class="fas fa-envelope footer__contact-icon"></i>
            <span>support@htnhaostore.com</span>
          </li>
          <li class="footer__contact-item">
            <i class="fas fa-map-marker-alt footer__contact-icon"></i>
            <span>Gò Vấp, Hồ Chí Minh, Việt Nam</span>
          </li>
        </ul>
      </div>

      <!-- Section: Social Media Links -->
      <div class="footer__section footer__social-links">
        <h4 class="footer__subtitle">Kết nối với chúng tôi</h4>
        <div class="footer__social-icons">
          <a href="#" target="_blank" aria-label="Facebook" class="footer__social-link">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" target="_blank" aria-label="Instagram" class="footer__social-link">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" target="_blank" aria-label="Twitter" class="footer__social-link">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" target="_blank" aria-label="YouTube" class="footer__social-link">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Copyright -->
    <div class="footer__bottom">
      <p>&copy; 2024 HTN HAO Store. Cảm ơn bạn đã đồng hành cùng chúng tôi! All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "ComFooter",
};
</script>

<style scoped>
/* CSS Variables for Consistent Styling */
:root {
  --primary-color: #003366;
  --secondary-color: #ffcc00;
  --hover-color: #ffd54f;
  --text-color: #ffffff;
  --link-color: #e0e0e0;
  --background-color-bottom: #002244;
  --icon-color: #ffcc00;
  --transition-speed: 0.3s;
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Footer Base Styles */
.footer {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 40px 20px;
  font-size: 14px;
  width: 100%;
  z-index: 1000;
  font-family: var(--font-family);
}

/* Footer Content Layout */
.footer__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 1200px;
  gap: 20px;
}

/* Footer Section Styles */
.footer__section {
  flex: 1 1 250px;
  padding: 10px;
  min-width: 200px;
}

.footer__title {
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--secondary-color);
}

.footer__subtitle {
  font-size: 18px;
  margin-bottom: 12px;
  color: var(--secondary-color);
}

.footer__description,
.footer__contact-item span,
.footer__link {
  color: var(--link-color);
  font-size: 14px;
  line-height: 1.6;
  text-decoration: none;
}

.footer__link:hover,
.footer__link:focus {
  color: var(--secondary-color);
  text-decoration: underline;
  outline: none;
}

.footer__links {
  list-style: none;
  padding: 0;
}

.footer__link-item {
  margin-bottom: 8px;
}

.footer__contact-list {
  list-style: none;
  padding: 0;
}

.footer__contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.footer__contact-icon {
  margin-right: 10px;
  color: var(--icon-color);
  font-size: 18px;
}

.footer__social-icons {
  display: flex;
  gap: 15px;
}

.footer__social-link {
  color: var(--link-color);
  font-size: 24px;
  transition: color var(--transition-speed);
}

.footer__social-link:hover,
.footer__social-link:focus {
  color: var(--secondary-color);
  outline: none;
}

/* Footer Bottom Section */
.footer__bottom {
  text-align: center;
  padding-top: 10px;
  font-size: 14px;
  color: #e0e0e0;
  background-color: var(--background-color-bottom);
}

.footer__bottom p {
  margin: 0;
  font-weight: 500;
  color: #e6e6e6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  transition: color var(--transition-speed), text-shadow var(--transition-speed);
}

.footer__bottom p:hover {
  color: var(--secondary-color);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .footer__content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer__section {
    margin-bottom: 20px;
  }

  .footer__social-icons {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .footer__section {
    min-width: 100%;
  }

  .footer__content {
    padding: 0 10px;
  }
}
</style>
