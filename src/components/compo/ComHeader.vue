<!-- src/components/ComHeader.vue -->

<template>
  <header class="header">
    <div class="headerContent">
      <!-- Logo -->
      <h1
        class="logo"
        @click="navigateHome"
        tabindex="0"
        @keydown.enter="navigateHome"
      >
       HTN HAO STORE</h1>
      <!-- Navigation Links with Dropdown for Products -->
      <nav class="nav" aria-label="Main Navigation">
        <router-link
          to="/"
          class="navLink"
        >
          Trang chủ
        </router-link>
        <div class="dropdown" ref="dropdown">
          <button
            class="dropdownButton"
            aria-haspopup="true"
            :aria-expanded="isDropdownOpen ? 'true' : 'false'"
            @click="toggleDropdown"
          >
            Sản phẩm ▼
          </button>
          <div
            class="dropdownContent"
            :class="{ show: isDropdownOpen }"
            role="menu"
          >
            <router-link
              to="/smartwatches"
              class="dropdownItem"
              role="menuitem"
              @click="closeDropdown"
            >
              Đồng hồ thông minh
            </router-link>
            <router-link
              to="/luxury-watches"
              class="dropdownItem"
              role="menuitem"
              @click="closeDropdown"
            >
              Đồng hồ cao cấp
            </router-link>
            <router-link
              to="/accessories"
              class="dropdownItem"
              role="menuitem"
              @click="closeDropdown"
            >
              Phụ kiện
            </router-link>
          </div>
        </div>

        <router-link
          to="/new-products"
          class="navLink"
        >
          Sản phẩm mới
        </router-link>
        <router-link
          to="/promo"
          class="navLink"
        >
          Khuyến mãi
        </router-link>
        <router-link
          to="/blog"
          class="navLink"
        >
          Blog
        </router-link>
        <router-link
          to="/contact"
          class="navLink"
        >
          Liên hệ
        </router-link>
      </nav>

      <!-- Search Bar -->
      <div class="searchBar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          v-model="searchQuery"
          @keydown.enter="search"
          aria-label="Search Products"
        />
        <button
          @click="search"
          class="searchButton"
          aria-label="Search"
        >
          🔍
        </button>
      </div>

      <!-- User Account and Cart Icons -->
      <div class="icons">
        <!-- User Account Button -->
        <div v-if="isAuthenticated" class="user-dropdown" ref="userDropdown">
          <button
            @click="toggleUserDropdown"
            class="iconButton"
            aria-haspopup="true"
            :aria-expanded="isUserDropdownOpen ? 'true' : 'false'"
            aria-label="Thông tin tài khoản"
          >
            👤 <span class="userName">Chào, {{ currentUser.name }}</span> ▼
          </button>
          <div
            class="userDropdownContent"
            :class="{ show: isUserDropdownOpen }"
            role="menu"
          >
            <router-link
              to="/account"
              class="userDropdownItem button-beautiful"
              role="menuitem"
              @click="closeUserDropdown"
            >
              Tài khoản
            </router-link>
            <button
              @click="logoutUser"
              class="userDropdownItem logout"
              role="menuitem"
            >
              Đăng xuất
            </button>
          </div>
        </div>
        <div v-else>
          <button
            @click="navigateTo('/login')"
            class="iconButton"
            aria-label="Đăng nhập"
          >
            👤 <span class="loginText">Đăng nhập</span>
          </button>
        </div>

        <!-- Cart Button -->
        <button
          @click="toggleCart"
          class="iconButton"
          aria-label="Giỏ hàng"
        >
          🛒 <span class="cartCount">{{ cartItemCount }}</span>
        </button>
      </div>

      <!-- Toggle Button for Mobile -->
      <button
        class="menuToggle"
        @click="toggleMenu"
        aria-label="Toggle Menu"
      >
        ☰
      </button>
    </div>

    <!-- Navigation Links for Mobile -->
    <nav v-if="isMenuOpen" class="navMobile" aria-label="Mobile Navigation">
      <router-link
        to="/"
        class="navMobileLink"
        @click="closeMenu"
      >
        Trang chủ
      </router-link>
      <div class="dropdownMobile" ref="mobileDropdown">
        <button
          class="dropdownMobileButton"
          aria-haspopup="true"
          :aria-expanded="isMobileDropdownOpen ? 'true' : 'false'"
          @click="toggleMobileDropdown"
        >
          Sản phẩm ▼
        </button>
        <div
          class="dropdownMobileContent"
          :class="{ show: isMobileDropdownOpen }"
          role="menu"
        >
          <router-link
            to="/smartwatches"
            class="dropdownMobileItem"
            role="menuitem"
            @click="closeMobileMenu"
          >
            Đồng hồ thông minh
          </router-link>
          <router-link
            to="/luxury-watches"
            class="dropdownMobileItem"
            role="menuitem"
            @click="closeMobileMenu"
          >
            Đồng hồ cao cấp
          </router-link>
          <router-link
            to="/accessories"
            class="dropdownMobileItem"
            role="menuitem"
            @click="closeMobileMenu"
          >
            Phụ kiện
          </router-link>
        </div>
      </div>

      <router-link
        to="/promo"
        class="navMobileLink"
        @click="closeMenu"
      >
        Khuyến mãi
      </router-link>
      <router-link
        to="/blog"
        class="navMobileLink"
        @click="closeMenu"
      >
        Blog
      </router-link>
      <router-link
        to="/contact"
        class="navMobileLink"
        @click="closeMenu"
      >
        Liên hệ
      </router-link>
    </nav>
  </header>
