<template>
    <div class="admin-product-list">
      <h1>Danh sách sản phẩm</h1>
      <button @click="openForm()">Thêm sản phẩm mới</button>
      <table>
        <thead>
          <tr>
            <th>Mã Sản Phẩm</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button @click="editProduct(product)">Sửa</button>
              <button @click="deleteProduct(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <ProductForm v-if="showForm" :product="selectedProduct" @close="closeForm" />
    </div>
  </template>
  
  <script>
  import ProductForm from './ProductForm.vue';
  
  export default {
    components: { ProductForm },
    data() {
      return {
        products: [], // Danh sách sản phẩm sẽ được lấy từ API
        showForm: false,
        selectedProduct: null,
      };
    },
    methods: {
      fetchProducts() {
        // Giả lập API, thay thế bằng gọi API thật khi triển khai
        this.products = [
          { id: 'PRD001', name: 'Đồng hồ thông minh A', price: '2,000,000 VND' },
          { id: 'PRD002', name: 'Đồng hồ thông minh B', price: '3,500,000 VND' },
        ];
      },
      openForm(product = null) {
        this.selectedProduct = product;
        this.showForm = true;
      },
      closeForm() {
        this.showForm = false;
        this.selectedProduct = null;
      },
      deleteProduct(productId) {
        console.log(`Xóa sản phẩm ${productId}`);
      },
    },
    created() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  .admin-product-list {
    padding: 16px;
  }
  button {
    margin-bottom: 8px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    border: 1px solid #ddd;
  }
  th {
    background-color: #f4f4f9;
  }
  </style>
  