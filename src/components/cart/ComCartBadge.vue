<template>
  <div
    class="cart-badge"
    @click="goToCart"
    role="button"
    tabindex="0"
    @keydown.enter="goToCart"
    aria-label="Đi đến giỏ hàng"
    @mouseenter="showTooltipHandler"
    @mouseleave="hideTooltipHandler"
    @focus="showTooltipHandler"
    @blur="hideTooltipHandler"
  >
    <!-- Shopping Cart Icon -->
    <i class="fas fa-shopping-cart" aria-hidden="true"></i>
    
    <!-- Item Count Badge -->
    <span
      v-if="itemCount > 0"
      class="badge"
      :aria-label="`${itemCount} sản phẩm trong giỏ hàng`"
    >
      {{ itemCount }}
    </span>
    
    <!-- Tooltip -->
    <div v-if="showTooltip" class="tooltip">Giỏ hàng của bạn</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartBadge",
  data() {
    return {
      showTooltip: false, // Trạng thái hiển thị tooltip
    };
  },
  computed: {
    ...mapState({
      itemCount: (state) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0), // Tổng số sản phẩm trong giỏ
    }),
  },
  methods: {
    /**
     * Điều hướng đến trang giỏ hàng.
     */
    goToCart() {
      this.$router.push({ name: "CartPage" });
    },
    /**
     * Hiển thị tooltip khi hover hoặc focus.
     */
    showTooltipHandler() {
      this.showTooltip = true;
    },
    /**
     * Ẩn tooltip khi không còn hover hoặc focus.
     */
    hideTooltipHandler() {
      this.showTooltip = false;
    },
  },
};
</script>

<style scoped>
/* Biến CSS cho dễ quản lý chủ đề */
:root {
  --primary-color: #2a9d8f;
  --secondary-color: #e9c46a;
  --error-color: #e63946;
  --badge-color: #e63946;
  --badge-text-color: #fff;
  --tooltip-background: rgba(0, 0, 0, 0.75);
  --tooltip-text-color: #fff;
  --transition-speed: 0.3s;
}

/* Container của Cart Badge */
.cart-badge {
  position: relative;
  font-size: 1.5rem;
  color: var(--primary-color);
  cursor: pointer;
  transition: color var(--transition-speed) ease, transform var(--transition-speed) ease;
  display: flex;
  align-items: center;
}

.cart-badge:focus {
  outline: none;
  color: var(--secondary-color);
  transform: scale(1.1);
}

/* Hover Effect */
.cart-badge:hover {
  color: var(--secondary-color); /* Màu nổi bật khi hover */
  transform: scale(1.1);
}

/* Badge Styles */
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--badge-color); /* Màu đỏ nổi bật */
  color: var(--badge-text-color);
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Hiệu ứng đổ bóng */
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  height: 20px;
  line-height: 1;
}

/* Tooltip Styles */
.tooltip {
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--tooltip-background);
  color: var(--tooltip-text-color);
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-speed) ease, visibility var(--transition-speed) ease;
}

.cart-badge:hover .tooltip,
.cart-badge:focus .tooltip {
  opacity: 1;
  visibility: visible;
}

/* Responsive Design */
@media (max-width: 576px) {
  .cart-badge {
    font-size: 1.2rem;
  }

  .badge {
    top: -5px;
    right: -5px;
    font-size: 0.65rem;
    min-width: 16px;
    height: 16px;
  }

  .tooltip {
    font-size: 0.65rem;
  }
}
</style>