</template>


<script>
export default {
  name: "ComHeader",
  props: {
    cartItemCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: "", // Query tìm kiếm
      isMenuOpen: false, // Trạng thái mở menu chính
      isDropdownOpen: false, // Trạng thái mở dropdown sản phẩm
      isMobileDropdownOpen: false, // Trạng thái mở dropdown sản phẩm trên mobile
      isUserDropdownOpen: false, // Trạng thái mở dropdown người dùng
      currentUser: JSON.parse(localStorage.getItem("currentUser")) || null, // Lưu thông tin người dùng đã đăng nhập
    };
  },
  // created() {
  //   console.log(this.currentUser);
  // },
  computed: {
    isAuthenticated() {
      return !!this.currentUser; // Kiểm tra xem người dùng đã đăng nhập hay chưa
    },
  },
  methods: {
    // Tìm kiếm sản phẩm
    search() {
      if (this.searchQuery.trim() !== "") {
        this.$router.push({ path: "/search", query: { q: this.searchQuery } });
        this.searchQuery = ""; // Reset ô tìm kiếm
      }
    },

    // Đăng xuất người dùng
    logoutUser() {
      localStorage.removeItem("currentUser"); // Xóa thông tin người dùng khỏi localStorage
      localStorage.removeItem("authUser");
      this.currentUser = null; // Xóa trạng thái người dùng
      this.isUserDropdownOpen = false; // Đóng dropdown người dùng
      // this.$router.push("/"); // Điều hướng về trang chủ
      alert("Bạn đã đăng xuất thành công!");
      window.location.href = '/';
    },

    // Điều hướng đến các trang khác
    navigateTo(route) {
      this.$router.push(route);
      this.closeAllDropdowns(); // Đóng tất cả dropdowns
    },

    // Điều hướng về trang chủ
    navigateHome() {
      this.$router.push("/");
    },

    // Đóng tất cả dropdowns
    closeAllDropdowns() {
      this.isDropdownOpen = false;
      this.isMobileDropdownOpen = false;
      this.isUserDropdownOpen = false;
    },

    // Toggle menu chính
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (!this.isMenuOpen) {
        this.isMobileDropdownOpen = false;
      }
    },

    // Toggle dropdown sản phẩm
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    // Toggle dropdown sản phẩm trên mobile
    toggleMobileDropdown() {
      this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
    },

    // Toggle dropdown người dùng
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen;
    },

    // Xử lý khi click ngoài các dropdowns
    handleClickOutside(event) {
      const dropdown = this.$refs.dropdown;
      const mobileDropdown = this.$refs.mobileDropdown;
      const userDropdown = this.$refs.userDropdown;

      if (dropdown && !dropdown.contains(event.target)) {
        this.isDropdownOpen = false;
      }
      if (mobileDropdown && !mobileDropdown.contains(event.target)) {
        this.isMobileDropdownOpen = false;
      }
      if (userDropdown && !userDropdown.contains(event.target)) {
        this.isUserDropdownOpen = false;
      }
    },

    // Xử lý khi toggle giỏ hàng
    toggleCart() {
      this.$emit("toggle-cart");
    },
  },
  mounted() {
    // Gắn sự kiện click bên ngoài để đóng dropdowns
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    // Gỡ sự kiện khi component bị hủy
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>

/* styles.css hoặc trong <style scoped> của component */

/* Nút Đăng xuất */
.logout {
  background-color: #e74c3c; /* Màu đỏ nổi bật */
  color: #ffffff; /* Chữ màu trắng */
  padding: 10px 16px; /* Khoảng cách bên trong nút */
  font-size: 0.9rem; /* Kích thước chữ */
  font-weight: 600; /* Độ đậm chữ */
  border: none; /* Loại bỏ viền mặc định */
  border-radius: 8px; /* Bo góc mượt mà */
  cursor: pointer; /* Con trỏ dạng tay khi hover */
  transition: all 0.3s ease; /* Hiệu ứng chuyển đổi */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
  text-align: center; /* Căn giữa nội dung */
}

/* Hiệu ứng khi hover */
.logout:hover {
  background-color: #c0392b; /* Màu đỏ sẫm hơn khi hover */
  transform: translateY(-2px); /* Hiệu ứng nâng nút */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Tăng độ bóng */
}

/* Hiệu ứng khi nhấn */
.logout:active {
  transform: translateY(0); /* Đưa nút về vị trí gốc */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); /* Giảm độ bóng */
  background-color: #a93226; /* Màu đỏ đậm hơn */
}

