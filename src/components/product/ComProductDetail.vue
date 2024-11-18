<script>
import { fetchItemById } from '../services/api'; // Đảm bảo import đúng từ api.js
import { useStore } from 'vuex'; // Sử dụng Composition API
import { computed, ref } from 'vue';

export default {
  name: "ProductDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const product = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchProduct = async () => {
      try {
        const data = await fetchItemById(props.id); // Gọi hàm dịch vụ để lấy dữ liệu sản phẩm
        product.value = data;
      } catch (err) {
        error.value = 'Không thể tải thông tin sản phẩm.';
        console.error('Lỗi khi lấy dữ liệu từ API:', err);
      } finally {
        loading.value = false;
      }
    };

    const formatPrice = (price) => {
      return price.toLocaleString('vi-VN');
    };

    const addToCart = () => {
      if (product.value && product.value.stock > 0) {
        store.dispatch('addToCart', product.value);
        alert(`Đã thêm "${product.value.name}" vào giỏ hàng!`);
      }
    };

    fetchProduct();

    return {
      product,
      loading,
      error,
      formatPrice,
      addToCart,
    };
  },
};
</script>


<style scoped>
/* Container for the product details */
.product-detail {
  display: flex;
  gap: 24px;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Product image styling */
.product-image {
  width: 300px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

/* Product info container */
.product-info {
  max-width: 600px;
  flex: 1;
}

/* Product name styling */
.product-name {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 12px;
  font-weight: 700;
}

/* Product price styling */
.product-price {
  font-size: 1.25rem;
  color: #27ae60;
  margin-bottom: 12px;
  font-weight: 600;
}

/* Product description styling */
.product-description {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* Add to cart button styling */
.add-to-cart-button {
  padding: 10px 20px;
  background-color: #2a9d8f; /* Teal color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.3s;
}

.add-to-cart-button:hover {
  background-color: #21867a; /* Darker teal */
  transform: scale(1.05);
}

.add-to-cart-button:active {
  transform: scale(0.95);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .product-detail {
    flex-direction: column;
    padding: 16px;
  }
  .product-image {
    width: 100%;
    height: 250px;
  }
  .product-info {
    margin-top: 20px;
  }
}
</style>
