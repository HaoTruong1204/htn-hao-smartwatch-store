// src/store/modules/products.js
export default {
    state: {
      products: [],
    },
    mutations: {
      setProducts(state, products) {
        state.products = products;
      },
    },
    actions: {
      fetchProducts({ commit }) {
        // Giả lập lấy sản phẩm từ API
        const products = [
          { id: 1, name: 'Đồng hồ thông minh A', price: 2000000, category: 'Đồng hồ thông minh' },
          { id: 2, name: 'Phụ kiện đồng hồ B', price: 500000, category: 'Phụ kiện' },
        ];
        commit('setProducts', products);
      },
    },
    getters: {
      allProducts: (state) => state.products,
      getProductById: (state) => (id) => state.products.find((product) => product.id === id),
    },
  };
  