/* Hiệu ứng khi focus */
.logout:focus {
  outline: 2px solid #ff6f61; /* Đường viền focus màu cam */
  outline-offset: 2px;
}

/* Đảm bảo nút đồng bộ với giao diện */
.logout {
  margin-left: 10px; /* Khoảng cách với nút "Tài khoản" */
  display: inline-block;
  vertical-align: middle; /* Căn chỉnh giữa dòng */
}


/* Router-link styled as a button */
.button-beautiful {
  display: inline-block; /* Đảm bảo hiển thị inline */
  background: linear-gradient(90deg, #6dd5ed, #2193b0); /* Gradient xanh hiện đại */
  color: #ffffff; /* Chữ màu trắng */
  padding: 10px 16px; /* Khoảng cách bên trong */
  font-size: 0.9rem; /* Kích thước chữ */
  font-weight: 600; /* Đậm chữ */
  text-align: center; /* Căn giữa chữ */
  border: none; /* Không có viền */
  border-radius: 8px; /* Bo góc */
  cursor: pointer; /* Con trỏ tay khi hover */
  text-decoration: none; /* Xóa gạch chân của link */
  transition: all 0.3s ease; /* Hiệu ứng mượt */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
}

/* Hover effect */
.button-beautiful:hover {
  background: linear-gradient(90deg, #56c7e5, #18678a); /* Gradient đậm hơn khi hover */
  transform: translateY(-2px); /* Hiệu ứng nâng lên */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Tăng bóng khi hover */
}

/* Active effect */
.button-beautiful:active {
  background: linear-gradient(90deg, #2193b0, #6dd5ed); /* Gradient đảo ngược */
  transform: translateY(0); /* Trở về gốc khi nhấn */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Giảm bóng khi nhấn */
}

/* Focus effect */
.button-beautiful:focus {
  outline: 2px solid #ffd54f; /* Đường viền focus vàng nhạt */
  outline-offset: 2px; /* Khoảng cách viền */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .button-beautiful {
    padding: 8px 12px; /* Giảm khoảng cách trong nút trên màn hình nhỏ */
    font-size: 0.85rem; /* Nhỏ hơn chút */
  }
}

/* CSS Variables for Consistent Styling */
:root {
  --primary-color: #003366;
  --secondary-color: #ffcc00;
  --hover-color: #ffd54f;
  --text-color: #ffffff;
  --background-color: #ffffff;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --transition-speed: 0.3s;
  --icon-size: 24px;
  --login-text-margin-left: 8px;
  --dropdown-bg-color: #003366;
  --dropdown-hover-bg-color: #002244;
}

/* Reset some basic styles */
.header,
.header * {
  box-sizing: border-box;
}

/* Header Styles */
.header {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 15px 20px;
  box-shadow: 0px 4px 8px var(--shadow-color);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 140px;
  font-family: var(--font-family);
  transition: background-color var(--transition-speed);
}

/* Header Content */
.headerContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  width: 100%;
}

/* Logo Styles */
.logo {
  font-size: 28px;
  font-weight: bold;
  color: var(--secondary-color);
  cursor: pointer;
  transition: color var(--transition-speed);
}

.logo:hover,
.logo:focus {
  color: var(--hover-color);
  outline: none;
}

/* Navigation Links */
.nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.navLink {
  color: var(--text-color);
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-speed);
  position: relative;
}

.navLink:hover,
.navLink:focus {
  color: var(--secondary-color);
  outline: none;
}

/* Dropdown Menu Styles */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Button */
.dropdownButton {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px; /* Khoảng cách giữa icon và text */
  transition: color var(--transition-speed), transform var(--transition-speed);
}

.dropdownButton:hover,
.dropdownButton:focus {
  color: var(--secondary-color);
  transform: translateY(-2px); /* Hiệu ứng nhấn nút nhẹ */
  outline: none;
}

/* Dropdown Content Container */
.dropdownContent {
  display: none;
  position: absolute;
  background-color: #003366;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.25); /* Bóng mờ sâu hơn cho chuyên nghiệp */
  min-width: 220px; /* Tăng kích thước tối thiểu */
  z-index: 1100;
  border-radius: 8px; /* Góc bo mềm mại hơn */
  top: 100%;
  left: 0;
  overflow: hidden;
  animation: fadeIn 0.25s ease-in-out; /* Hiệu ứng nhanh hơn cho cảm giác mượt */
  opacity: 0; /* Mặc định ẩn */
  visibility: hidden; /* Ẩn khỏi trình đọc màn hình khi không hiển thị */
  transform: translateY(10px); /* Hiệu ứng trượt */
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}

/* Hiển thị Dropdown khi hover hoặc kích hoạt */
.dropdown:hover .dropdownContent,
.dropdownContent.show {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateY(0); /* Hiển thị trượt lên mượt mà */
}

/* Dropdown Items */
.dropdownItem {
  color: var(--text-color);
  padding: 14px 18px; /* Khoảng cách rộng rãi hơn */
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 15px; /* Kích thước chữ dễ đọc hơn */
  font-weight: 400;
  transition: background-color var(--transition-speed), color var(--transition-speed);
  gap: 10px; /* Khoảng cách giữa icon và text */
}

.dropdownItem:hover,
.dropdownItem:focus {
  background-color: var(--dropdown-hover-bg-color);
  color: var(--secondary-color); /* Đổi màu chữ khi hover */
  outline: none;
}

/* Icon Styling in Dropdown Items */
.dropdownItemIcon {
  font-size: 20px; /* Icon lớn hơn, nổi bật hơn */
  color: var(--text-color);
  transition: color var(--transition-speed);
}

.dropdownItem:hover .dropdownItemIcon {
  color: var(--secondary-color); /* Icon đổi màu khi hover */
}

/* Responsive Fixes for Smaller Screens */
@media (max-width: 768px) {
  .dropdownContent {
    min-width: 100%; /* Đảm bảo menu rộng bằng container trên màn hình nhỏ */
    left: 0;
    border-radius: 0; /* Loại bỏ bo góc để đồng nhất */
    animation: slideDown 0.3s ease-in-out; /* Thay đổi hiệu ứng cho màn hình nhỏ */
  }

  .dropdownItem {
    padding: 12px 20px;
  }
}

/* Slide Down Animation for Mobile Navigation */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation for Dropdown */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Accessibility and Focus State */
.dropdownButton:focus + .dropdownContent,
.dropdownContent:focus-within {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdownItem:focus {
  background-color: var(--dropdown-hover-bg-color);
  color: var(--secondary-color);
  outline: none;
}

/* Extra Styling for a Premium Look */
.dropdownContent::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 20px;
  width: 12px;
  height: 12px;
  background-color: var(--dropdown-bg-color);
  transform: rotate(45deg); /* Tạo mũi tên nhỏ trên dropdown */
  box-shadow: -1px -1px 5px rgba(0, 0, 0, 0.1);
  z-index: -1;
}

/* Custom Scrollbar for Dropdown Content */
.dropdownContent {
  max-height: 300px; /* Giới hạn chiều cao nếu danh sách dài */
  overflow-y: auto;
}

.dropdownContent::-webkit-scrollbar {
  width: 8px;
}

.dropdownContent::-webkit-scrollbar-thumb {
  background-color: var(--secondary-color);
  border-radius: 10px;
}

.dropdownContent::-webkit-scrollbar-thumb:hover {
  background-color: var(--hover-color);
}

/* Search Bar */
.searchBar {
  display: flex;
  align-items: center;
  background-color: var(--background-color);
  border-radius: 25px;
  padding: 5px 15px;
  margin-left: 20px;
  flex: 1;
  max-width: 300px;
}

.searchBar input {
  border: none;
  outline: none;
  font-size: 14px;
  padding: 5px;
  flex: 1;
  color: #333;
}

.searchButton {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  transition: color var(--transition-speed);
}

.searchButton:hover,
.searchButton:focus {
  color: var(--primary-color);
  outline: none;
}

/* User Account and Cart Icons */
.icons {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 20px;
}

.iconButton {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: var(--icon-size);
  cursor: pointer;
  position: relative;
  transition: color var(--transition-speed);
}

.iconButton:hover,
.iconButton:focus {
  color: var(--secondary-color);
  outline: none;
}

.loginText {
  margin-left: var(--login-text-margin-left);
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  transition: color var(--transition-speed);
}

.loginText:hover,
.loginText:focus {
  color: var(--hover-color);
  outline: none;
}

.cartCount {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #ff5722;
  color: var(--text-color);
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

/* Toggle Button for Mobile */
.menuToggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 28px;
  cursor: pointer;
  transition: color var(--transition-speed);
}

.menuToggle:hover,
.menuToggle:focus {
  color: var(--secondary-color);
  outline: none;
}

/* Navigation Links for Mobile */
.navMobile {
  display: none;
  flex-direction: column;
  background-color: var(--primary-color);
  padding: 10px 0;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999;
  animation: slideDown 0.3s ease-in-out;
}

.navMobileLink {
  padding: 10px 20px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: background-color var(--transition-speed);
}

.navMobileLink:hover,
.navMobileLink:focus {
  background-color: var(--dropdown-hover-bg-color);
  outline: none;
}

.dropdownMobile {
  position: relative;
}

.dropdownMobileButton {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 20px;
  width: 100%;
  text-align: left;
  transition: color var(--transition-speed);
}

.dropdownMobileButton:hover,
.dropdownMobileButton:focus {
  color: var(--secondary-color);
  outline: none;
}

.dropdownMobileContent {
  display: none;
  flex-direction: column;
}

.dropdownMobileContent.show {
  display: flex;
}

.dropdownMobileItem {
  padding: 10px 40px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
  transition: background-color var(--transition-speed);
}

.dropdownMobileItem:hover,
.dropdownMobileItem:focus {
  background-color: var(--dropdown-hover-bg-color);
  outline: none;
}

/* Slide Down Animation for Mobile Navigation */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Styles */
@media (max-width: 992px) {
  .nav {
    display: none;
  }

  .menuToggle {
    display: block;
  }

  .navMobile {
    display: flex;
  }

  .searchBar {
    order: 3;
    width: 100%;
    max-width: none;
    margin: 10px 0 0 0;
  }

  .icons {
    order: 2;
    width: 100%;
    justify-content: flex-start;
    margin-left: 0;
  }
}

@media (max-width: 576px) {
  .headerContent {
    flex-direction: column;
    align-items: flex-start;
  }

  .searchBar,
  .icons {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
  }

  .searchBar {
    margin-top: 10px;
    max-width: none;
  }

  .icons {
    margin-top: 10px;
  }

  .loginText {
    display: none; /* Ẩn "Đăng nhập" trên màn hình nhỏ để tiết kiệm không gian */
  }
}
</style>
