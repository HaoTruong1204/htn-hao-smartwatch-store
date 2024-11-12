<template>
  <header class="header">
    <h1 class="logo">HTN HAO Store</h1>
    <button @click="$emit('toggle-cart')" class="cart-button">
      🛒 Giỏ Hàng ({{ cartItemCount }})
    </button>
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
};
</script>

<style scoped>
/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #1e2a38; /* Dark blue background for header */
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Logo Styles */
.logo {
  font-size: 24px;
  font-weight: 700;
  color: #f1c40f; /* Yellow color for logo text */
  margin: 0;
  cursor: pointer;
  transition: color 0.3s;
}

.logo:hover {
  color: #f39c12; /* Darker yellow on hover */
}

/* Cart Button Styles */
.cart-button {
  background-color: #e74c3c; /* Red color for the cart button */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s, transform 0.3s;
  font-weight: 500; /* Medium weight for readability */
}

.cart-button:hover {
  background-color: #c0392b; /* Darker red on hover */
  transform: scale(1.05); /* Slightly larger on hover for user feedback */
}

.cart-button:active {
  transform: scale(0.95); /* Slightly smaller when clicked */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .header {
    padding: 10px 20px;
  }
  .logo {
    font-size: 20px;
  }
  .cart-button {
    padding: 8px 15px;
    font-size: 14px;
  }
}
</style>
