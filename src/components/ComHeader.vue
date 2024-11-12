<template>
  <header :class="$style.header">
    <div :class="$style.headerContent">
      <!-- Logo -->
      <h1
        :class="$style.logo"
        @click="$emit('navigate', 'home')"
        tabindex="0"
        @keydown.enter="navigateHome"
      >
        HTN HAO STORE
      </h1>

      <!-- Navigation Links with Dropdown for Products -->
      <nav :class="$style.nav" aria-label="Main Navigation">
        <a
          @click.prevent="$emit('navigate', 'home')"
          href="#"
          :class="$style.navLink"
        >
          Trang chủ
        </a>
        <div :class="$style.dropdown" ref="dropdown">
          <button
            :class="$style.dropdownButton"
            aria-haspopup="true"
            :aria-expanded="isDropdownOpen ? 'true' : 'false'"
            @click="toggleDropdown"
          >
            Sản phẩm ▼
          </button>
          <div
            :class="[$style.dropdownContent, { [$style.show]: isDropdownOpen }]"
            role="menu"
          >
            <a
              @click.prevent="$emit('navigate', 'smartwatches')"
              href="#"
              :class="$style.dropdownItem"
              role="menuitem"
            >
              Đồng hồ thông minh
            </a>
            <a
              @click.prevent="$emit('navigate', 'luxury-watches')"
              href="#"
              :class="$style.dropdownItem"
              role="menuitem"
            >
              Đồng hồ cao cấp
            </a>
            <a
              @click.prevent="$emit('navigate', 'accessories')"
              href="#"
              :class="$style.dropdownItem"
              role="menuitem"
            >
              Phụ kiện
            </a>
          </div>
        </div>
        <a
          @click.prevent="$emit('navigate', 'new-products')"
          href="#"
          :class="$style.navLink"
        >
          Sản phẩm mới
        </a>
        <a
          @click.prevent="$emit('navigate', 'promo')"
          href="#"
          :class="$style.navLink"
        >
          Khuyến mãi
        </a>
        <a
          @click.prevent="$emit('navigate', 'blog')"
          href="#"
          :class="$style.navLink"
        >
          Blog
        </a>
        <a
          @click.prevent="$emit('navigate', 'contact')"
          href="#"
          :class="$style.navLink"
        >
          Liên hệ
        </a>
      </nav>

      <!-- Search Bar -->
      <div :class="$style.searchBar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          v-model="searchQuery"
          @keydown.enter="search"
          aria-label="Search Products"
        />
        <button
          @click="search"
          :class="$style.searchButton"
          aria-label="Search"
        >
          🔍
        </button>
      </div>

      <!-- User Account and Cart Icons -->
      <div :class="$style.icons">
        <!-- User Account Button with "Đăng nhập" -->
        <button
          @click="$emit('navigate', 'account')"
          :class="$style.iconButton"
          aria-label="Đăng nhập"
        >
          👤 <span :class="$style.loginText">Đăng nhập</span>
        </button>
        <!-- Cart Button -->
        <button
          @click="$emit('toggle-cart')"
          :class="$style.iconButton"
          aria-label="Giỏ hàng"
        >
          🛒 <span :class="$style.cartCount">{{ cartItemCount }}</span>
        </button>
      </div>

      <!-- Toggle Button for Mobile -->
      <button
        :class="$style.menuToggle"
        @click="toggleMenu"
        aria-label="Toggle Menu"
      >
        ☰
      </button>
    </div>

    <!-- Navigation Links for Mobile -->
    <nav v-if="isMenuOpen" :class="$style.navMobile" aria-label="Mobile Navigation">
      <a
        @click.prevent="$emit('navigate', 'home')"
        href="#"
        :class="$style.navMobileLink"
      >
        Trang chủ
      </a>
      <div :class="$style.dropdownMobile" ref="mobileDropdown">
        <button
          :class="$style.dropdownMobileButton"
          aria-haspopup="true"
          :aria-expanded="isMobileDropdownOpen ? 'true' : 'false'"
          @click="toggleMobileDropdown"
        >
          Sản phẩm ▼
        </button>
        <div
          :class="[$style.dropdownMobileContent, { [$style.show]: isMobileDropdownOpen }]"
          role="menu"
        >
          <a
            @click.prevent="$emit('navigate', 'smartwatches')"
            href="#"
            :class="$style.dropdownMobileItem"
            role="menuitem"
          >
            Đồng hồ thông minh
          </a>
          <a
            @click.prevent="$emit('navigate', 'luxury-watches')"
            href="#"
            :class="$style.dropdownMobileItem"
            role="menuitem"
          >
            Đồng hồ cao cấp
          </a>
          <a
            @click.prevent="$emit('navigate', 'accessories')"
            href="#"
            :class="$style.dropdownMobileItem"
            role="menuitem"
          >
            Phụ kiện
          </a>
        </div>
      </div>
      <a
        @click.prevent="$emit('navigate', 'new-products')"
        href="#"
        :class="$style.navMobileLink"
      >
        Sản phẩm mới
      </a>
      <a
        @click.prevent="$emit('navigate', 'promo')"
        href="#"
        :class="$style.navMobileLink"
      >
        Khuyến mãi
      </a>
      <a
        @click.prevent="$emit('navigate', 'blog')"
        href="#"
        :class="$style.navMobileLink"
      >
        Blog
      </a>
      <a
        @click.prevent="$emit('navigate', 'contact')"
        href="#"
        :class="$style.navMobileLink"
      >
        Liên hệ
      </a>
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
      searchQuery: "",
      isMenuOpen: false,
      isDropdownOpen: false,
      isMobileDropdownOpen: false,
    };
  },
  methods: {
    search() {
      this.$emit("search", this.searchQuery);
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      // Đóng dropdown khi mở/đóng menu
      if (!this.isMenuOpen) {
        this.isMobileDropdownOpen = false;
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleMobileDropdown() {
      this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
    },
    navigateHome() {
      this.$emit("navigate", "home");
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.dropdown;
      const mobileDropdown = this.$refs.mobileDropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.isDropdownOpen = false;
      }
      if (mobileDropdown && !mobileDropdown.contains(event.target)) {
        this.isMobileDropdownOpen = false;
      }
    },
  },
  mounted() {
    // Đóng dropdown khi click ngoài
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style module>
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
  position: relative;
  z-index: 1000;
  font-family: var(--font-family);
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
}

.dropdownButton {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color var(--transition-speed);
}

.dropdownButton:hover,
.dropdownButton:focus {
  color: var(--secondary-color);
  outline: none;
}

.dropdownContent {
  display: none;
  position: absolute;
  background-color: var(--dropdown-bg-color);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  min-width: 180px;
  z-index: 1000;
  border-radius: 4px;
}

.show {
  display: block;
}

.dropdownItem {
  color: var(--text-color);
  padding: 12px 16px;
  display: block;
  text-decoration: none;
  transition: background-color var(--transition-speed);
}

.dropdownItem:hover,
.dropdownItem:focus {
  background-color: var(--dropdown-hover-bg-color);
  outline: none;
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

.show {
  display: flex;
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
