<template>
  <div class="cart-item">
    <!-- Product Image -->
    <img :src="item.image" :alt="`Hình ảnh của ${item.name}`" class="cart-item-image" />

    <!-- Product Details -->
    <div class="cart-item-details">
      <h2 class="cart-item-name">{{ item.name }}</h2>
      <p class="cart-item-price">{{ formatPrice(item.price) }}</p>

      <!-- Quantity Controls -->
      <div class="cart-item-quantity">
        <label for="quantity">Số lượng:</label>
        <input
          type="number"
          id="quantity"
          v-model.number="quantity"
          @change="handleUpdateQuantity"
          min="1"
          :max="item.stock"
          aria-label="Số lượng sản phẩm"
        />
      </div>

      <!-- Remove Button -->
      <button
        type="button"
        class="remove-button"
        @click="handleRemoveFromCart"
        aria-label="Xóa sản phẩm khỏi giỏ hàng"
      >
        Xóa
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CartItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: this.item.quantity,
    };
  },
  watch: {
    item(newVal) {
      this.quantity = newVal.quantity;
    },
  },
  methods: {
    // Map actions từ module 'cart' với namespace
    ...mapActions('cart', ['removeProductFromCart', 'updateProductQuantity']),

    /**
     * Định dạng giá tiền sang VND.
     * @param {number} price Giá tiền cần định dạng.
     * @returns {string} Giá tiền đã định dạng.
     */
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    },

    /**
     * Xóa sản phẩm khỏi giỏ hàng.
     */
    handleRemoveFromCart() {
      if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        this.removeProductFromCart(this.item.id)
          .then(() => {
            this.$toast.success(`Đã xóa "${this.item.name}" khỏi giỏ hàng.`);
          })
          .catch(() => {
            this.$toast.error("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.");
          });
      }
    },

    /**
     * Cập nhật số lượng sản phẩm trong giỏ hàng.
     */
    handleUpdateQuantity() {
      if (this.quantity < 1) {
        this.$toast.error("Số lượng không hợp lệ.");
        this.quantity = 1;
      }
      this.updateProductQuantity({ productId: this.item.id, quantity: this.quantity })
        .then(() => {
          this.$toast.success("Cập nhật số lượng thành công.");
        })
        .catch(() => {
          this.$toast.error("Có lỗi xảy ra khi cập nhật số lượng.");
        });
    },
  },
};
</script>

<style scoped>
/* Các style của bạn */
</style>
