<template>
    <div class="product-form">
      <h2>{{ product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}</h2>
      <form @submit.prevent="submitForm">
        <label>Tên sản phẩm</label>
        <input v-model="form.name" type="text" required />
  
        <label>Giá</label>
        <input v-model="form.price" type="text" required />
  
        <label>Mô tả</label>
        <textarea v-model="form.description"></textarea>
  
        <button type="submit">{{ product ? 'Lưu' : 'Thêm' }}</button>
        <button type="button" @click="$emit('close')">Hủy</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        form: {
          name: this.product ? this.product.name : '',
          price: this.product ? this.product.price : '',
          description: this.product ? this.product.description : '',
        },
      };
    },
    methods: {
      submitForm() {
        if (this.product) {
          console.log('Cập nhật sản phẩm', this.form);
        } else {
          console.log('Thêm sản phẩm mới', this.form);
        }
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .product-form {
    padding: 16px;
  }
  label {
    display: block;
    margin-top: 8px;
  }
  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    margin-bottom: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  button {
    margin-top: 8px;
  }
  </style>
  